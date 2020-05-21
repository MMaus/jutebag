

var app = new Vue({
    el: "#app",
    data: {
        message: "Hello World!"
    }
});

var app2 = new Vue({
    el: "#app-2",
    data: {
        message: "You loaded this page on " + new
            Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: "#dynList",
    data: {
        todos: [
            { text: "first item" },
            { text: "second item" },
            { text: "third item" }
        ]
    }
})

var app5 = new Vue({
    el: "#interact",
    data: {
        message: "Ordinary text!"
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})


var app6 = new Vue({
    el: "#uinput",
    data: {
        message: "Hello World"
    }
})


var app7 = new Vue({
    el: "#dynamicTodo",
    data: {
        shoppingList: [
            {id : 0, text: "Cucumbers"},
            {id: 1, text: "Salad"},
            {id: 2, text: "Saucages"}
        ]
    } 
})

const myTemplate = `
<div>
<h1> header</h1>
<ul>
<li v-for="item in items">{{item}}</li>
</ul>
</div>
`;


var myApp = new Vue({
    el: "#myTest",
    data: {
        items : ["A", "B"]
    },
    template: myTemplate
})