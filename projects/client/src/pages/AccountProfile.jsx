import {
  Flex,
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
    <Tabs variant="soft-rounded" w="100%" px="5" pt="2">
      <TabList>
        <Tab _selected={{ color: "white", bg: "black" }}>Profile</Tab>
        <Tab _selected={{ color: "white", bg: "black" }}>Address</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Profile />
        </TabPanel>
        <TabPanel w="100%">
          <UserAddress />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountProfile;
