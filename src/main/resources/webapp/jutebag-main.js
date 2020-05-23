/**
 * Import vue 2.6.11 locally. fetched from https://cdn.jsdelivr.net/npm/vue/dist/
 */

import Vue from './vue.esm.browser.js'


import {
    About,
    Navbar,
    Shopping,
    WhishList
} from './components/components.js';

import {
    MainTemplate, ShoppingTemplate
} from './templates/templates.js';


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            name: "About Us Page"
        },
        {
            path: '/',
            component: WhishList,
            name: "Whish List"
        },
        {
            path: '/shopping',
            component: Shopping,
            name: "Shopping Page"
        }

    ]
})

var testAppControl = new Vue({
    el: "#mainApp",
    components: {
        'navbar': Navbar
    },
    router,
    template: MainTemplate
})

function item(name) {
    return { id: name, got: false }
}

Vue.component('test-component', {
    template: `<p>:) insert template here, test what is possible,
    maybe with a cool {{msg}}
    <br/> but <b>NOTE</b>: it must contain exactly one root tag
    </p>`,
    props: {
        msg: {
            type: String,
            default: "Foo"
        }
    }
})


function addItem() {
    var value = document.getElementById("newItem").value
    shoppingList.$data.bag.push(item(value))
}

function store() {
    localStorage._bag = JSON.stringify(shoppingList.$data.bag)
    document.getElementById("localData").innerHTML = localStorage._bag
}

function restore() {
    var content = localStorage._bag
    var parsedContent = JSON.parse(localStorage._bag)
    document.getElementById("localData").innerHTML = parsedContent
    shoppingList.$data.bag = parsedContent
}

function fetchBag() {
    fetch("http://localhost:8080/jutebag/bag")
        .then(res => res.json())
        //.then(blob => console.log(blob))
        //.then(data => { console.log("received data:" + data); return data;})
        .then(data => document.getElementById("remoteData").innerHTML =
            "item=" + data.item + ", qty=" + data.qty)
        .catch(error => console.log("ERROR:" + error))
}


var postRes = {}

function addToBag() {
    fetch("http://localhost:8080/jutebag/add",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify(
                    {
                        item: "beer",
                        qty: 20
                    }
                )
        }).then(res => { postRes = res; return res.json() })
        .then(data => {
            console.log('result = ' + JSON.stringify(data));
            console.log("item = " + data.item);
            console.log("qty = " + data.qty);
            document.getElementById("remoteData").innerHTML = JSON.stringify(data);
        }

        )

}
