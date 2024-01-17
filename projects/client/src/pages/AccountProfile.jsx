import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Profile from "./Profile";
import UserAddress from "../components/organisms/UserAddress";

const AccountProfile = () => {
  return (
    <Tabs isLazy variant="soft-rounded" w="100%" pt="2" pos='relative'>
      <TabList position="sticky" top={{base:'100px',lg:"120px", xl:"128px"}} pb='1' bg="white" zIndex="4">
        <Tab _selected={{ color: "white", bg: "black" }}>Profile</Tab>
        <Tab _selected={{ color: "white", bg: "black" }}>Address</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Profile />
        </TabPanel>
        <TabPanel w="100%" overflow="scroll" position='relative'>
          <UserAddress />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountProfile;
