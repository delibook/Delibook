import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: { email: null, token: null },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ email, token }) => {
        setUser({ email, token });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
