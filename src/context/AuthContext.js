import React, { useState, createContext } from 'react';

const MyAuthContext = createContext([{}, () => {}]);

const AuthContext = ({children}) => {
    const [auth, saveToken] = useState({
        token: '',
        auth: false
    });
    
    return (
        <MyAuthContext.Provider value={[
            auth, saveToken
        ]}>
            {children}
        </MyAuthContext.Provider>
    )
}

export {AuthContext, MyAuthContext};
