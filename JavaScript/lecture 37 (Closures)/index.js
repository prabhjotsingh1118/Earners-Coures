


// function outter() {
//     let a = 5;
//     function inner() {
//         console.log(a);
//         let a = 7;
//     }
//     inner()
// }
// outter()

//output erorr




// function outter() {
//     var a = 5;
//     function inner() {
//         console.log(a);
//         var a = 7;
//     }
//     inner()
// }
// outter()

//output undefined



// function outter() {
//     const a = 5;
//     function inner() {
//         console.log(a);
//         var a = 7;
//     }
//     inner()
// }
// outter()

//output undefined



// function outter() {
//     const a = 5;
//     function inner() {
//         console.log(a);
//         const a = 7;
//     }
//     inner()
// }
// outter()    

//output erorr




function outter() {
    const a = 5;
    function inner() {
        console.log(a);
    }
  
    return inner;
}
const response = outter();
console.log(outter);
console.log(response());