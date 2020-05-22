/**
 * Concatenation of all vue components. See ../templates/templates.js for details :D
 */

import { 
    AboutTemplate, 
    NavbarTemplate,
    ShoppingTemplate,
    WhishListTemplate
} from "../templates/templates.js";



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


const WhishList = {
    bagData : [
        { item : "Bier", qty: 2}
    ],
    template: WhishListTemplate,
    data: function() {
        return {
            bag : this.bagData,
            fullBag : [ 
                { item: "bar" , qty : 2},
                { item: "foo" , qty : 3}
            ],
            items : [ 
                { item: "bar" , qty : 2, inCart : false},
                { item: "foo" , qty : 3, inCart : false},
                { item: "baz" , qty : 3, inCart : true}
            ]
        };
    },
    methods: {
        addBeer : function() {
            this.items.push({ item: "beer", qty: 3, inCart:false})
        },
        toggleCart : function(item) {
            item.inCart = item.inCart === true ? false : true;
        },
        addNewItem : function() {
            let itemName = this.$refs.newItem.value;
            this.items.push({ item: itemName, qty: 1, inCart :false })
            this.$refs.newItem.value = "";
            console.log("adding new item! >" + data);

        }
    },
    filters: {
        pprint(item) {
            return item.item;
        }
    },
    created : function() {
        // todo: read data from localstore
        console.log("new wishlist created");
    },
    destroyed : function() {
        // todo: store data in localstore.
        // maybe: send data to server? => checkout promises in detail
        console.log("whishlist unloaded");
    }

};

export { About,
    WhishList,
    Navbar,
    Shopping
};