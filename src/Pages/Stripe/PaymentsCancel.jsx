import { useNavigate } from "react-router";

const PaymentsCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-base-100 max-w-md w-full rounded-3xl shadow-2xl p-10 text-center animate-scaleIn border border-base-300">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-secondary/20">
          <svg
            className="w-10 h-10 text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-secondary mb-3">
          Payment Cancelled
        </h1>

        <p className="text-base-content mb-8 leading-relaxed">
          Your payment was not completed. No charges were made. You can try
          again whenever you're ready.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-1/2 py-3 rounded-xl bg-base-300 text-base-content font-semibold hover:bg-base-200 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-1/2 py-3 rounded-xl bg-secondary text-base-content font-bold hover:bg-secondary-focus transition"
          >
            Home
          </button>
        </div>
      </div>

      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
          @keyframes scaleIn {
            from { transform: scale(0.88); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default PaymentsCancel;
