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
            foo : "bar",
            bag : this.bagData,
            fullBag : [ 
                { item: "bar" , qty : 2},
                { item: "foo" , qty : 3}
            ],
            items : [ 
                { item: "bar" , qty : 2},
                { item: "foo" , qty : 3}
            ]
        };
    },
    methods: {
        addBeer : function() {
            this.items.push({ item: "beer", qty: 3})
        }
    },
    filters: {
        pprint(item) {
            return item.item;
        }
    }

};

export { About,
    WhishList,
    Navbar,
    Shopping
};