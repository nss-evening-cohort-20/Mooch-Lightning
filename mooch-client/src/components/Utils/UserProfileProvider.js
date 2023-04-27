import { createContext, useState } from "react"

export const UserProfileProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState()
    
    const UserContext = createContext();


    return (
        <UserContext.Provider value={{isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn, userProfile: {}}} >
            {children}
        </UserContext.Provider>
    )

}