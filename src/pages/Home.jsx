import React from 'react';
import Banner from '../components/Banner';
import FlashSales from '../components/FlashSales';
import CategoriesBrowser from '../components/CategoriesBrowser';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingProducts from '../components/TrendingProducts';
import CustomerReviews from '../components/CustomerReviews';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Banner */}
      <Banner />

      {/* Spacer or gentle separator could go here if needed, but components mostly have their own padding */}
      
      {/* 2. Categories */}
      <CategoriesBrowser />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Trending Products */}
      <TrendingProducts />

      {/* 5. Discount Section (Flash Sales) */}
      <FlashSales />

      {/* 6. Customer Reviews */}
      <CustomerReviews />

      {/* 7. Newsletter */}
      <Newsletter />
    </div>
  );
}
