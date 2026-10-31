
//call
// let user1 = {
//     name: "anime",
//     age: 100,
//     printName() {
//         console.log(`hii , i am ${this.name}`);
//     }

// }

// let user2 = {
//     name: "dragonBall",
//     age: 101,
  
// }

// let user3 = {
//     name: "goku",
//     age: 1000,
  
// }


// user1.printName()
// user1.printName.call(user2) //yeh call function se , jo user1 mein printName ka hai woo user2 mein aa jaye , user1 mein call lga doo user2 mein
// user1.printName.call(user3) //yeh call function se , jo user1 mein printName ka hai woo user3 mein aa jaye , user1 mein call lga doo user3 mein



// aur 



// let user1 = {
//     name: "anime",
//     age: 100,

// }

// let user2 = {
//     name: "dragonBall",
//     age: 101,
  
// }

// let user3 = {
//     name: "goku",
//     age: 1000,
  
// }

// function printName(country){
//     console.log(this);
//     console.log(`hii , i am ${this.name} , from ${country}`);
// }

// printName.call(user1 , "Japan")
// printName.call(user2 , "Korea")
// printName.call(user3 , "Dubai")






// //apply
// let user1 = {
//     name: "anime",
//     age: 100,

// }

// let user2 = {
//     name: "dragonBall",
//     age: 101,
  
// }

// let user3 = {
//     name: "goku",
//     age: 1000,
  
// }

// function printName(country, state){
//     console.log(this);
//     console.log(`hii , i am ${this.name} , from ${country} , ${state}`);
// }

// printName.call(user1 , "Japan" , "Tokyo")
// printName.call(user2 , "Korea" , "Pta nahi")
// printName.call(user3 , "Dubai" , "Burj khalifa")


//apply mein sirf yeh array mein lene hai
// printName.apply(user1 , ["Japan" , "Tokyo"])
// printName.apply(user2 , ["Korea" , "Pta nahi"])
// printName.apply(user3 , ["Dubai" , "Burj khalifa"])





//bind
let user1 = {
    name: "anime",
    age: 100,

}

let user2 = {
    name: "dragonBall",
    age: 101,
  
}

let user3 = {
    name: "goku",
    age: 1000,
  
}

function printName(country, state){
    console.log(this);
    console.log(`hii , i am ${this.name} , from ${country} , ${state}`);
}

const newFun = printName.bind(user1 , "Japan" , "Tokyo")
console.log(newFun);

newFun()