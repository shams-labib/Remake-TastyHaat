import { useEffect } from "react";
import {
  FaUtensils,
  FaLeaf,
  FaClock,
  FaAward,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const stats = [
    { icon: <FaAward />, label: "Best Delivery", value: "12" },
    { icon: <FaUsers />, label: "Customers", value: "100k+" },
    { icon: <FaGlobe />, label: "Cities", value: "50+" },
  ];

  const features = [
    {
      icon: <FaLeaf />,
      title: "Fresh & Organic",
      desc: "Directly from local farms to your table.",
      delay: "100",
    },
    {
      icon: <FaClock />,
      title: "30-Min Promise",
      desc: "Smart-dispatch for steaming hot food.",
      delay: "200",
    },
    {
      icon: <FaUtensils />,
      title: "Master Chefs",
      desc: "Curated by Michelin-star consultants.",
      delay: "300",
    },
  ];

  return (
    // overflow-x-hidden must jate animation layout na bhange
    <section className="min-h-screen flex items-center bg-white dark:bg-gray-800 py-12 md:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* --- LEFT SIDE: VISUAL STORYTELLING --- */}
          <div className="relative w-full lg:w-1/2" data-aos="fade-up">
            {/* Main Image Container */}
            <div className="relative p-2 md:p-4 border-2 border-orange-100 dark:border-gray-800 rounded-[2rem] md:rounded-[3rem]">
              <div className="relative rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <img
                  src="https://i.ibb.co.com/G338SXnv/premium-photo-1673108852141-e8c3c22a4a22.avif"
                  alt="TastyHaat Experience"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Experience Floating Badge - Desktop Only */}
            <div
              className="absolute top-10 -left-6 bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-2xl border border-orange-50 dark:border-gray-700 hidden xl:flex flex-col items-center gap-2"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-full">
                <FaUtensils className="text-orange-600 text-xl" />
              </div>
              <span className="text-2xl font-black dark:text-white">100%</span>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                Hygienic
              </p>
            </div>

            {/* Stats Counter Overlay - Responsive Grid */}
            <div className="relative -mt-10 mx-4 md:absolute md:-bottom-10 md:right-10 md:left-10 grid grid-cols-3 gap-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-slate-50 dark:border-gray-700 z-10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center border-r last:border-0 border-gray-100 dark:border-gray-700"
                >
                  <div className="text-orange-600 mb-1 flex justify-center text-lg md:text-xl">
                    {stat.icon}
                  </div>
                  <div className="text-sm md:text-lg font-bold dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-[8px] md:text-[10px] uppercase text-gray-400 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div
            className="w-full lg:w-1/2 flex flex-col gap-8 mt-16 lg:mt-0"
            data-aos="fade-up"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-500/10 rounded-full">
                <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px]">
                  The TastyHaat Story
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                Serving Excellence <br className="hidden md:block" />
                <span className="text-orange-600 italic">Since 2014</span>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed">
                We make quality food accessible to everyone. What started as a
                small kitchen has grown into a community of over 5,000
                restaurants.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center text-green-600">
                  <FaLeaf />
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white">
                    Eco-Packaging
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-600">
                  <FaUsers />
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white">
                    Community First
                  </h4>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                >
                  <div className="text-orange-600 text-xl mb-2">
                    {item.icon}
                  </div>
                  <h3 className="font-bold dark:text-white text-[13px] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                Explore Our Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
