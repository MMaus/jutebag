/**
 * Templates are concatenated into a single file.
 * I don't use webpack or the like, but I want to reduce individual file transfers,
 * so I do this. Might be superfluous in the age of HTTP/2 though.
 */

// the html comment is unnecessary thanks to leet-html VSCode plugin :) amazing!
const AboutTemplate = /*html*/ `
    <div class="bg-secondary text-white">
        <h3> About JuteBag</h3>
        <p>
        JuteBag simplifies your regular shopping.
        (created) 2020 by Moritz Maus.
        </p>
    </div>
`;


const NavbarTemplate = `
    <!-- <p class="bg-dark text-white"> -->
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                Menu <span class="navbar-toggler-icon text-right"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#/">Enter Items</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/shopping">Go Shopping!</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/receipies">Receipies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/about">About</a>
                </li>
                </ul>
            </div>
        </nav>
        <!--
    </p>
    //-->
`;

const MainTemplate = `
    <div class="container-sm bg-secondary">
        <navbar></navbar>
        <router-view></router-view>
    </div>
`;

const ShoppingTemplate = `
    <div>
        <div class="bg-dark text-white">
            Some spacing test content
        </div>
        <div class="container-sm p-3 bg-primary text-white">
            <h3>shopping items (today & tonight)</h3>
        </div>
        <p>
        Hello {{user}}
        </p>
        
    </div>
`;

const WhishListTemplate = `
    <div>
        <div class="d-flex justify-content-between">
            <div>
                <h3>Shopping Items</h3>
            </div>
            <div> 
                <button class="btn btn-warning" v-on:click="storeToServer()">save</button>
                <button class="btn btn-warning" v-on:click="loadFromServer()">load</button>
            </div>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="newWhishlistItem" ref="newItem"
                v-on:keyup.enter="addNewItem()" placeholder="add item here">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" v-on:click="addNewItem()">Enter Item</button>
            </div>
        </div>
        <div class="table-responsive" v-on:store-event="storeItems">
            <table class="table table-dark table-striped table-hover">
                <thead>
                    <th scope="col">Required</th><th scope="col">Qty</th>
                </thead>
                <item-display-tr></item-display-tr>
            </table>
            <table class="table table-dark table-striped table-hover">
                <thead>    
                    <th scope="col">In cart</th><th scope="col"></th>
                </thead>
                <display-in-bag-tr></display-in-bag-tr>
            </table>
        </div>
    </div>
`;

const WhishlistItemTableTemplate = `
        <tbody>
            <tr v-for="item in items" v-bind:class="{'table-success': item.inCart,
            'table-info' : item.highlight, 'table-danger' : item.toDelete, 'text-dark' : item.toDelete}">
                <td v-on:click="toggleCart(item)" >{{item | pprint}}</td>
                <td class="text-right fit">
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty -= 1">-</button>
                    <button type="button" class="btn btn-primary btn-lg" v-on:click="toggleCart(item)">{{item.qty}}</button>
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty += 1">+</button>
                    <button type="button" class="btn btn-danger btn-lg" v-on:click="removeItem(item)">x</button>

                </td>
            </tr>
        </tbody>
`;

const WhishlistBagTableTemplate = `
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
`;

export {
    AboutTemplate,
    NavbarTemplate,
    MainTemplate,
    ShoppingTemplate,
    WhishListTemplate,
    WhishlistItemTableTemplate,
    WhishlistBagTableTemplate
};