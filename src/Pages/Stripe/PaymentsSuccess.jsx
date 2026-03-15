import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const PaymentsSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Fetch payment details from backend
    fetch(`${import.meta.env.VITE_API_URL}/payments/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setPayment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch payment:", err);
        setLoading(false);
      });
  }, [sessionId]);

  // Redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/my-orders");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-6">Loading payment info...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-base-100 max-w-md w-full rounded-3xl shadow-2xl p-10 text-center animate-scaleIn border border-base-300">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/20">
          <svg
            className="w-10 h-10 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-3">
          Payment {payment?.status === "paid" || payment?.status === "succeeded" ? "Successful" : "Failed"}
        </h1>

        {payment ? (
          <p className="text-base-content mb-8 leading-relaxed">
            {payment.userEmail && `Email: ${payment.userEmail}`} <br />
            {payment.amount && `Amount: $${payment.amount}`} <br />
            Status: {payment.status}
          </p>
        ) : (
          <p className="text-base-content mb-8 leading-relaxed">Payment info not available.</p>
        )}

        <button
          onClick={() => navigate("/dashboard/my-orders")}
          className="w-full py-3 rounded-xl bg-primary text-primary-content font-bold hover:bg-primary-focus transition"
        >
          View My Orders
        </button>
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

export default PaymentsSuccess;
