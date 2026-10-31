//This is callBack function


// function fun1 (callBack){
//     console.log("anime");
//     callBack()
// }

// function callBack(){
//     console.log("this is callBack function");
// }

// fun1(callBack)




// let name = "Prabhjot"
// function hello(name){
//     console.log(name);
// }
// hello(name)







// yeh sync callback function hai
// function fun1(callBack) {
//     console.log("anime");
//     callBack()
// }

// function callBack() {
//     console.log("this is callBack function");
// }

// fun1(callBack)



//yeh bhi sync callback function hai
// let arr = ["a","b","c","d"]
// arr.forEach()
// arr.map()




// let arr = ["a", "b", "c", "d"]
// function a() {
//     function b() {

//     }
//     return b
// }









// // yeh sara code hi async hai
// function searchPizza(cb1) {
//     console.log("pizza searching....");

//     setTimeout(function fun1() {
//         console.log("here is pizza menu");
//         let price = 500;
//         cb1(price)
//     }, 2000)

// }


// function addToCart(cb2) {
//     console.log("pizza adding to cart....");
//     setTimeout(function fun2() {
//         console.log("pizza added to cart");
//         cb2()
//     }, 3000)
// }

// function payment(price, cb3) {
//     console.log(`payment.... , Amount: ${price}`);
//     setTimeout(function fun3() {
//         console.log(`Payment completed , Amount : ${price}`);
//         cb3()
//     }, 4000) 
// }

// // yeh callBack hell hai
// searchPizza(function a(price) { //yaha price callBack 1 function ke through recieve kar rahe hai / yeh cb1 hai
//     addToCart(function b() { //yeh cb2 hai
//         payment(price, function c() { //yeh cb3 hai
//             console.log("pizza on the way");
//         })
//     })
// })








// yeh sara code hi async hai
function searchPizza(cb1) {
    console.log("pizza searching....");

    setTimeout(function fun1() {
        console.log("here is pizza menu");
        let price = 500;
        cb1(price)
    }, 2000)

}


function addToCart(cb2) {
    console.log("pizza adding to cart....");
    setTimeout(function fun2() {
        console.log("pizza added to cart");
        cb2()
    }, 3000)
}

function payment(price) {
    console.log(`payment.... , Amount: ${price}`);
    setTimeout(function fun3() {
        console.log(`Payment completed , Amount : ${price}`);
        console.log("pizza on the way");
    }, 4000)
}

// yeh callBack hell hai   
searchPizza(function a(price) { //yaha price callBack 1 function ke through recieve kar rahe hai / yeh cb1 hai
    addToCart(function b() { //yeh cb2 hai
        payment(price)
    })
})
   





