import { useEffect, useRef } from "react"

function UnControlledComponentUseRef() {

    const nameRef = useRef("Anime")


    function signUp(e) {
        e.preventDefault()    //isse yeh submit hone par reload nahi hoga

        const formData = new FormData(e.target)
        console.log(Object.fromEntries(formData))

        // nameRef.current.style.color = "red"
        nameRef.current.foucs()


    }


    console.log("re rendered")

    //yaha onInput data collect karne ke liye hai
    return (
        <div>
            <h1>Form in React (ControlledComponent - UseRef)</h1>
            <form action="" onSubmit={signUp}>
                <label htmlFor="name">Name :{" "}</label>
                <input ref={nameRef} type="text" name='name' id='name' />
                <br />
                <label htmlFor="name">Email :</label>
                <input type="text" name='email' id='Email' />
                <br />
                <label htmlFor="name">Password :</label>
                <input type="text" name='password' id='Password' />
                <br />
                <button>Submit</button>


            </form>


        </div>

    )
}

export default UnControlledComponentUseRef;





