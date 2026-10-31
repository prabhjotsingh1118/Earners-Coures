
// console.log("Task 1");



// console.log("Task 2");

// // for (let i = 0 ; i < 10000000000 ; i++){

// // }

// let startTime = Date.now() // 1sec mein 1000mili sec hote hai // 10000mili sec = 10sec
// while (Date.now() - startTime < 10000) {

// }

// console.log("Task 3");








// console.log("Task 1");

// // setTimeout() //yeh chij web api hai browser se li gayi hai
// setTimeout(function cb() { //yeh chij aur der baad task 3 print kargi and task 3 last mein print hoga
//     console.log("Task 3");
//     let startTime = Date.now() 

//     while(Date.now() - startTime < 10000){
// }
// },0)

// console.log("Task 2");







// console.log("task 1");

// setTimeout(() => {
// console.log("anime");
// })

// console.log("task 2");






// setTimeout(() => {
// console.log(anime);                                                                                                                                                                  
// },4000)








// // lecture 44 time 1h 20min yeh samaj sakte hai.
// console.log("task 1");

// setTimeout(() => { //setTimeout wait karga jitna time hai
// console.log("anime");
// },0)

// console.log("task 2");









// console.log("task 1");

// setTimeout(() => {
//     console.log("task 2");  //yeh last mein aayega kiyuki iska time jayda hai baki sab se
// }, 8000)

// setTimeout(() => {
//     console.log("task 5");
// }, 4000)
// // yeh dono ka time same hai par upar wala pehle aayega
// setTimeout(() => {
//     console.log("task 4");
// }, 4000)

// console.log("task 3");










// console.log("task 1");

// setTimeout(() => {
//     console.log("task 2");  //yeh last mein aayega kiyuki iska time jayda hai baki sab se
// }, 3000)


// yaha dono bich yeh ho raha hai , means task 2 ka time start ho geya next line mein date.now wala tha usne js ko maan lo stop kar diya par task 2 ka time chalta raha hai ab 10 sec complete hone ke baad task 2 pehle print hoga fir task 5 and task 4


// yeh ( while loop ) hai means “Jab tak condition true hai, tab tak same code baar-baar chalao.”
// let startTime = Date.now() // 1sec mein 1000mili sec hote hai // 10000mili sec = 10sec
// while (Date.now() - startTime < 10000) { //yeh date.now - starttime yeh hai ki (startTime = 1,759,000,000,000 ms) inte milisec par start kiya hai and baad mein yeh date.now ke sisaab se yeh 1s baad (Date.now() = 1,759,000,001,000 ms) yeh inta ho geya tho inn dono ka minus 1000 and yeh while loop ke sisaab se yeh 10,000 means 10sec tak chalega thoo yeh ek 10s ke liye js ko block kar diya (js ko stop kar diya par upar wale time nahi ruka tho yeh task 2 pehle print hoga) kiyuki js line by line code execute hoga.

// }

// setTimeout(() => {
//     console.log("task 5");
// }, 2000)
// // yeh dono ka time same hai par upar wala pehle aayega
// setTimeout(() => {
//     console.log("task 4");
// }, 2000)

// console.log("task 3");




//setInterval


// yeh infinity time ke liye loop lag geya , yeh 1sec baad print hota rahega
// setInterval(() => { //interval ka meaning ek fixed time ke baad execute/print hogi
//     console.log("anime");
// }, 1000);




// yeh code mein code chala and close ho geya , kiyuki niche clearInterval lga hai
// let id = setInterval(function () {
//     console.log("hii");
// }, 2000);

// // console.log(id);

// clearInterval(id) //yeh kisi chij ko band/close karne ke liye hai







// let count = 0 //yeh number 0,1,2,3,4 // yaha starting number dena hai jese 0,1,2,3,4
// let id = setInterval(function () {


//     if (count > 5) {
//         clearInterval(id)
//     }

//     console.log("hii");
//     count++

// }, 1000);
// output 6 baar print hoga




// let count = 0 //yeh number 0,1,2,3,4 // yaha starting number dena hai jese 0,1,2,3,4
// let id = setInterval(function () {

//     console.log("hii");

//     if (count > 5) {
//         clearInterval(id)
//     }

//     count++

// }, 1000);
//output 7 bar print hoga





// yeh ek disco lights ka code hai

const body = document.querySelector("body")

let colorStr = "0123456789abcdef"

// let random = Math.random()


setInterval(() => {

    let color = ""
    for (let i = 0; i < 6; i++) {
        let randomValue = Math.floor(Math.random() * colorStr.length)

        color = color + colorStr[randomValue]
    }

    body.style.backgroundColor = `#${color}`
}, 400);
// console.log({random ,  "colorStr.length": colorStr.length, "random * colorStr.length": random * colorStr.length});
// console.log(randomValue);

// let color = "67a839"  