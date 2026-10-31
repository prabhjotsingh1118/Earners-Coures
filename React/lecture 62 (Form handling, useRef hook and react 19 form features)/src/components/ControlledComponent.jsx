import { useState } from 'react'

function ControlledComponent() {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const [form, setForm] = useState({ name: "anime", email: "", password: "" })

    function signUp(e) {
        e.preventDefault()    //isse yeh submit hone par reload nahi hoga
        console.log(form)
    }


    function handleInput(e) {
        // let value = e.target.value;
        // let name = e.target.name;

        //aur , yeh dono same hi kaam kar rahe hai yeh niche wala short hai 

        const { value, name } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))


    }


    console.log("re rendered")

    //yaha onInput data collect karne ke liye hai
    return (
        <div>
            <h1>Form in React (UnControlledComponent) - {form.name}</h1>
            <form action="" onSubmit={signUp}>
                <label htmlFor="name">Name :</label>
                <input value={form.name} type="text" name='name' id='name'
                    onInput={handleInput} />
                <br />
                <label htmlFor="name">Email :</label>
                <input type="text" name='email' id='Email'
                    onInput={handleInput} />
                <br />
                <label htmlFor="name">Password :</label>
                <input type="text" name='password' id='Password'
                    onInput={handleInput} />
                <br />
                <button>Submit</button>


            </form>


        </div>

    )
}

export default ControlledComponent;


