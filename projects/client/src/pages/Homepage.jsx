import Navbar from "../components/organisms/Navbar";
import Banner from "../components/molecules/Banner";
import WhyUs from "../components/molecules/WhyUs";
import CategoryList from "../components/molecules/CategoryList";
// import ProductCard from "../molecules/ProductCard";
import Brand from "../components/molecules/Brand";
import Footer from "../components/organisms/Footer";

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
