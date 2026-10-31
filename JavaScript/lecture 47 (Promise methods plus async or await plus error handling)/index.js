// async function fun2() {
//     // console.log("anime");
//     return 11
// }


// function fun1() {
//     // console.log("world");
//     return Promise.resolve(10)
//     // return 10
// }

// console.log(fun2());
// console.log(fun1());






// console.log("a");

// async function fun3() { //aagar async likha hai jaruri nahi hai ki yeh async hoga / yeh ek normal function hai
//     console.log("b");
// }

// console.log("c");

// // fun3()
// console.log(fun3());    




// async function fun3() {
//     return "anime"
// }

// // fun3().then(data => {
// //     console.log(data);
// // })

// async function fun5() {

//     // fun3().then(data => {
//     //     console.log(data);
//     // })

//     // or  

//     let data = await fun3() //yeh easy hai likhne ke liye
//     let data2 = await fun4()
//     console.log(data,data2);
// }

// fun5()





// async function fun3() {
//     return "anime"
// }


// function fun4() {
//     return Promise.resolve("hello")
// }

// console.log("1");

// async function fun5() {
//     console.log("2");
//     let data = await fun3()
//     console.log("3");
//     let data2 = await fun4()
//     console.log("4");
//     console.log(data, data2);
// }

// console.log("prabhjot");

// fun5()

// console.log("5");






// console.log("a");

// async function random() {
//     console.log("b");

//     await 1;

//     console.log("c");
// }

// random()

// console.log("d");






let data;

async function userData() {
    return { name: "prabhjot" }
}

function fun4() {
    return Promise.reject("error aa geya")
}

async function fun5() {
    try { //try karo agar ho geya tho thik hai warna niche catch hai
        data = await userData()
        let data2 = await fun4()
        console.log(data, data2);
    } catch (error) { //catch error ko handle karga
        console.log(error);
    } finally { //yeh thoo chelega chahe jo bhi hai
        console.log("mein tho hamesha run karuga");
    }
}

fun5()

