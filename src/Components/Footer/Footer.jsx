import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 relative pt-16">
      <div className="container mx-auto px-8 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="text-3xl font-bold tracking-tight">
            Tasty<span className="text-primary">Haat</span>
          </Link>
          <p className="text-center md:text-left text-gray-300 mt-4 leading-relaxed">
            TastyHaat delivers fresh, delicious food with quality ingredients,
            fast service, and authentic flavors to satisfy every craving.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white mb-4 uppercase tracking-widest font-semibold text-sm">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white mb-4 uppercase tracking-widest font-semibold text-sm">
            Legal
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/refund-policy"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white mb-4 uppercase tracking-widest font-semibold text-sm">
            Follow Us
          </h3>
          <div className="flex items-center gap-4">
            {[FaFacebook, FaInstagram, FaTwitter].map((Icon, idx) => (
              <Link
                key={idx}
                to="/"
                aria-label="Social Media"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/30 border border-gray-700 hover:bg-linear-to-tr hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-900/70 py-6 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-center items-center gap-2">
        <span>© {new Date().getFullYear()}</span>
        <span className="font-semibold text-primary cursor-pointer">
          <Link to={"/"}>TastyHaat</Link>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
