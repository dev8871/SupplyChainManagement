import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api/api";

function ProtectedRoute({children}) {
  const [isAuthorised, setIsAuthorised] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorised(false))
    // auth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if(res.status === 200) {
        localStorage.setItem("access", res.data.access)
        setIsAuthorised(true);
      }
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      console.log(error);
      setIsAuthorised(false);
    }
  }

  const auth = async () => {
    const token = localStorage.getItem("access");
    debugger
    if(!token) {
      setIsAuthorised(false)
      return;
    }

    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000
    if(tokenExpiration <now) {
      await refreshToken();
    } else {
      setIsAuthorised(true);
    }
  }

//   const token = localStorage.getItem("access");

//  if(!token){
//    return <Navigate to="/login" />;
//  }

//  return children;

  if(isAuthorised === null) {
    return <div> Loading..</div>
  }

  return isAuthorised? children: <Navigate to="/login" />
}

export default ProtectedRoute