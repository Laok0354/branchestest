import { useState, useEffect } from "react"; 

function checkUserLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState();
  
    useEffect(() => {
      fetch('http://localhost:3000/auth/token', {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(error => {
          setIsLoggedIn(false);
        });
    }, []);
  
    return isLoggedIn;
  }

export default checkUserLogin