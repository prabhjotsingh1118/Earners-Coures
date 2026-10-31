// let student = {
//     name: "anime",
//     rollNo: 34,
//     subject: ["goku", "goku", "itachi", "hashirama"]
// }



// how to rename
// let {subject : naruto , ...variable} = student
// console.log(naruto);


// let {subject : naruto , totalMarks = 600, ...variable} = student
// console.log(totalMarks);


// let obj1 = {
//     name: "anime",
//     phone: 864544
// }

// let japan = "country"

// let obj2 = {
//     address: "japan",
//     andharCard: 6555456223448888,
//     name : "toji" //yeh over write hojayega upar wali se tho upar wali aa jaye gi
// }

// let obj3 = {...obj1 , ...obj2}
// console.log(obj3);


// array and object update 
// const obj = [1,2,3,4]

// obj [1] = "update"

// console.log(arr);


// const obj = {
//     name : "anime",
//     rollNo : 24,
//     address :null
// }

// obj["name"] = "dragonball"
// obj.name = "goku"

//  delete obj.rollNo //delete karne ke use hoti hai

// console.log(obj);

// console.log(obj.address?.street); //yeh chij safely run karne ke liye hai / means pta nahi hai ja nahi ek ans nahi hai



// let arr1 = [1,2,3,4,5,6,7,8]

// arr1.splice(2,1) //delete karna 
// arr1.splice(3,0,2) //add karna
// arr1.splice(3,1,2) //add karna
// arr1.splice(3,1,["anime","dargonball"])

// let trimArr = arr1.slice(1,3) //like pizza slice


// console.log(arr1.indexOf(4));
// console.log(arr1.indexOf(488));




// let arr1 = [1,2,3,4,5,6,7,8]

// let res = arr1.find((value) => {
//     return value ===3;
// })
// console.log(res);


// let arr3 = [1,2,3,4,5,6,7,8 ,[1,2,3,4 , [1,2,3,4] ] ]


// console.log(arr3.flat(Infinity));



// //mutability
// let arr4 = [1,2,3,4]

// let arrCopy = arr4;
// let arrCopy2 = [...arr4]; //spread opreator

// arrCopy2.pop()

// console.log("arr4",arr4);
// console.log("arrcopy",arrCopy2);








