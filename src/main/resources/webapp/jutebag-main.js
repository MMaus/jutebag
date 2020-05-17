var testControl = new Vue({
    el: "#test_space",
    data: {
        message: "hi",
        qty : 1
    }
})

var milkControl = new Vue({
    el: "#item_milk",
    data: {
        message: "hi",
        qty : 1
    }
})

var biomilkControl = new Vue({
    el: "#item_milk2",
    data: {
        message: "B.i.o",
        qty : 2
    }
})

function item(name) {
    return {id : name, got: false}
}


var shoppingList = new Vue({
    el: "#shoppingList",
    data: {
        bag : [
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
    var value=document.getElementById("newItem").value
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
    .then(data => document.getElementById("remoteData").innerHTML = "item=" + data.item + ", qty=" + data.qty)
    .catch(error => console.log("ERROR:" + error))
}


var postRes = {}

function addToBag() {
    fetch("http://localhost:8080/jutebag/add",
    {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: 
            JSON.stringify( 
                {
                    item: "beer",
                    qty: 20
                }
                )
    }).then(res => {postRes = res; return res.json()})
    .then(data => {
        console.log('result = ' + JSON.stringify(data));
        console.log("item = " + data.item);
        console.log("qty = " + data.qty);
        document.getElementById("remoteData").innerHTML = JSON.stringify(data);
    }
    
    )

}
