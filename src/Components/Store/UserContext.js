import React, { useReducer } from 'react'

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('USER_DATA'))?.uid ? true : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem( 'USER_DATA', JSON.stringify(action.payload));
            return {
                isLoggedIn: true
            }
        case 'LOG_OUT':
            localStorage.clear();
            return{
                isLoggedIn: false
            }
        default:
            return {
                isLoggedIn: state.isLoggedIn
            }
    }
}

export const UserInfoContext = React.createContext();

export default function UserContext({ children }) {
    const [login, setLogin] = useReducer(reducer, initialState);
    return (
        <UserInfoContext.Provider value={[login, setLogin]}>
            {children}
        </UserInfoContext.Provider>
    )
}
