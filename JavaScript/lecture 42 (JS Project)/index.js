// // let todos = ['go to gym', "anime", "coding"]
// let todos = []


// const todoform = document.querySelector("#todoform")
// const todoinput = document.querySelector("#todoinput")
// const todolist = document.querySelector("#todolist")

// todoform.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const todovalue = todoinput.value;
//     todos.push(todovalue)
//     console.log("ander wala : ", todos);

//     renderTodo() // jab koi naya todo add hoga first update todos render ho jayenge

// })


// function renderTodo() {
//     todolist.innerHTML = "" //isse purani list hat rahi hai new add ho rahi hai paar aesa lagega ki yeh ek chij add ho rahi hai
//     todos.forEach(function (todo) {
//         const li = document.createElement("li")

//         li.textContent = todo
//         todolist.append(li)
//     })
// }

// renderTodo() //jab first time file excute hogi tab existing todos render ho jayenge

// console.log("bahar : ", todos);















const todoform = document.querySelector("#todoform")
const todoinput = document.querySelector("#todoinput")
const todolist = document.querySelector("#todolist")
const formbtn = document.querySelector("#formbtn")
const taskcount = document.querySelector("#taskcount")
const completecount = document.querySelector("#completecount")






// let todos = ['go to gym', "anime", "coding"]
// let todos = [ //yeh array mein rakhe hai [] bracket mein
//     {
//         id: Date.now() + 1,
//         text: "go to gym",
//         isCompleted: false
//     },
//     {
//         id: Date.now() + 2,
//         text: "anime",
//         isCompleted: true
//     },
//     {
//         id: Date.now() + 3,
//         text: "coding",
//         isCompleted: false
//     }
// ]


let todos = JSON.parse(localStorage.getItem("todos")) || [];


let editTodoId = null //flag
todoform.addEventListener('submit', (e) => {
    e.preventDefault() //yeh isliye hai submit karne ke baad browser ke default behaviour se bachne ke liye. ki yeh baar baar reload na ho.



    //yeh connect hai isse const todoinput = document.querySelector("#todoinput") //yeh trim space ko trim kar dega means hata dega
    const todoValue = todoinput.value.trim();  //Input box mein user ne jo bhi likha hai, usko todoValue mein save kar lo

    //agar todo ki value empty hai means "" then we do !"" => true and ! is logical not operator
    if (!todoValue) {
        return
    }


    console.log({ editTodoId, todoValue });

    if (editTodoId !== null) {
        //editing

        todos = todos.map((todo) => { //yeh map ek specific value ko update kar dega , example a,b,c,d yeh c ka color change karna hai thoo yeh === pehle dundega ki c kon sa hai and yeh c ka color change kar dega but baki sab vese hi rahege
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo, //yeh value ko bikher dega hai
                    text: todoValue //yeh update value kar dega
                }
            }
            return todo
        })
        formbtn.textContent = "Add" //yeh update hone ke baad button firse add par aa jayega
        editTodoId = null
    }

    else {
        //adding
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }
        todos.push(newTodo)

        //yeh dono chije same hi hai


        // todos.push({
        //     id: Date.now(),
        //     text: todoValue,
        //     isCompleted: false
        // })

    }

    todoinput.value = "" //yeh kuch bhi karne ke baad add/edit karne ke baad empty kar dega input ko

    renderTodo() // jab koi naya todo add hoga tho yeh firse update kar dega aur new todo render ho jayenge

})


// yeh dono connect hai render wali chij


function renderTodo() {

    localStorage.setItem("todos", JSON.stringify(todos))
    todolist.innerHTML = "" //isse purani list hata rahi hai new add ho rahi hai paar aesa lagega ki yeh ek chij add ho rahi hai
    // or   //yeh dono same hai
    // todolist.textContent = ""


    todos.forEach(function (todo) {
        const li = document.createElement("li")

        //li.setAttribute("class" , "flex gap-2 border border-slate-300 p-4 rounded-xl")
        //or 
        li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`



        // li.setAttribute("data-id" , todo.id) //yeh jugaadh hai
        //or   //yeh dataset extra information jese sab ki alag alag id ho 12487 ke yeh and dusre ki yeh 09854 aese
        li.dataset.id = todo.id //yeh original tarika hai //yeh yeh id likhi hai jisko provide karwani hai


        //${todo.isCompleted ? "checked" : ""} yeh hai agar isCompleted true hai tho checked kar dena warna khali rehne dena
        li.innerHTML = `  
                    <input  data-action="toggle" ${todo.isCompleted ? "checked" : ""} type="checkbox">
                    <p class="flex-1 ${todo.isCompleted ? "line-through text-red-500" : ""}">${todo.text}</p> 
                    <div class="flex gap-2">
                        <button data-action="edit">Edit</button>
                        <button data-action="delete">Delete</button>
                    </div> 
                    `


        todolist.append(li)

    })

    //yeh dono chije task and complete ke numbers ke liye hai
    taskcount.textContent = `TASKS (${todos.length})`
    completecount.textContent = `COMPLETED: ${todos.filter((todo) => todo.isCompleted).length}`


}
renderTodo() // jab koi naya todo add hoga tho yeh firse update kar dega aur new todo render ho jayenge





//yeh bahut sare todo ko bananeke liye hai  //alag alag id isliye chahiye , remove karne ke liye jese a,b,c,d hai and c remove karna hai
todolist.addEventListener('click', (e) => {

    e.stopPropagation()

    const li = e.target.closest('li')
    const id = li.dataset.id;



    // console.log(e.target); //ji par click kar rahe hai 
    // console.log(e.currentTarget); //ji element par eventListner lga hai



    //yeh id se remove karne ke liye hai , a,b,c,d hai c remove karna hai
    function deleteTodo(id) { //yeh action === delete se connect hai
        todos = todos.filter((todo) => {
            if (todo.id !== Number(id)) { //yeh Number id ki type match karne ke liye hai //yeh !== (not equal) yeh a,b,c,d hai c ke ilawa baki sab true ho jaye ge
                return todo //yeh return todo jo true wale hai unko bahar fek dega
            }
        })
        renderTodo()
    }
    //(todo.id !== Number(id)) yeh chij todo.id upar wali jo hai (date.now) wala hai and jis par click karege woo unmatch ho thoo woo delete ho jaye 

    //agar yeh === aese likhe ge tho yeh jo equal nahi hoge un sabko uda dega jese a,b,c,d hai c par click kiya c match ho geya baki sab ud jayege
    //    todos = todos.filter((todo) => {
    //         if (todo.id === Number(id)){ 
    //             return todo
    //         }
    //     })





    function startEdit(id) { //yeh startEdit means edit start huya hai

        editTodoId = id;

        let currentTodo = todos.find((todo) => { //todos.find((todo) yeh find method a,b,c,d,b, yeh hai thoo jese b find kiya tho yeh first wala b dega and yeh uske aage nahi jayega // and agar sabhi b chahiye hai thoo find all use karo
            if (todo.id === Number(id)) {
                return todo
            }
        })

        //yeh currentTodo.text means jo current todo task hai usko hi dena hai /usko ho update karna hai
        todoinput.value = currentTodo.text //yeh .value , .text read and write kam aata hai inse read bhi kar sakte hai and write/update bhi

        formbtn.textContent = "update" //yeh textContent text update karne ke kaam aata hai

    }




    let action = e.target.dataset.action //yeh chij button ka data-set ke bare mein bta dega

    if (action === "delete") {
        deleteTodo(id)
    }



    if (action === "edit") {
        startEdit(id)
    }



    if (action === "toggle") {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                console.log("hii");
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
        renderTodo()
    }




})

















