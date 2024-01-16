import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { checkShippingCost } from "../../api/shipping";
import { BiChevronDown } from "react-icons/bi";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { setShippingCheckout } from "../../store/slicer/checkoutSlice";
import { toastConfig } from "../../utils/toastConfig";

const InputShipping = ({ isInvalid }) => {
  const selectedShipping = useSelector((state) => state.formCheckout.shipping);
  const selectedAddress = useSelector((state)=> state.formCheckout.address);
  const [serviceList, setServiceList] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const getShipping = async (data) => {
    try {
      const response = await checkShippingCost(data);
      setServiceList(response.data.rajaongkir.results[0]);
    } catch (error) {
      // toast(toastConfig("error", "Failed", error.message))
    }
  };
  useEffect(()=>{
    const data = {
      origin: "1",
      destination: selectedAddress?.city_id,
      weight: 1,
    };
    selectedShippingHandler(null)
    getShipping(data);
  },[selectedAddress])
  const selectedShippingHandler = (val) => {
    dispatch(setShippingCheckout(val));
  };
  return (
    <Flex w="full" my="5" flexDir="column">
      <Text>Shipping :</Text>
      <Menu>
        <MenuButton
          h="fit-content"
          p="5"
          bg="white"
          border={isInvalid ? "2px" : "1px"}
          borderColor="inherit"
          as={Button}
          rightIcon={<BiChevronDown />}
        >
          {
            selectedShipping !== null ?
            <Flex h="fit-content" flexDir="row" alignItems="center">
              <Image
                boxSize="3rem"
                objectFit="contain"
                src={require("../../assets/img/Logo_JNE.png")}
                alt="Fluffybuns the destroyer"
                mr="12px"
              />
              <Text mr="5">{selectedShipping?.service}</Text>
              <Text>{formatCurrency(selectedShipping?.cost[0].value)}</Text>
            </Flex>
            : <Text fontWeight="normal" textAlign="start">Select Shipping</Text>
          }
        </MenuButton>
        <MenuList>
          {serviceList?.costs?.map((dt, idx) => {
            return (
              <MenuItem
                key={idx}
                minH="48px"
                w="100%"
                onClick={() => {
                  selectedShippingHandler(dt);
                }}
              >
                <Image
                  boxSize="3rem"
                  objectFit="contain"
                  src={require("../../assets/img/Logo_JNE.png")}
                  alt="Fluffybuns the destroyer"
                  mr="12px"
                />
                <Text mr="2">{dt?.service}</Text>
                <Text w="full" maxW="200px">
                  {formatCurrency(dt?.cost[0].value)}
                </Text>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default InputShipping;
