

export const ROUTE_CONSTANTS = {
    API_URL: "https://localhost:7082/api",  
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("mooch_user"))
} 


export const EMAIL_REGISTER = "emailRegister"

export const GOOGLE_SIGN_IN = "googleSignIn"

export const EMAIL_SIGN_IN = "emailSignIn"