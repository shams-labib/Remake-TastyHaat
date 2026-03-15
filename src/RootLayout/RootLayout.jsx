import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import LoadingPage from "../Components/LoadingPage";

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // AOS Initialize
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    // ওয়েবসাইট লোড হওয়ার জন্য একটি নির্দিষ্ট সময় পর লোডারটি বন্ধ হবে
    // আপনি চাইলে এখানে আপনার ডাটা ফেচিং লজিকও রাখতে পারেন
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // ২ সেকেন্ড পর ওয়েবসাইট দেখাবে

    return () => clearTimeout(timer); // মেমোরি লিক রোধ করতে ক্লিয়ার টাইমার
  }, []);

  // যদি isLoading true থাকে, তবে শুধু লোডার দেখাবে
  if (isLoading) {
    return <LoadingPage />;
  }

  // লোডিং শেষ হলে মেইন লেআউট রেন্ডার হবে
  return (
    <div className="dark:bg-gray-800">
      <ScrollToTop />
      <Navbar />
      <section className="min-h-screen">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default RootLayout;
