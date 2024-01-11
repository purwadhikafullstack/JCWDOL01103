import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthorized, logoutAuthorized } from "../store/slicer/authSlice";
import { useNavigate } from "react-router-dom";
// import { onClickGoogleSignOut } from "../utils/googleSignIn";
import { jwtDecode } from "jwt-decode";
import { SearchInput } from "../components/molecules/SearchInput";
import { SelectWarehouse } from "../components/organisms/SelectWarehouse";
import InputAddress from "../components/organisms/InputAddress";

function Test() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.login.isAuthorized);
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  return (
    <>
      <h1>Test Page</h1>
      <InputAddress/>
    </>
  );
}

export default Test;
