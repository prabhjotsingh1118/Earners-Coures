

// this ek object hai
// function Product(name, price) {
//     console.log(this); //yeh this is function ko dikhayega 
// }

// function outter() {
//     const random = () => {
//         console.log(this);
//         random()
//     }
// }
// outter()

// console.log(this);


// isme jo terminal mein function aayega usme name and price add kar diya
// in short yeh this. yeh add kar diya name and price
// function Product(name, price){
//     this.name = name
//     this.price= price
//     console.log(this);
// }
// Product("anime world" , 1212)





// isme jo terminal mein function aayega usme name and price add kar diya
// in short yeh this. yeh add kar diya name and price
// function Product(name, price){
//     let obj = () //object yeh khali start ho rha hai iska solution hai (new keyword)
//     this.name = name
//     this.price= price
//     return this;
// }
// const p1 = Product("anime world" , 1212)
// //yeh dono same this ko access kar rahe hai tho yeh pehle anime world aa geya this mein and baad mein jab dragon ball me this ko access kiya tho dragon ball print ho geya 
// const p2 = Product("dragon ball" , 2424)

// console.log(p1.name);


// isme jo terminal mein function aayega usme name and price add kar diya
// in short yeh this. yeh add kar diya name and price
// function Product(name, price){
//     this.name = name
//     this.price= price
//     return this;
// }
// const p1 = new Product("anime world" , 1212) //yeh short and more readible hoga
// //yeh dono same this ko access kar rahe hai tho yeh pehle anime world aa geya this mein and baad mein jab dragon ball me this ko access kiya tho dragon ball print ho geya 
// const p2 = Product("dragon ball" , 2424)

// console.log(p1);
// console.log(p2);





// function Product(name, price) {
//     this.name = name
//     this.price = price
// }
// const p1 = new Product("anime world", 1212) //yeh short and more readible hoga
// //yeh dono same this ko access kar rahe hai tho yeh pehle anime world aa geya this mein and baad mein jab dragon ball me this ko access kiya tho dragon ball print ho geya 
// // const p2 = Product("dragon ball" , 2424)

// console.log(p1);
// console.log(p2);





// class User {
//     country = "japan" //default property
//     constructor(name, country) {
//         this.name = name // instance property
//         this.country = country // instance property
//     }


//     printlName() { //instance method
//         console.log(this.name);
//     }
// }

// const u1 = new User("prabhjot", "Japan")
// // const u2 = new User("anime" , "Japan")

// u1.name = "name updated"
// console.log(u1);
// u1.printlName()





class BankAccoount {
    #balance; //this is private property
    static totalBankAccount;
    constructor(initialBalance) {
        this.#balance = initialBalance
        BankAccoount.totalBankAccount++;
    }

    get() {
        console.log(this.#balance);
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            console.log("paise nahi hai");
            return
        }
        this.#balance = this.#balance - amount
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log("pagal samja hai kya edge cases handle karne aate hai");
            return
        }
        this.#balance = this.#balance + amount
    }


    calculateTax() {
        console.log("calculating tax .....");
    }


}

let acc1 = new BankAccoount(1000);
let acc2 = new BankAccoount(1000);
let acc3 = new BankAccoount(1000);
let acc4 = new BankAccoount(1000);

// acc1.get()
// acc1.withdraw(1000)
// acc1.get()
// acc1.deposit(100000000)
// acc1.get()
// acc1.withdraw(10000)
// acc1.get()

// acc1.balance = 36212984124982321739480 // Private field '#balanced' mus be declared in an enclosing class

acc1.get()

acc1.deposit(-100)
acc1.get()

acc1.calculateTax()

console.log(BankAccoount.calculateTax);