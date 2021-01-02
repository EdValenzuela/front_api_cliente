export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        // console.log(JSON.parse(localStorage.getItem("token")));
        return true;
    } else {
        return false;
    }
};
