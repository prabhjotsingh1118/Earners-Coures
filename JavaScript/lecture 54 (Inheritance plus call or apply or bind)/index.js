
class User {
    constructor(name, email) { //yeh part bhi repeated hai
        this.name = name;
        this.email = email;
    }

    login() { console.log("login");} //yeh dono part repeated hai
    logout() {console.log("logout"); }
    
    static sendEmail(){} //yeh static means yeh kisi ke saath share nahi karega , means yeh User hi use kar sakta hai aur koi bhi use nahi kar sakta hai
}


//yeh extends nahi hoga tho yeh login and logout access nahi hoga

//yeh extends means kon parent banga , jese isme User ko parent bna diya hai
class Customer extends User { //yeh customer ke functions hai buy karna , uska name , uski email etc.
    cart = [] //yeh square bracket means yeh array hai , //yeh cart customer kar sakta hai , yeh chije seller and , admin par nahi jeygi
    constructor(name, email , password) { //agar only yeh likha hai tho 2 - 2 constructor ho jayege
        super(name , email) //yeh super means yeh khud ko parent bna lega , isne parent ko call kiya hai , isme name and email user aa rahi hai sab , password customer ka hi action hai
        this.password = password
        // this.name = name;
        // this.email = email;
    }

    //yeh customer ke actions hai
    buyProduct() {console.log("buy product"); }
    addToCart(item) {this.cart.push(item)}
    showCartItems(){console.log("this.cart");}
    // login() { }
    // logout() { }
}


class Seller extends User {  //yeh seller ke functions hai
    // constructor(name, email) {
    //     // this.name = name;
    //     // this.email = email;
    // }

    //yeh action
    addProduct() { console.log("addProduct");}
    // login() {}
    // logout() {}

}


class Admin extends User { //yeh admin ke functions hai
    // constructor(name, email) {
    //     // this.name = name;
    //     // this.email = email;
    // }

    //yeh action
    hideProduct() { console.log("hideProduct");}
    monitor() {console.log("monitor");}
    // login() {}
    // logout() {}

}


// const c1 = new Customer("prabhjot" , "prabhjot@gmai.com" , "121279")
// // const s1 = new Seller("goku" , "goku@gmai.com")
// // const a1 = new Admin("vegeta" , "vegeta@gmai.com")
// console.log(c1);
// // console.log(s1);
// // console.log(a1);
// // c1.logout()

// c1.addToCart("macBook")
// c1.showCartItems()


class PremiumCustomer extends Customer{ //aab iska parent Customer hai
    constructor(name , email , password) {
        super(name ,  email , password) //yeh Customer ko call karega
    }

    getDiscount(){}
}

const pc1 = new PremiumCustomer ("anime" , "anime@gmail.com" , "1212_7979" )
console.log(pc1);

