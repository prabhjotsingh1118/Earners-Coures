import { useState } from "react";

function Counter(props) {

    // const result = useState(0)
    // const value = result[0]
    // const setValue = result[1]
    //or , yeh doo tarike hai
    let [value , setValue] = useState(0)

    let count = 0; //this is normal variable , iski value update karoge thoo kisi ko koi farak nahi padta , jab tak rerendering nahi hoga tab tak kuch nahi hoga

    function increment() {
        // count++;
        setValue(value++)
    }

    function decrement() {
        // count--
        setValue(value--) 
    }

    return (
        <div>
            <h1>Counter</h1>

            <button onClick={increment}>+</button>

            <p>{value}</p>

            <button onClick={decrement}>-</button>
        </div>
    )
}

export default Counter






