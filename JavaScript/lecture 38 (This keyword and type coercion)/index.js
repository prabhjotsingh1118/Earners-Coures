// let student = {
//     name : "anime",
//     printName : function() {
//         console.log("name");
//     }
// }

// student.printName()

// let student = {
//     name : "anime",
//     printName : function() {
//         console.log(this.name);
//     }
// }

// student.printName()



// let student = {
//     name : "anime",
//     printName : function() {
//         console.log("hello,", this.name);
//     }
// }

// let result = student.printName;
// result()




// var name = "something";

// function fun4() {

//     let product = {
//         name: "Iphone",

//         printName: function () {

//             const print = () => {
//                 console.log(this.name);
//             }

//             print();
//         }
//     }

//     product.printName();
// }

// fun4();

var name = "something";

function fun4() {
    let product = {
        name: "anime",

        printName: function () {
            const print = () => {
                console.log(this.name);
            }

            print();
        }
    }

    product.printName();
}

fun4();