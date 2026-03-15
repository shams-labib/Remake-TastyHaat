import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-[#FFF8F6] dark:bg-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between md:px-3 py-10">
          {/* Text Content */}
          <div className="space-y-6 max-w-xl md:ml-5" data-aos="fade-right">
            <h1 className="text-5xl font-bold leading-[1.2]">
              <span className="text-primary">Fast, Fresh</span>
              <br />
              <span className="text-primary">& Right</span>{" "}
              <span className="text-gray-900 dark:text-white">
                To Your Door
              </span>
            </h1>

            <p
              className="text-gray-600 dark:text-gray-300 text-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Order dishes from favorite restaurants near you.
            </p>

            <div
              className="flex w-full max-w-md items-center gap-2 border border-base-300 rounded-lg overflow-hidden shadow-md transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40 bg-base-100 dark:bg-gray-800"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 bg-transparent text-base-content placeholder:text-base-content/60 border-none outline-none focus:outline-none"
              />
              <button className=" btn bg-linear-to-r from-[#ff6000] to-[#fc3c2c] text-white border-none rounded-r-md transition-all duration-500 ease-in-out shadow-md hover:shadow-lg">
                Find Food
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="mt-10 md:mt-0"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <img
              src={"https://i.ibb.co.com/twt2tWcr/image.png"}
              alt="food app"
              className="w-125 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
