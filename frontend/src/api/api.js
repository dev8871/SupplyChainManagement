import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const loginURL = `${baseURL}/api/login/`;
const registerURL = `${baseURL}/api/register/`;
const logoutURL = `${baseURL}/api/logout/`;
const refreshURL = `${baseURL}/api/token/refresh/`;
const isAuthenticatedURL = `${baseURL}/api/authenticated/`;


export const login = async (username, password) => {
    const response = await axios.post(loginURL, 
        {username: username, password: password}, 
        { withCredentials: true}
    )

    return response.data.success;
}

export const refresh_token = async () => {
    const response = await axios.post(refreshURL,
        {},
        { withCredentials: true}
    )
    return response.data.refreshed;
}

const call_refresh = async (error, func) => {
    if(error.response && error.response.status === 401){
        const refreshedToken = await refresh_token();

        if(refreshedToken){
            const retryResponse = await func();
            return retryResponse.data;
        }
    }
    return false;
}

export const is_authenticated = async () => {
    try{
        await axios.post(isAuthenticatedURL, {}, { withCredentials: true });
        return true;
    } catch(error){
        // const refreshed = await call_refresh(error, is_authenticated);
        return false;
    }
    
}

export const logout = async () => {
    try{
        await axios.post(logoutURL, {}, { withCredentials: true });
        return true;
    } catch(error){
        // const refreshed = await call_refresh(error, is_authenticated);
        return false;
    }
    
}

export const register = async (username, password, email) => {
    try {
        const response = await axios.post(
            registerURL,
            { username, email, password },
            { withCredentials: true }
        );

        alert("Registration successful! Please login.");
        return response.data;

    } catch (error) {
        const errorData =  error.response.data;
        const message = Object.values(errorData)
            .map(arr => arr[0])
            .join("\n");
        alert(message);
        console.log("Error:", error.response.data);   // 🔴 important
        throw error;
    }
}

export default login;
