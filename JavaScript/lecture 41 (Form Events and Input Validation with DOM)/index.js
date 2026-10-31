
// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")


// form.addEventListener("submit" , (e) => {
//     e.preventDefault();   //yeh chij default broswer ko rook deti hai jo yeh apne aap hi refresh ho raha tha
//     console.log("Hello");
// })  





// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = document.querySelector("#name").value
//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({name, email, password});
// })





// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")
// const username = document.querySelector("#username")


// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({ username : username.value, email, password });
// })

// username.addEventListener("input" , (e) => {
//     console.log(username.value);
// })






// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")
// const username = document.querySelector("#username")
// const bio = document.querySelector("#bio")
// const remainletter = document.querySelector("#remainletter")


// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({ username : username.value, email, password });
// })

// bio.addEventListener("input" , (e) => {
//     const remaining = 400 - bio.value.length;
//     remainletter.textContent = `${remaining} letter remaining`;
// })





// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")
// const username = document.querySelector("#username")
// const bio = document.querySelector("#bio")
// const remainletter = document.querySelector("#remainletter")

// const LIMIT = 100

// remainletter.textContent = `${LIMIT} letter remaining`

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({ username : username.value, email, password });
// })

// bio.addEventListener("input" , (e) => {
//     const remaining = LIMIT - bio.value.length;
//     remainletter.textContent = `${remaining} letter remaining`;
// })








// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")
// const username = document.querySelector("#username")
// const bio = document.querySelector("#bio")
// const remainletter = document.querySelector("#remainletter")

// const LIMIT = 100

// remainletter.textContent = `${LIMIT} letter remaining`

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({ username: username.value, email, password });
// })

// bio.addEventListener("input", (e) => {
//     const remaining = LIMIT - bio.value.length;
//     remainletter.textContent = `${remaining} letter remaining`;
// })


// username.addEventListener("change", (e) => {
//     console.log("change event", username.value);
// })

// username.addEventListener("input", (e) => {
//     console.log("input event", username.value);
// })






// const form = document.querySelector("#form")
// const btn = document.querySelector("#btn")
// const username = document.querySelector("#username")
// const bio = document.querySelector("#bio")
// const remainletter = document.querySelector("#remainletter")
// const checkbox = document.querySelector("#checkbox")
// const animecr = document.querySelector("#animecr")


// const LIMIT = 100 

// remainletter.textContent = `${LIMIT} letter remaining`

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value

//     console.log({ username: username.value, email, password });
// })

// bio.addEventListener("input", (e) => {
//     const remaining = LIMIT - bio.value.length;
//     remainletter.textContent = `${remaining} letter remaining`;
// })



// username.addEventListener("change", (e) => {
//     console.log("change event", username.value);
// })

// username.addEventListener("input", (e) => {
//     console.log("input event", username.value);
// })







const form = document.querySelector("#form")
const btn = document.querySelector("#btn")
const username = document.querySelector("#username")
const bio = document.querySelector("#bio")
const remainletter = document.querySelector("#remainletter")
const checkbox = document.querySelector("#checkbox")
const animecr = document.querySelector("#animecr")
const passwordHint = document.querySelector("#passwordHint")
const password = document.querySelector("#password")
const error = document.querySelector("#error")


const LIMIT = 100


remainletter.textContent = `${LIMIT} letter remaining`


function showError(input, errorMessage) {
    input.parentElement.querySelector(".error").textContent = errorMessage
}


function clearError(input) {
    input.parentElement.querySelector(".error").textContent = ""

}


function ValidUsername(username) {
    if (username.value.trim().length === 0) {
        showError(username, "Enter your username")
        return false
    }


    if (username.value.trim().length < 3) {
        showError(username, "username min 3 letters are required")
        return false
    }

    clearError(username)

    return true

}



function ValidPassword(password) {
    if (password.value.trim().length === 0) {
        showError(password, "Enter valid password")
        return false
    }


    if (password.value.trim().length < 8) {
        showError(password, "password min 8 letters are required")
        return false
    }

    clearError(password)

    return true

}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isUserNameValid = ValidUsername(username); // pasing username element
    const isPasswordValid = ValidPassword(password); // passing password element

    if (isUserNameValid && isPasswordValid) {
        document.querySelector("h1").classList.remove("hidden")
    } else {
        document.querySelector("h1").classList.add("hidden")
    }


})


bio.addEventListener("input", (e) => {
    const remaining = LIMIT - bio.value.length;
    remainletter.textContent = `${remaining} letter remaining`;
})


checkbox.addEventListener("input", (e) => {
    console.log(checkbox.checked);
})



animecr.addEventListener("change", (e) => {
    console.log(animecr.value);
})


username.addEventListener("focus", (e) => {
    console.log("focus");
})


username.addEventListener("blur", (e) => {
    console.log("blur");
})



password.addEventListener("focus", (e) => {
    passwordHint.classList.remove("hidden")
})

password.addEventListener("blur", (e) => {
    passwordHint.classList.add("hidden")
})
