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
    img: "https://i.ibb.co.com/9myP8CYW/208586980.jpg",
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
    <div className="bg-gray-50 container mx-auto dark:bg-gray-800 py-20 px-4 md:px-8 relative">
      {/* Section Heading with animated icons */}
      <div className="relative text-center mb-14">
        <motion.div
          {...floatAnim}
          className="absolute left-1/2 -translate-x-1/2 -top-10 text-primary"
        >
          <Users size={34} />
        </motion.div>

        <motion.div
          {...floatAnim}
          className="absolute left-[30%] top-0 text-primary"
        >
          <Star size={26} />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute right-[30%] top-0 text-primary"
        >
          <Settings size={26} />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10">
          Meet Our <span className="text-primary">Team</span>
        </h2>
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
      >
        {teamMembers.map((member, i) => (
          <SwiperSlide key={i}>
            <motion.div
              data-aos="fade-up"
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-800/80 dark:to-gray-700/70 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transition-all"
            >
              {/* Image */}
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {member.name}
              </h3>

              <p className="text-primary font-semibold mb-2">{member.role}</p>

              <p className="text-gray-600 line-clamp-2 dark:text-gray-300 text-sm mb-3">
                {member.bio}
              </p>

              <p className="text-xs italic text-gray-500 dark:text-gray-400 mb-3">
                {member.college}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {member.skills.map((skill, idx) => (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    key={idx}
                    className="bg-primary/20 text-black dark:text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    <Code size={14} /> {skill}
                  </motion.span>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex gap-4 mt-2">
                {[
                  { icon: <FaGithub />, color: "hover:text-black" },
                  { icon: <FaLinkedin />, color: "hover:text-blue-600" },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    className={`text-xl text-gray-600 dark:text-gray-300 ${item.color}`}
                    href="#"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination outside */}
      <div className="custom-pagination flex justify-center mt-8"></div>
    </div>
  );
};

export default TeamSection;
