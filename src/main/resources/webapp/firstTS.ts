class speak {
    public static hello(person: string): string {
        return "Hello, " + person + ".";
    }


}


var user = "World";

console.log(speak.hello(user));
