import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userRole, setUserRole] = useState();
  console.log(isUserLogged, userRole);

  useEffect(() => {
    Axios.defaults.withCredentials = true;
    const verifyLogin = async () => {
      try {
        const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/verifylogin`);
        if (res.data !== "User not found") {
          setIsUserLogged(true);
          setUserRole(res.data.role);
        } else {
          setIsUserLogged(false);
          setUserRole();
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLogged, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);