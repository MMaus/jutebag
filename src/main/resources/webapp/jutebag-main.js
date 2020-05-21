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
    el: "#demoApp",
    components: {
        'navbar': Navbar
    },
    router,
    template: MainTemplate
})


var testControl = new Vue({
    el: "#test_space",
    data: {
        message: "hi",
        qty: 1
    }
})

var milkControl = new Vue({
    el: "#item_milk",
    data: {
        message: "hi",
        qty: 1
    }
})

var biomilkControl = new Vue({
    el: "#item_milk2",
    data: {
        message: "B.i.o",
        qty: 2
    }
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


var testApp = new Vue({
    el: "#testField",
    data: {
        bg2: true,
        text: "content"
    },
    created: function () {
        // called when app is created
        console.log("created callback executed");

    }
})

var shoppingList = new Vue({
    el: "#shoppingList",
    data: {
        bg2: true, // just for testing!
        text: "content",
        bag: [
            item("milk"),
            item("butter"),
            item("beer"),
            item("meat"),
            item("cheese"),
            item("bread"),
            item("potatoes")
        ]
    },
    filters: {
        pprint(item) {
            return item.id;
        }
    },
    template: "#itemTemplate"
    /*
    `
      <div>
        <div v-for="item in bag">
            <div class="row border" style="margin: auto">
                <div class="col bg-primary text-white">{{item | pprint}}</div>
            </div>
        </div>
      </div>
      `*/

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
