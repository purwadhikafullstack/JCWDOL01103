import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Container, Image } from "@chakra-ui/react";
import banner1 from "../../assets/img/banner1.jpg";
import banner2 from "../../assets/img/banner2.jpg";
import banner3 from "../../assets/img/banner3.jpg";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

const Banner = () => {
  return (
    <Container
      as="section"
      maxW={{ xl: "7xl", "2xl": "8xl" }}
      mt={{ base: 10, xl: "45px" }}
    >
      <Box
        mx={{ base: 1, xl: 0 }}
        maxW="8xl"
        h="100%"
        mt={7}
        borderRadius={"xl"}
      >
        <Swiper
          modules={[A11y, Autoplay]}
          loop={true}
          spaceBetween={50}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
        >
          <SwiperSlide>
            <Image
              src={banner1}
              alt="Soundsense Logo"
              h="100%"
              objectFit="cover"
              borderRadius={"xl"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={banner2}
              alt="Soundsense Logo"
              h="100%"
              objectFit="cover"
              borderRadius={"xl"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={banner3}
              alt="Soundsense Logo"
              h="100%"
              objectFit="cover"
              borderRadius={"xl"}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
};

export default Banner;
