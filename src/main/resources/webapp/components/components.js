/**
 * Concatenation of all vue components. See ../templates/templates.js for details :D
 */

import { 
    AboutTemplate, 
    NavbarTemplate,
    ShoppingTemplate,
    WhishListTemplate
} from "../templates/templates.js";
import Vue from "../vue.esm.browser.js";


const About = {
    template: AboutTemplate,
};

const Shopping = {
    template: ShoppingTemplate,
    data: function() {
        return {
            user: "Moe"
        }
    }
};

const Navbar = {
  template: NavbarTemplate
};


Vue.component('item-display-tr', {
    template: `
        <tbody>
            <tr v-for="item in items" v-bind:class="{'table-success': item.inCart,
            'table-info' : item.highlight}">
                <td v-on:click="toggleCart(item)" >{{item | pprint}}</td>
                <td class="text-right fit">
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty -= 1">-</button>
                    <button type="button" class="btn btn-primary btn-lg" v-on:click="toggleCart(item)">{{item.qty}}</button>
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty += 1">+</button>
                    <button type="button" class="btn btn-danger btn-lg" v-on:click="removeItem(item)">x</button>

                </td>
            </tr>
        </tbody>
    `,
    filters: {
        pprint(item) {
            return item.item;
        }
    },
    methods: {
        toggleCart : function(item){
            this.$parent.toggleCart(item);
        },
        removeItem : function(item) {
            // fixme: this should be handled via events:
            // "props down, events up"
            this.$parent.removeItem(item);
        }
    },
    computed : {
        items : function() {
            return this.$parent.items.filter(item => !item.inCart);
        }

    }
}
);

Vue.component('display-in-bag-tr', {
    template: `
        <tbody>
            <tr v-for="item in items" v-bind:class="{'table-info': item.highlight}">
                <td v-on:click="toggleCart(item)" class="font-italic small">{{item | pprint}}</td>
                <td class="text-right fit">
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty -= 1">-</button>
                    <button type="button" class="btn btn-primary btn-lg" v-on:click="toggleCart(item)">{{item.qty}}</button>
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty += 1">+</button>
                </td>
            </tr>
        </tbody>
    `,
    filters: {
        pprint(item) {
            return item.item;
        }
    },
    methods: {
        toggleCart : function(item){
            item.highlight = true;
            setTimeout(() => {
                item.inCart = item.inCart === true ? false : true;
                item.highlight = false;
            }
            , 200);
        }
    },
    computed : {
        items : function() {
            return this.$parent.items.filter(item => item.inCart);
        }

    }
}
);

function newItemFactory(itemName) {
    return {
        item : "" + itemName,
        qty : 1,
        inCart: false,
        highlight : false
    };
}

const WhishList = {
    template: WhishListTemplate,
    data: function() {
        return {
            items : [ newItemFactory("example") ]
        };
    },
    methods: {
        toggleCart : function(item) {
            item.highlight = true;
            setTimeout(() => {
                item.inCart = item.inCart === true ? false : true;
                item.highlight = false;
            }
            , 200);

        },
        addNewItem : function() {
            let itemName = this.$refs.newItem.value;
            this.items.push(
                newItemFactory(itemName)
                // { item: itemName, qty: 1, inCart :false, highlight:false }
                );
            this.$refs.newItem.value = "";
            console.log("adding new item! >" + itemName);
        },
        removeItem : function(item) {
            console.log("requested to remove item " + item);
            let itemId = item.item;
            let newItemList = this.items.filter(elem => elem.item != itemId);
            this.items = newItemList;

        },
        storeItems : function() {
            localStorage.setItem("jutebag.items", JSON.stringify(this.items));
        },
        restoreItems : function() {
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
        }
    },
    created : function() {
        console.log("new wishlist created");
        this.restoreItems();
        console.log("whishlist restored from localStore");
    },
    destroyed : function() {
        // maybe: send data to server? => checkout promises in detail
        console.log("whishlist unloaded");
        this.storeItems();
        console.log("stored content to localStorage");
    }


};

export { About,
    WhishList,
    Navbar,
    Shopping
};