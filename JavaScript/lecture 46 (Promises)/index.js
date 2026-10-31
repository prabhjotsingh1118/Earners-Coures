
// const p = new Promise() //new keyword means new object bana rahe hai

const { promise } = require("enhanced-resolve");
const { futimes } = require("node:fs");
const { createGunzip } = require("node:zlib");


// const p = new Promise(function(){})


// const p = new Promise(function(resolve , reject){ }) 
// const p = new Promise(function(a , b){ }) //yeh resolve and reject variables hai kuch bhi likh sakte hai



// const p = new Promise(function(resolve , reject){
//     return "anime";
// })





// const p = new Promise(function (resolve, reject) {
//     // resolve("anime")
//     // reject("server down hai")  //yeh error dega ki server down hai , jese pizza ki request di par uske server down hai
// })

// console.log(p);







// how to consume promises 

//.then
// const p = new Promise(function (resolve, reject) { //yeh dono ek saath nahi chale sakte kiyuki ek baar resolve ja reject aane ke baad pending state mein nahi ja sakte
//     // resolve("anime")
//     reject("server down hai")
// })

// console.log(p);
// then means method //yeh dono method khud hi chalege resolve hone par onFulfilled ja reject hone par onRejected.

// p.then(function onFulfilled(val){
//     console.log(val);
// } , function onRejected(val){ 
//     console.log(val);
// })

// yeh dono same hai

// p.then(function (val) {
//     console.log(val);
// }, function (val) {
//     console.log(val);
// })





//promises chaining
// const p = new Promise(function (resolve, reject) { //yeh dono ek saath nahi chale sakte kiyuki ek baar resolve ja reject aane ke baad pending state mein nahi ja sakte
//     resolve("anime")
//     // reject("server down hai")
// })



// const res = p.then(function onFulfilled(val) {
//     console.log(val);
// }, function onRejected(val) {
//     console.log(val);
// })

//     .then(() => { }, () => { })
//     .then()
//     .then()


// yeh dono same hai


// const res = p.then(function (val) {
//     console.log(val);
// })

//     .then(() => { }) //yeh fulfilled and reject ke liya hai
//     .then()
//     .then()
//     .catch(function (val) {
//         console.log(val);
//     })







// .finally 
// const p = new Promise(function (resolve, reject) { //yeh dono ek saath nahi chale sakte kiyuki ek baar resolve ja reject aane ke baad pending state mein nahi ja sakte
//     resolve("anime")
//     // reject("server down hai")
// })


// const res = p.then(function (val) {
//     console.log(val);
// })

//     .then(() => { }) //yeh fulfilled and reject ke liya hai
//     .then()
//     .then()
//     .catch(function (val) { //error hannding hamesha last mein hoge agar .finally hai tho seconnd last mein
//         console.log(val);
//     })
//     .finally(function () {
//         console.log("yeh hamesha chalega");
//     })






// console.log("a");

// const p2 = new Promise(function (resolve, reject) {
//     console.log("b");
//     resolve("hello")
// })

// p2.then(function f2(val) {
//     console.log("then");
//     console.log(val);
// }).catch(function f3() {
//     console.log("catch");
// }).finally(function f4() {
//     console.log("finally");
// })

// console.log("c");










// const p3 = new Promise(function f1(resolve, reject) {
//     resolve() //yeh line sirf inta batati hai ki promise fulfill hai ja nahi
// }) 

// // Promise.resolve().then(function f2 (){
// //     console.log("inside resolve promise");
// // })

// // p3.then(function f3(){
// //     console.log("f3 function");
// // })

// setTimeout(function fun3(){
//     console.log("setTimeout");
// },2000)

// p3.then(function f3(){
//     console.log("f3 function");
// })








   


