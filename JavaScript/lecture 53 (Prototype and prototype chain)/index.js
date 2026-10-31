
// let user = {
//     name : "prabhjot",
//     age : 18
// }


// console.log(user);



// let arr = [1,2,3,4]
// console.log(arr);


// let arr = [1,2,3,4]
// console.log(arr.__proto__); //yeh proto dega

// let arr = [1,2,3,4]
// console.log(arr.__proto__.__proto__); //yeh proto ke ander wala proto dega


// let arr = [1,2,3,4]
// console.log(arr.__proto__.__proto__ === user.__proto__);  //yeh true dega


// Array.prototype.prabhjot = function() {

// }
// let arr = [1,2,3,4]

// console.log(arr.__proto__);



// Array.prototype.prabhjot = function(arr) {
//     for(let i = 0 ; i < arr.length ; i++){
//         console.log(arr[i]);
//     }
// }
// let arr = [1,2,3,4]

// console.log(arr.__proto__);

// arr.prabhjot(arr)

// let colors = ["red" , "orange" , "green" , "purple"]
// colors.prabhjot(colors)



// Array.prototype.prabhjot = function() {
//     for(let i = 0 ; i < this.length ; i++){ //yeh this bata hai ki kis par call lagna hai yeh khud par hi hai , means yeh this arr ko call karega
//         console.log(this[i]); 
//     }
// }
// let arr = [1,2,3,4]

// console.log(arr.__proto__);

// arr.prabhjot()

// let colors = ["red" , "orange" , "green" , "purple"]
// colors.prabhjot()




// String.prototype.anime = function(){ //yeh anime ek custom made function ban geya hai
//     console.log("yeh mene banaya hai");
// }

// "dragonball".anime()



// String.prototype.firstTwoCharacters = function () { //yeh anime ek custom made function ban geya hai
//     console.log(this[0] + this[1]);
//     return this[0] + this[1]
// }

// "prabhtjot singh".firstTwoCharacters() //yaha ispar jo bhi likhoge yeh woo de dega




// let arr = [1,2,3,4]

// console.log(arr.__proto__);

// arr.prabhjot()

// let colors = ["red" , "orange" , "green" , "purple"]
// colors.prabhjot()


// String.prototype.firstTwoCharacters = function () { //yeh anime ek custom made function ban geya hai
//     console.log(this[0] + this[1]);
//     return this[0] + this[1]
// }

// "prabhtjot singh".firstTwoCharacters() //yaha ispar jo bhi likhoge yeh woo de dega



// let user = {  
//     name : "prabhjot",
//     toString(){ //yeh js ka method hai jo sab ke paas hai
//         console.log("yeh apna method hai");
//     }
// }

// user.toString()



// let animal = {
//     eat() { //yeh animal karte hai

//     }
// }

// let person = Object.create(animal) //yeh object.creat se ek object banaya hai and usme animal de diya hai

// person.walk = function () { //walk , eat  person dono karte hai
//     console.log("walk");
// }

// let student = Object.create(person)

// student.study = function () { //walk , eat , study student karte hai
//     console.log("study");
// }

// console.log(person);
// console.log(student);

// console.log(student.hasOwnProperty("study")); //yeh has wali property btati hai ki student ki property study hai




 