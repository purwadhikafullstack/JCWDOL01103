import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthorized, logoutAuthorized } from "../store/slicer/authSlice";
import { useNavigate } from "react-router-dom";
// import { onClickGoogleSignOut } from "../utils/googleSignIn";
import { jwtDecode } from "jwt-decode";
import { SearchInput } from "../components/molecules/SearchInput";
import { ModalSelectWarehouse } from "../components/organisms/ModalSelectWarehouse";

function Test() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.login.isAuthorized);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openSelectWarehouse, setOpenSelectWarehouse] = useState(false);
  // const token = useSelector((state)=> state.login.user)
  // const user = jwtDecode(token)
  useEffect(() => {
    (() => {
      dispatch(checkAuthorized());
      onOpen();
      if (!authState) {
        // return navigate("/login");
      }
    })();
  }, [authState]);

  const onClickLogout = () => {
    // onClickGoogleSignOut(user.email)
    dispatch(logoutAuthorized());
    navigate("/login");
  };

  return (
    <>
      <h1>Test Page</h1>
      {/* <Button onClick={onClickLogout}>Logout</Button> */}
      <Button colorScheme="blue" onClick={() => setOpenSelectWarehouse(true)}>
        Edit Warehouse
      </Button>
      <ModalSelectWarehouse
        isOpen={openSelectWarehouse}
        onClose={() => setOpenSelectWarehouse(false)}
        onClickRow={(val) => console.log(val)}
      />
    </>
  );
}

export default Test;
