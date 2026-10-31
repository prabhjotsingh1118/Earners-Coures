
// let originalPrices = [422, 488, 8448]

// let discountedPrices = []


// for (value of originalPrices) {
//     discountedPrices.push(value * 0.9) //10% discount
// }

// console.log(originalPrices);
// console.log(discountedPrices);



// const discountedPrices2 = originalPrices.map((value) => {
//     return value * 0.9
// })

// console.log(discountedPrices2);


// let students = [
//     {
//         name: "anime",
//         marks: 100,
//     },

//     {
//         name: "dragonBall",
//         marks: 98,
//     },

//     {
//         name: "dragonBall",
//         marks: 94,
//     },

//     {
//         name: "dragonBall",
//         marks: 99
//     }
// ]

// let  studentsName = []

// students.forEach((value) => {
//     studentsName.push(value.name)
// });

// console.log(studentsName);


// const studentsName = students.map((students) => students.name)
// const studentsmarks = students.map((students) => students.marks)


// console.log(studentsName,studentsmarks);


// let boostedMarks = students.map((students) => {
//     return{...students,marks : students.marks + 10}
// })


// let boostedMarks = students.map((students) => 
// ({...students,marks : students.marks + 10}))

// console.log(boostedMarks);



// let students = [
//     {
//         name: "anime",
//         marks: 100,
//     },

//     {
//         name: "dragonBall",
//         marks: 98,
//     },

//     {
//         name: "dragonBall",
//         marks: 94,
//     },

//     {
//         name: "dragonBall",
//         marks: 99
//     }
// ]


// let passedStudents = []
// students.forEach ((students) => {
//     if (students.marks > 33 ) {
//         passedStudents.push (students)
//     }
// })

// console.log(passedStudents);


// const passedStudents = students.filter ((students) => students.marks > 33).map ((students) => students.name)
// // console.log(passedStudents);

// // const passedStudentsName = passedStudents.map ((students) => students.name)
// console.log(passedStudents);


let marks = [24,44,34,14,84,98]

// let totalMarks = 0 
// marks.forEach((marks) => totalMarks = totalMarks + marks)

const totalMarks = marks.reduce((accumulator , currentValue) => {
    accumulator = accumulator + currentValue
    return accumulator;
},0 )

console.log(totalMarks);