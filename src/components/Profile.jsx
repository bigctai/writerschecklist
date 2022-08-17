import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import useToken from "./useToken";
import { Button } from "./Button/Button";

function Profile() {
  const { token, setToken } = useToken();
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    retrieveUser();
  }, []);
  const clearStorage = () => {
    localStorage.clear();
  };

  const retrieveUser = () => {
    UserService.get(token).then((response) => {
      setUserDetails(response.data);
    });
  };
  return (
    <div>
      <h1>{userDetails.email}</h1>
      <Button children="Logout" destination="/" onClick={clearStorage}></Button>
    </div>
  );
}

export default Profile;
