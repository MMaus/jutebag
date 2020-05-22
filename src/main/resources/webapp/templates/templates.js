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
    <p class="bg-dark text-white">
        <nav>
            <a class="btn" href="#/">Enter Items</a>
            <a class="btn" href="#/shopping">Go Shopping!</a>
            <a class="btn" href="#/receipies">Receipies</a>
            <a class="btn" href="#/about">About</a>
        </nav>
    </p>
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
        <h3>Shopping Items</h3>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="newWhishlistItem" ref="newItem">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" v-on:click="addNewItem()">Enter Item</button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr v-for="item in items" v-bind:class="{'table-success': item.inCart}">
                    <td v-on:click="toggleCart(item)" >{{item | pprint}}</td>
                    <td class="text-right">
                        <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty -= 1">-</button>
                        <button type="button" class="btn btn-primary btn-lg" v-on:click="toggleCart(item)">{{item.qty}}</button>
                        <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty += 1">+</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
`;

export {
    AboutTemplate,
    NavbarTemplate,
    MainTemplate,
    ShoppingTemplate,
    WhishListTemplate
};