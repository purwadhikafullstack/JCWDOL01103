export const toastConfig = (status, title, desc) => {
  return {
    title: title,
    description: desc,
    status: status,
    duration: 3000,
    isClosable: true,
    position: "top-right",
  };
};
