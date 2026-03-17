import React from "react";
import { ShieldCheck, Store, User } from "lucide-react"; // আইকন ব্যবহারের জন্য

const DemoLogin = ({ setValue, handleLoginSubmit }) => {
  const credentials = {
    admin: {
      email: "cristianoronaldo@gmail.com",
      pass: "CR7fgthg@P0rtu",
      icon: <ShieldCheck size={18} />,
      color: "rose",
    },
    foodSeller: {
      email: "lionelmessi@gmail.com",
      pass: "Messi10fgthg@Arg2",
      icon: <Store size={18} />,
      color: "emerald",
    },
    customer: {
      email: "aliabhatt@gmail.com",
      pass: "Al1@Bh@t16Box0f",
      icon: <User size={18} />,
      color: "sky",
    },
  };

  const handleQuickLogin = (role) => {
    const { email, pass } = credentials[role];
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
    handleLoginSubmit({ email, password: pass });
  };

  return (
    <div className="mt-6 p-4 md:p-6 bg-white/5 dark:bg-gray-800/20 backdrop-blur-xl border border-white/10 dark:border-gray-700/50 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-20"></div>
        <p className="whitespace-nowrap text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Quick Access
        </p>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-20"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(credentials).map(([role, data]) => (
          <button
            key={role}
            type="button"
            onClick={() => handleQuickLogin(role)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
              transition-all duration-300 transform hover:scale-105 active:scale-95
              ${role === "admin" ? "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white" : ""}
              ${role === "foodSeller" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white" : ""}
              ${role === "customer" ? "bg-sky-500/10 border-sky-500/20 text-sky-500 hover:bg-sky-500 hover:text-white" : ""}
              border backdrop-blur-sm
            `}
          >
            {data.icon}
            <span className="capitalize">
              {role === "foodSeller"
                ? "Seller"
                : role === "customer"
                  ? "User"
                  : role}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoLogin;
