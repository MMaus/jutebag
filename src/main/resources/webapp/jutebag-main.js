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
