import React from "react";

// AuthContext is an object that returns a component(s). Instance: Provider Component.
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;