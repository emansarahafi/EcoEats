import { jwtDecode } from "jwt-decode";

export function getUserRole() {
    const token = localStorage.getItem("token"); 
    if (token) {
    try {
            const decodedToken = jwtDecode(token); 
            console.log(decodedToken)
            return decodedToken.role;
        } catch (error) {
            console.error("Token decoding error:", error);
        } 
    }
    return null;
}