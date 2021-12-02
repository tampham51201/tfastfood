import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return <button>Logout</button>;
};

export default Profile;
