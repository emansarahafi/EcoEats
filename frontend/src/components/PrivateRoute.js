import React from "react";
import { Navigate } from "react-router-dom"; 
import { getUserRole} from "./UserRole";
function PrivateRoute({ children, allowedRoles }) { 
    const role = getUserRole();
    if (role) {
        return (
            <div> { allowedRoles.includes(role) ? children  :<Navigate to="/" /> } </div>
        )
    } else {
        // No valid token or role, redirect to the login page
        return <Navigate to="/signIn" />; // Adjust the redirect route as needed 
    }
}
export default PrivateRoute;