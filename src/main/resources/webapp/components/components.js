/**
 * Concatenation of all vue components. See ../templates/templates.js for details :D
 */

import {
    AboutTemplate,
    NavbarTemplate,
    ShoppingTemplate,
    WhishListTemplate,
    WhishlistBagTableTemplate,
    WhishlistItemTableTemplate
} from "../templates/templates.js";
import Vue from "../vue.esm.browser.js";

// var JUTE_SERVER = "https://192.168.178.21:8443/jutebag/";
var JUTE_SERVER = "/jutebag/";

const About = {
    template: AboutTemplate,
};

const Shopping = {
    template: ShoppingTemplate,
    data: function () {
        return {
            user: "Moe"
        }
    }
};

const Navbar = {
    template: NavbarTemplate
};


Vue.component('item-display-tr', {
    template: WhishlistItemTableTemplate,
    filters: {
        pprint(item) {
            return item.item;
        }
    },
    methods: {
        toggleCart: function (item) {
            this.$parent.toggleCart(item);
        },
        removeItem: function (item) {
            // fixme: this should be handled via events:
            // "props down, events up"
            this.$parent.removeItem(item);
        }
    },
    computed: {
        items: function () {
            return this.$parent.items.filter(item => !item.inCart);
        }

    }
}
);

Vue.component('display-in-bag-tr', {
    template: WhishlistBagTableTemplate,
    filters: {
        pprint(item) {
            return item.item;
        }
    },
    methods: {
        toggleCart: function (item) {
            item.highlight = true;
            setTimeout(() => {
                item.inCart = item.inCart === true ? false : true;
                item.highlight = false;
            }
                , 200);
        }
    },
    computed: {
        items: function () {
            return this.$parent.items.filter(item => item.inCart);
        }

    }
}
);

/**
 * Create an item to display from a name with qty 1.
 * @param {String} itemName 
 */
function createItem(itemName) {
    return {
        item: "" + itemName,
        qty: 1,
        inCart: false,
        highlight: false,
        toDelete: false
    };
}

/**
 * Converts a backend item (data only) to a frontend-visible item
 * with "highlight" and "toDelete" attributes
 * 
 * @param {object} itemData 
 */
function toFrontendItem(itemData) {
    itemData.highlight = false;
    itemData.toDelete = false;
    return itemData;
}

/**
 * parse the server data "/bag" and return a list of shopping cart items.
 * Expected format:
 * {
 *   "items" : [item1, ... , itemN]
 * }
 * @param {object} serverData 
 */
function parseServerData(serverData) {
    let bagItems = serverData.items;
    if (bagItems instanceof Array) {
        let result = bagItems.map(toFrontendItem);
        return result;
    } else {
        console.log("received data is not a list", JSON.stringify(bagItems));
        return [];
    }
}


function storeBagOnServer(items) {
    fetch("/jutebag/add",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify(items)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Received store result: " + JSON.stringify(data));
        });
}


const WhishList = {
    template: WhishListTemplate,
    data: function () {
        return {
            items: [createItem("example")]
        };
    },
    methods: {
        toggleCart: function (item) {
            item.highlight = true;
            setTimeout(() => {
                item.inCart = item.inCart === true ? false : true;
                item.highlight = false;
                this.storeItems();
            }, 200);
        },
        addNewItem: function () {
            let itemName = this.$refs.newItem.value;
            this.items.push(
                createItem(itemName)
            );
            this.$refs.newItem.value = "";
            console.log("adding new item! >" + itemName);
            this.storeItems();
        },
        removeItem: function (item) {
            console.log("requested to remove item " + item);
            let itemId = item.item;
            item.toDelete = true;
            setTimeout(() => {
                let newItemList = this.items.filter(elem => elem.item != itemId);
                this.items = newItemList;
                this.storeItems();
            }, 400);
        },
        storeItems: function () {
            let dataString = JSON.stringify(this.items);
            localStorage.setItem("jutebag.items", dataString);
        },
        restoreItems: function () {
            try {
                let storedData = localStorage.getItem("jutebag.items");
                let storedItems = JSON.parse(storedData);
                if (Array.isArray(storedItems)) {
                    this.items = storedItems;
                }
            } catch (e) {
                console.log("unable to restore content from localstorage");
                console.log(e);
            }
        },
        storeToServer: function () {
            console.log("storing to server");
            storeBagOnServer(this.items);
        },
        loadFromServer: function () {
            fetch(JUTE_SERVER + "bag")
                .then(res => res.json())
                .then(data => this.items = parseServerData(data)) //ocument.getElementById("remoteData").innerHTML =
                .catch(error => console.log("ERROR:" + error))
            console.log("loading from server");
        }

    },
    created: function () {
        console.log("new wishlist created");
        this.restoreItems();
        console.log("whishlist restored from localStore");
    },
    destroyed: function () {
        // maybe: send data to server? => checkout promises in detail
        console.log("whishlist unloaded");
        this.storeItems();
        console.log("stored content to localStorage");
    }

};


export {
    About,
    WhishList,
    Navbar,
    Shopping
};