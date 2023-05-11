export const ROUTE_CONSTANTS = {
    API_URL: "https://localhost:7082/api",  
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("mooch_user"))
} 


export const EMAIL_REGISTER = "emailRegister"

export const GOOGLE_SIGN_IN = "googleSignIn"

export const EMAIL_SIGN_IN = "emailSignIn"


// COLORS
export const DARK_GRAY = '#18181b'

export const BLACK = '#09090b'

export const WHITE = '#f3f4f6'

export const DIRTY_WHITE = '#e5e7eb'

export const SLATE = '#2A2B37'

export const LIGHT_GRAY = '#6b7280'