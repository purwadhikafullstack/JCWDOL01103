import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthorized, logoutAuthorized } from "../store/slicer/authSlice";
import { useNavigate } from "react-router-dom";
// import { onClickGoogleSignOut } from "../utils/googleSignIn";
import { jwtDecode } from "jwt-decode";

function Test() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state)=> state.login.isAuthorized)
  // const token = useSelector((state)=> state.login.user)
  // const user = jwtDecode(token)
  useEffect(() => {
    (() => {
      dispatch(checkAuthorized());
      if (!authState) {
        return navigate("/login");
      }
    }
    )()
  }, [authState]);

  const onClickLogout = () => {
    // onClickGoogleSignOut(user.email)
    dispatch(logoutAuthorized());
    navigate("/login")
  };
  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={onClickLogout}>Logout</Button>
    </>
  );
}

export default Test;
