import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Buy iphone 14 Pro"
        subtitle="Experience the power of latest iphone 14 with our most pro camera ever."
        link="/product/6734183190bd039ead0e2081"
        image={iphone}
      />

      <FeaturedProducts />

      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colors-matched Magic accessories to your bag after configure your mac mini."
        link="/product/6734183290bd039ead0e2089"
        image={mac}
      />

      {/* Featured Products */}

      {/* Hero Section */}
    </div>
  );
};

export default HomePage;
