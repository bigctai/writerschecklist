import React from "react";
import { useParams } from "react-router-dom";
import Profile from "../Profile";
import useToken from "../useToken";
import Title from "../Title/Title";

function UserProfile() {
  return (
    <div>
      <Title titleName="Your Profile"></Title>
      <Profile />
    </div>
  );
}

export default UserProfile;
