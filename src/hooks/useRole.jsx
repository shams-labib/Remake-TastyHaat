import { useEffect, useState } from "react";
import useAxiosSecure from "../Context/useaxios/useAxiosSecure";

const useRole = (user) => {
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRole = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get(`/users/${user.email}/role`, {
          signal,
        });
        const fetchedRole = res.data?.role;
        setRole(typeof fetchedRole === "string" ? fetchedRole : "user");
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.error("Failed to fetch role:", err);
        setRole("user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();

    return () => controller.abort();
  }, [user?.email, axiosSecure]);

  return { role, isLoading };
};

export default useRole;
