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
                { item: "bar" , qty : 2, inCart : false, highlight : false},
                { item: "foo" , qty : 3, inCart : false, highlight : false},
                { item: "baz" , qty : 3, inCart : true, highlight : false}
            ]
        };
    },
    methods: {
        addBeer : function() {
            this.items.push({ item: "beer", qty: 3, inCart:false})
        },
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
            this.items.push({ item: itemName, qty: 1, inCart :false, highlight:false })
            this.$refs.newItem.value = "";
            console.log("adding new item! >" + itemName);

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