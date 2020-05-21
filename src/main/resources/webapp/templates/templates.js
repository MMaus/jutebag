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
        <p>{{foo}}</p>
        <ul>
        <li v-for="item in items">{{item | pprint}} of {{item.qty}} barz
        <button class="btn" v-on:click="addBeer">+beer</button>
        </li>

        </ul>
        <div v-for="item in items" class="row" style="margin: auto">
            <div class="col bg-secondary text-white border">{{item | pprint}}
            </div>
            <div class="col bg-secondary">
                <div class="btn-group">
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty -= 1">-</button>
                    <button type="button" class="btn btn-primary btn-lg">{{item.qty}}</button>
                    <button type="button" class="btn btn-dark btn-lg" v-on:click="item.qty += 1">+</button>
                </div>
            </div>
            <div class="col bg-dark"><button class="btn" v-on:click="addBeer">+beer</button></div>
        </div>
        <h3>End of items</h3>
    </div>
`;

export {
    AboutTemplate,
    NavbarTemplate,
    MainTemplate,
    ShoppingTemplate,
    WhishListTemplate
};