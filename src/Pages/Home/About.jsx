import { useEffect } from "react";
import { FaUtensils, FaLeaf, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duration ektu komanu hoyeche smoothness-er jonno
      once: true,
      disable: "mobile", // Proyojon hole sudhu mobile e AOS off rakha jay, tobe niche ami responsive fix kore diyechi
    });
  }, []);

  return (
    // section-e overflow-hidden deya hoyeche jate animation-er somoy scrollbar na ashe
    <section className="bg-base-100 dark:bg-gray-800 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Image Container - Responsive Height Fix */}
          <div
            className="relative w-full h-64 sm:h-80 md:h-[450px] lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl"
            data-aos="fade-right"
          >
            <img
              src="https://i.ibb.co.com/G338SXnv/premium-photo-1673108852141-e8c3c22a4a22.avif"
              alt="About TastyHaat"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Overlay Icon - Mobile-e size ektu komanu hoyeche */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-2xl shadow-lg">
              <FaUtensils className="text-2xl md:text-3xl text-primary animate-bounce" />
            </div>
          </div>

          {/* Text Content */}
          <div
            className="w-full lg:w-1/2 flex flex-col gap-5 md:gap-6"
            data-aos="fade-left"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold dark:text-white leading-tight">
              About <span className="text-primary">TastyHaat</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              At <span className="font-semibold text-primary">TastyHaat</span>,
              we believe that great food brings people together. Our mission is
              to deliver fresh, delicious meals from your favorite restaurants
              right to your doorstep.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              With a passion for quality, speed, and customer satisfaction, we
              ensure every order is prepared with care. From gourmet meals to
              quick snacks, we've got your cravings covered!
            </p>

            {/* Stats/Features Grid - Optimized for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-4">
              {/* Feature 1 */}
              <div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <FaLeaf className="text-green-500 text-3xl mx-auto mb-3" />
                <h3 className="font-bold dark:text-white text-sm md:text-base">
                  Fresh Ingredients
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-tight">
                  100% Organic and fresh picked daily.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <FaClock className="text-blue-500 text-3xl mx-auto mb-3" />
                <h3 className="font-bold dark:text-white text-sm md:text-base">
                  Fast Delivery
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-tight">
                  Delivered within 30 minutes or free.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <FaUtensils className="text-orange-500 text-3xl mx-auto mb-3" />
                <h3 className="font-bold dark:text-white text-sm md:text-base">
                  Delicious Meals
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-tight">
                  Crafted by world-class expert chefs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
