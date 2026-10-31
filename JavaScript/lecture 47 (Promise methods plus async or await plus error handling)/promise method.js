

// function fun1() {
//     return new Promise((resolve, rejects) => {
//         resolve("hello")
//     })
// }

const { promise } = require("enhanced-resolve")
const { rejects } = require("node:assert")
const { resolve } = require("node:dns")

// async function fun2() {
//     return Promise.resolve("fun2")
// }


// async function fun3() {
//     return Promise.reject("fun3")
// } 





// function fun1() {
//     return Promise.resolve("fun1")
// }

// function fun2() {
//     return Promise.resolve("fun2")
// }


// function fun3() {
//     return Promise.resolve("fun3")
// } 

// let result = Promise.all([fun1(), fun2() ,fun3()]) //jaha par chije independent hai
 
// result.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })





// ALL :-
// function fun1() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun1")
//         }, 3000)
//     })
// }

// function fun2() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun2")
//         }, 1000)
//     })
// }


// function fun3() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun3")
//         }, 7000)
//     })
// } 

// let result = Promise.all([fun1(), fun2() ,fun3()]) //jaha par chije independent hai
 
// result.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })





// ALL settled:-
// function fun1() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun1")
//         }, 3000)
//     })
// }

// function fun2() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun2")
//         }, 1000)
//     })
// }


// function fun3() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             reject("fun3")
//         }, 5000)
//     })
// } 

// let result = Promise.allSettled([fun1(), fun2() ,fun3()]) //jaha par chije independent hai
 
// result.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })




// race
// function fun1() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun1")
//         }, 3000)
//     })
// }

// function fun2() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun2")
//         }, 1000)
//     })
// }


// function fun3() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             reject("fun3")
//         }, 5000)
//     })
// } 

// let result = Promise.race([fun1(), fun2() ,fun3()]) //jaha par chije independent hai
 
// result.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })





// .any
// function fun1() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun1")
//         }, 3000)
//     })
// }

// function fun2() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             resolve("fun2")
//         }, 1000)
//     })
// }


// function fun3() {
//     return new Promise((resolve , reject) => {
//         setTimeout(() => {
//             reject("fun3")
//         }, 5000)
//     })
// } 

// let result = Promise.any([fun1(), fun2() ,fun3()]) //jaha par chije independent hai
 
// result.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })



