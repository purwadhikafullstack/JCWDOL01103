import Navbar from "../organisms/Navbar";
import Banner from "../molecules/Banner";
import WhyUs from "../molecules/WhyUs";
import CategoryList from "../molecules/CategoryList";
// import ProductCard from "../molecules/ProductCard";
import Brand from "../molecules/Brand";
import Footer from "../organisms/Footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyUs />
      <CategoryList />
      {/* <ProductCard /> */}
      <Brand />
      <Footer />
    </>
  );
};

export default Homepage;
