import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Star, Settings, Users } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Shams all Labib",
    role: "Project Lead",
    img: "https://i.ibb.co.com/Mytr8cvn/486358168-1662894851009150-258168444497357135-n.jpg",
    bio: "Shams is a full-stack MERN developer coordinating all sections, ensuring code consistency, and optimizing workflows.",
    skills: ["React.js", "Node.js", "MongoDB", "Express"],
    github: "#",
    linkedin: "#",
    college: "Rangpur Ideal Institute Of Technology",
  },
  {
    name: "Gantabya Kumar Bayda",
    role: "Main Member",
    img: "https://i.ibb.co.com/Dn8Qwks/108589076.jpg",
    bio: "Front-end expert creating modern, responsive Hero sections with interactive elements using React and TailwindCSS.",
    skills: ["React.js", "Express.js", "Node.js", "UI/UX"],
    github: "#",
    linkedin: "#",
    college: "Govt. BL College, Khulna",
  },
  {
    name: "Shafin Ahmed",
    role: "Main Member",
    img: "https://i.ibb.co/HpR24GbD/199338290.jpg",
    bio: "Creates dynamic dashboards using React and chart libraries. Stripe Integration",
    skills: ["React.js", "Recharts", "TailwindCSS", "Framer Motion"],
    github: "#",
    linkedin: "#",
    college: "Daffodil International University",
  },
  {
    name: "Aminur Rahman",
    role: "Member",
    img: "https://i.ibb.co.com/5mvNPjX/188297559.jpg",
    bio: "Expert in footer design, accessibility, and responsive layouts for a consistent user experience.",
    skills: ["React", "TailwindCSS", "UI/UX", "Swiper"],
    github: "#",
    linkedin: "#",
    college: "Govt. Satkhira College",
  },
  {
    name: "Aftab",
    role: "Member",
    img: "https://i.ibb.co/6D9mY7g/man1.jpg",
    bio: "Develops seller dashboards with CRUD operations and real-time updates, specialized in MERN stack.",
    skills: ["React", "Node.js", "Express", "TailwindCSS"],
    github: "#",
    linkedin: "#",
    college: "Barishal Govt. College",
  },
  {
    name: "Taslima Akter",
    role: "Member",
    img: "https://i.ibb.co/9myP8CYW/208586980.jpg",
    bio: "Designs landing pages that convert with clean layouts, responsive design, and subtle animations.",
    skills: ["React", "Swiper", "Framer Motion", "TailwindCSS"],
    github: "#",
    linkedin: "#",
    college: "Dinajpur Govt. College",
  },
];

const floatAnim = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 2.5,
    repeat: Infinity,
  },
};

const TeamSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    // Added bg-gray-50 for light mode
    <div className="w-full  dark:bg-gray-800 py-20 px-4 md:px-8 relative transition-colors duration-300">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="relative text-center mb-16">
          <motion.div
            {...floatAnim}
            className="absolute left-1/2 -translate-x-1/2 -top-10 text-indigo-500"
          >
            <Users size={34} />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white relative z-10">
            Meet Our{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Team</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our talented developers and designers working together to build the
            future.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide key={i} className="py-4">
              <motion.div
                data-aos="fade-up"
                whileHover={{ y: -8 }}
                // Improved Card styling for Light/Dark
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all"
              >
                {/* Image Wrapper */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>

                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider mb-3">
                  {member.role}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-5">
                  {member.college}
                </p>

                {/* Skills - Better contrast for Light Mode */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-indigo-100 dark:border-indigo-800"
                    >
                      <Code size={12} /> {skill}
                    </span>
                  ))}
                </div>

                {/* Social icons */}
                <div className="flex gap-5">
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    href={member.github}
                  >
                    <FaGithub size={22} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    href={member.linkedin}
                  >
                    <FaLinkedin size={22} />
                  </motion.a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination styling */}
        <div className="custom-pagination flex justify-center mt-4"></div>
      </div>

      {/* Custom Pagination CSS - Add this to your Global CSS if possible */}
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          background: #4f46e5;
          opacity: 0.3;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TeamSection;
