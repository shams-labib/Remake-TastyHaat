import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-full md:max-w-3xl mx-auto py-10 px-5">
      <h1 className="text-[32px] mb-5 text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h1>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        Last updated: January 2025
      </p>

      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        TasyHaat respects your privacy and is committed to protecting your
        personal data.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Information We Collect
      </h2>
      <ul>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Name, phone number, email address
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Delivery address
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Payment details (secured via third-party providers)
        </li>
      </ul>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        How We Use Your Information
      </h2>
      <ul>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          To process orders and payments
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          To communicate order updates
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          To improve our services
        </li>
      </ul>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Data Security
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        We use industry-standard security measures to protect your data.
        However, no online platform is 100% secure.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Third-Party Services
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        We may share limited information with delivery partners and payment
        gateways only for order fulfillment.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Contact Us
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        Email: privacy@tasyhaat.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
