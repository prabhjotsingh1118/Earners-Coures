

function outter() {
    let a = 5;
    function inner() {
        console.log(a);
        let a = 7;
    }
    inner()
}
outter()