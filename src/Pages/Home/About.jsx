import { useEffect } from "react";
import { FaUtensils, FaLeaf, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="container mx-auto px-4 bg-base-100 dark:bg-gray-800 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:px-4">
        <div
          className="relative w-full h-120 lg:w-1/2 rounded-3xl overflow-hidden shadow-xl"
          data-aos="fade-right"
        >
          <img
            src="https://i.ibb.co.com/G338SXnv/premium-photo-1673108852141-e8c3c22a4a22.avif"
            alt="About us"
            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
          />

          <FaUtensils className="absolute top-5 left-5 text-4xl text-primary animate-bounce" />
        </div>

        <div
          className="w-full lg:w-1/2 flex flex-col gap-6"
          data-aos="fade-left"
        >
          <h2 className="text-4xl font-bold dark:text-white">
            About <span className="text-primary">TastyHaat</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            At <span className="font-semibold text-primary">TastyHaat</span>, we
            believe that great food brings people together. Our mission is to
            deliver fresh, delicious meals from your favorite restaurants right
            to your doorstep.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-md">
            With a passion for quality, speed, and customer satisfaction, we
            ensure every order is prepared with care and delivered hot and
            fresh. From gourmet meals to quick snacks, we've got your cravings
            covered!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-5 text-center shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaLeaf className="text-primary text-3xl mx-auto mb-3 animate-bounce" />
              <h3 className="font-semibold dark:text-white">
                Fresh Ingredients
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Only the freshest, organic ingredients in every meal.
              </p>
            </div>
            <div
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-5 text-center shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaClock className="text-primary text-3xl mx-auto mb-3 animate-bounce" />
              <h3 className="font-semibold dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Lightning-fast delivery, keeping your food hot and fresh.
              </p>
            </div>
            <div
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-5 text-center shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaUtensils className="text-primary text-3xl mx-auto mb-3 animate-bounce" />
              <h3 className="font-semibold dark:text-white">Delicious Meals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Expert chefs crafting mouth-watering dishes every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
