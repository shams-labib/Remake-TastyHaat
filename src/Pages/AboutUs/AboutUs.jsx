import { useEffect } from "react";
import { FaUtensils, FaLeaf, FaClock, FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const features = [
    {
      icon: <FaLeaf />,
      title: "Fresh Ingredients",
      desc: "Only the freshest, organic ingredients in every meal.",
      delay: "100",
    },
    {
      icon: <FaClock />,
      title: "Fast Delivery",
      desc: "Lightning-fast delivery, keeping your food hot and fresh.",
      delay: "200",
    },
    {
      icon: <FaUtensils />,
      title: "Delicious Meals",
      desc: "Expert chefs crafting mouth-watering dishes every day.",
      delay: "300",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* IMAGE SIDE */}
          <div className="relative w-full lg:w-1/2" data-aos="fade-right">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
              <img
                src="https://i.ibb.co.com/G338SXnv/premium-photo-1673108852141-e8c3c22a4a22.avif"
                alt="Our Gourmet Kitchen"
                className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <div
              className="absolute -bottom-6 -right-6 bg-orange-600 p-6 rounded-2xl shadow-xl text-white hidden md:block"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">10+</span>
                <p className="text-sm leading-tight opacity-90 font-medium">
                  Years of <br /> Culinary Excellence
                </p>
              </div>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div
            className="w-full lg:w-1/2 flex flex-col gap-8"
            data-aos="fade-left"
          >
            <div className="space-y-4">
              <h4 className="text-orange-600 font-bold tracking-widest uppercase text-sm">
                About Our Store
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Where Taste Meets{" "}
                <span className="text-orange-600 italic">Tradition</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                At <span className="font-bold text-orange-600">TastyHaat</span>,
                we don’t just deliver food; we deliver experiences. We believe
                that a great meal has the power to turn any day into a
                celebration.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                From hand-picked organic produce to the final garnish, our
                process is fueled by a passion for quality and speed. We partner
                with local favorites to bring the best of the city straight to
                your table.
              </p>
            </div>

            {/* Checkmark List for extra trust */}
            <ul className="grid grid-cols-2 gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-600" /> Professional Chefs
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-orange-600" /> Eco-friendly
                Packaging
              </li>
            </ul>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center border border-transparent hover:border-orange-600/30 transition-all duration-300 hover:shadow-lg group"
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                >
                  <div className="text-orange-600 text-3xl mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold dark:text-white text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[12px] leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
