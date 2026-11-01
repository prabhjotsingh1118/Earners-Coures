
function withAuth(Component) {
    return function (props) {
        console.log(props)
        let isLoggedIn = false;
        if (isLoggedIn) {
            return <Component />;
        }

        return <p>Please login to access </p>
    }
}

export default withAuth