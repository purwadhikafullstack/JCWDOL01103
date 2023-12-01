import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Box, IconButton, Text, Flex } from "@chakra-ui/react";
import PaginationNumber from "../atoms/PaginationNumber";
import propTypes from "prop-types";

function Pagination({ currentPage = 1, totalPage = 1, onChangePage}) {
  const [activeNum, setActiveNum] = useState(currentPage);
  const numGap = 2;
  useEffect(()=>{
    function pageHandler(){
      setActiveNum(currentPage)
    }
    pageHandler()
  },[currentPage])
  function handlerChangePage(toPageNumber) {
    setActiveNum(toPageNumber);
    onChangePage(toPageNumber);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="row"
      gap="2"
      maxW={{base:"100%",sm:"fit-content"}}
      w='full'
      alignSelf='center'
    >
      <Flex columnGap="2">
        {
          <IconButton
            isDisabled={activeNum === 1}
            color="forthColor"
            icon={<FaChevronLeft />}
            onClick={() => handlerChangePage(activeNum - 1)}
            size="18px"
          />
        }
        <PaginationNumber
          active={activeNum === 1 ? 1 : 0}
          onClick={() => handlerChangePage(1)}
        >
          1
        </PaginationNumber>
        {activeNum > 3 && totalPage > 5 && (
          <PaginationNumber mx="1">...</PaginationNumber>
        )}

        {totalPage > 5
          ? [...Array(5)].map((dt, idx) => {
              const NumberOfPage = (
                <PaginationNumber
                  key={idx}
                  active={activeNum === activeNum - numGap + idx ? 1 : 0}
                  onClick={() => handlerChangePage(1)}
                >
                  {activeNum - numGap + idx}
                </PaginationNumber>
              );

              if (
                idx < 3 &&
                activeNum - numGap + idx > 1 &&
                activeNum - numGap + idx < totalPage
              ) {
                return NumberOfPage;
              } else if (idx >= 3 && activeNum - numGap + idx < totalPage) {
                return NumberOfPage;
              }
            })
          : [...Array(3)].map((dt, idx) => {
              if (idx + 2 < totalPage) {
                return (
                  <PaginationNumber
                    key={idx}
                    active={activeNum - 2 === idx ? 1 : 0}
                  >
                    {idx + 2}
                  </PaginationNumber>
                );
              }
            })}
        {activeNum < totalPage - 3 && totalPage > 5 && (
          <PaginationNumber>...</PaginationNumber>
        )}
        {
          totalPage > 1 &&
          <PaginationNumber active={activeNum === totalPage ? 1 : 0}>
            {totalPage}
          </PaginationNumber>
        }
        {
          <IconButton
            isDisabled={activeNum === totalPage}
            color="forthColor"
            icon={<FaChevronRight />}
            onClick={() => handlerChangePage(activeNum + 1)}
            size="18px"
          />
        }
      </Flex>
    </Box>
  );
}
Pagination.propTypes = {
  onChangePage: propTypes.func
};


export default Pagination;
