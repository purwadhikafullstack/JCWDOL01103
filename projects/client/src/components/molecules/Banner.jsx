import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Container, Image } from "@chakra-ui/react";
import soundsenseLogo from "../../assets/img/soundsense-dark.png";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

const Banner = () => {
  return (
    <Container as="section" maxW="8xl">
      <Box
        mx={{ base: 1, xl: 0 }}
        maxW="8xl"
        h="100%"
        mt={7}
        borderRadius={"xl"}
        bgColor={"red"}
      >
        <Swiper
          modules={[A11y, Autoplay]}
          loop={true}
          spaceBetween={50}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <Image
              src={soundsenseLogo}
              alt="Soundsense Logo"
              h="100%"
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
};

export default Banner;
