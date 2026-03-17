import React from "react";

const DemoLogin = ({ setValue, handleLoginSubmit }) => {
  const credentials = {
    admin: { email: "cristianoronaldo@gmail.com", pass: "CR7fgthg@P0rtu" },
    foodSeller: { email: "lionelmessi@gmail.com", pass: "Messi10fgthg@Arg2" },
    customer: { email: "aliabhatt@gmail.com", pass: "Al1@Bh@t16Box0f" },
  };

  const handleQuickLogin = (role) => {
    const { email, pass } = credentials[role];

    // ১. ফর্ম ইনপুটগুলো আপডেট করা (ইউজারকে দেখানোর জন্য)
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });

    // ২. সরাসরি লগইন ফাংশন কল করা (অটো সাবমিট)
    handleLoginSubmit({ email, password: pass });
  };

  return (
    <div className="mt-8 p-6 bg-white/10 dark:bg-gray-700/30 backdrop-blur-md border border-white/20 dark:border-gray-600/40 rounded-3xl shadow-xl">
      <p className="text-center text-[10px] font-black text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-[0.3em]">
        One-Click Demo Login
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Admin Button */}
        <button
          type="button"
          onClick={() => handleQuickLogin("admin")}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] font-bold uppercase">Admin</span>
        </button>

        {/* Food Seller Button */}
        <button
          type="button"
          onClick={() => handleQuickLogin("foodSeller")}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] font-bold uppercase">Seller</span>
        </button>

        {/* Customer Button */}
        <button
          type="button"
          onClick={() => handleQuickLogin("customer")}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] font-bold uppercase">User</span>
        </button>
      </div>
    </div>
  );
};

export default DemoLogin;
