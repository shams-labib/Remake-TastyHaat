import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-full md:max-w-3xl mx-auto py-10 px-5">
      <h1 className="text-[32px] mb-5 text-gray-900 dark:text-gray-100">
        Terms & Conditions
      </h1>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        Last updated: January 2025
      </p>

      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        By using <strong>TasyHaat</strong>, you agree to comply with the
        following terms and conditions.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        User Responsibilities
      </h2>
      <ul>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Provide accurate information
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Maintain account security
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Use the platform lawfully
        </li>
      </ul>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Seller Responsibilities
      </h2>
      <ul>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Ensure food quality and hygiene
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Deliver orders on time
        </li>
        <li className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
          Comply with local food regulations
        </li>
      </ul>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Order & Payment
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        All prices are displayed in local currency. TasyHaat reserves the right
        to cancel orders in case of fraud or policy violation.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Limitation of Liability
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        TasyHaat is not responsible for allergic reactions or misuse of food
        products by users.
      </p>

      <h2 className="text-[22px] mt-7.5 text-gray-900 dark:text-gray-100">
        Changes to Terms
      </h2>
      <p className="leading-[1.7] mb-3 text-gray-700 dark:text-gray-300">
        We reserve the right to update these terms at any time without prior
        notice.
      </p>
    </div>
  );
};

export default TermsConditions;
