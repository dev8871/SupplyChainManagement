import { Button } from "@chakra-ui/react";
import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    const handleLogout=() => {
        logout().then(success => {
            if(success){
                navigate("/login");
                alert("Logout successful");
            } else {
                alert("Logout failed");
            }
        });
    }
 return(

  <div>

   <h2>Dashboard</h2>

   <p>Only logged in users can see this page</p>
    <Button onClick={handleLogout}>Logout</Button>
  </div>

 )

}

export default Dashboard;