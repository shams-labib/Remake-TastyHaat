import { useEffect } from "react";
import {
  FaUtensils,
  FaLeaf,
  FaClock,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-back",
    });
  }, []);

  const stats = [
    { icon: <FaAward />, label: "Best Delivery 2024", value: "12" },
    { icon: <FaUsers />, label: "Active Customers", value: "100k+" },
    { icon: <FaGlobe />, label: "Cities Covered", value: "50+" },
  ];

  const features = [
    {
      icon: <FaLeaf />,
      title: "Fresh & Organic",
      desc: "We partner directly with local farms to ensure every vegetable is picked at peak ripeness.",
      delay: "100",
    },
    {
      icon: <FaClock />,
      title: "30-Min Promise",
      desc: "Our smart-dispatch technology ensures your food is delivered while it's still steaming hot.",
      delay: "200",
    },
    {
      icon: <FaUtensils />,
      title: "Master Chefs",
      desc: "Our menu is curated by Michelin-star consultants who prioritize flavor and nutrition.",
      delay: "300",
    },
  ];

  return (
    <section className="min-h-screen flex items-center bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEFT SIDE: VISUAL STORYTELLING --- */}
          <div className="relative w-full lg:w-1/2" data-aos="fade-right">
            {/* Main Image with Decorative Frame */}
            <div className="relative p-4 border-2 border-orange-100 dark:border-gray-700 rounded-[3rem]">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <img
                  src="https://i.ibb.co.com/G338SXnv/premium-photo-1673108852141-e8c3c22a4a22.avif"
                  alt="TastyHaat Gourmet Experience"
                  /* Changed h-[550px] to responsive heights */
                  className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div
              className="absolute top-10 -left-6 bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-2xl border border-orange-50 dark:border-gray-600 hidden xl:block"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-full">
                  <FaUtensils className="text-orange-600 text-2xl" />
                </div>
                <span className="text-3xl font-black text-slate-800 dark:text-white">
                  100%
                </span>
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                  Hygienic Food
                </p>
              </div>
            </div>

            {/* Simple Stat Counter Overlay */}
            <div className="absolute -bottom-10 right-10 left-10 grid grid-cols-3 gap-2 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-700">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-orange-600 mb-1 flex justify-center text-xl">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT & VALUES --- */}
          <div
            className="w-full lg:w-1/2 flex flex-col gap-10 mt-12 lg:mt-0"
            data-aos="fade-left"
          >
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-500/10 rounded-full">
                <span className="text-orange-600 font-bold uppercase tracking-widest text-xs">
                  The TastyHaat Story
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
                Serving Excellence <br />
                <span className="text-orange-600 italic">Since 2014</span>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
                What started as a small kitchen in the heart of the city has
                grown into a community of over 5,000 restaurants. At{" "}
                <span className="font-bold text-slate-900 dark:text-white underline decoration-orange-500/30">
                  TastyHaat
                </span>
                , our goal is simple: to make quality food accessible to
                everyone, everywhere.
              </p>
            </div>

            {/* Core Values / Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-2xl flex items-center justify-center text-green-600">
                  <FaLeaf className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Eco-Packaging</h4>
                  <p className="text-sm text-gray-500">
                    We use 100% biodegradable materials for all our deliveries.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Community First</h4>
                  <p className="text-sm text-gray-500">
                    Supporting local chefs and small-scale restaurant owners.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Feature Cards Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group hover:bg-orange-50 dark:hover:bg-gray-700/50 p-4 rounded-2xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                >
                  <div className="text-orange-600 text-2xl mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold dark:text-white text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="pt-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-orange-600/20 transition-all hover:-translate-y-1 active:scale-95">
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
