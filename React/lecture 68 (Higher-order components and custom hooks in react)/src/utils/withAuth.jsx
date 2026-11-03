
function withAuth(Component) {
    return function (props) {
        let isLoggedIn = true;
        if (isLoggedIn) {
            return <Component {...props} />;
        }

        return <p>Please login to access </p>
    }
}

export default withAuth;