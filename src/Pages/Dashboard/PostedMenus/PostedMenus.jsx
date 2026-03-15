import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../Context/useAuth/useAuth";
import useAxiosSecure from "../../../Context/useaxios/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "./../../Loader/Loader";

const PostedMenus = () => {
  const { user } = useAuth();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMenu, setEditMenu] = useState(null);
  const [saving, setSaving] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchMenus = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/menus/user/${user.email}`);
      setMenus(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch menus",
      });
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleEdit = async (id) => {
    try {
      const res = await axiosSecure.get(`/menus/${id}`);
      setEditMenu(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch menu details",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axiosSecure.patch(`/menus/${editMenu._id}`, {
        name: editMenu.name,
        price: Number(editMenu.price),
        description: editMenu.description,
        image: editMenu.image,
        isAvailable: editMenu.isAvailable,
      });

      setMenus((prev) =>
        prev.map((m) => (m._id === editMenu._id ? editMenu : m))
      );
      setEditMenu(null);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Menu updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update menu",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/menus/${id}`);
        setMenus((prev) => prev.filter((m) => m._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Menu has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete menu",
        });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen dark:bg-gray-900 transition-colors">
      <motion.h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        My Posted <span className="text-primary">Menus</span>
      </motion.h1>

      {menus.length === 0 ? (
        <p className="text-center md:text-left text-gray-700 dark:text-gray-300 py-20">
          You haven't added any menus yet.
        </p>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {menus.map((menu) => (
              <div
                key={menu._id}
                className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="card-body p-4 space-y-2 text-gray-800 dark:text-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{menu.name}</h3>
                    <span
                      className={`badge ${
                        menu.isAvailable ? "badge-success" : "badge-error"
                      }`}
                    >
                      {menu.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <p className="text-sm">
                    <strong>Price:</strong> ${menu.price}
                  </p>

                  <p className="text-sm">
                    <strong>Created:</strong>{" "}
                    {menu.createdAt
                      ? new Date(menu.createdAt).toLocaleDateString()
                      : "—"}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      className="btn btn-sm btn-warning flex-1"
                      onClick={() => handleEdit(menu._id)}
                      disabled={saving}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error flex-1"
                      onClick={() => handleDelete(menu._id)}
                      disabled={saving}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow">
            <table className="table w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr
                    key={menu._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <th>{index + 1}</th>
                    <td>{menu.name}</td>
                    <td>${menu.price}</td>
                    <td>
                      <span
                        className={`badge ${
                          menu.isAvailable ? "badge-success" : "badge-error"
                        }`}
                      >
                        {menu.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td>
                      {menu.createdAt
                        ? new Date(menu.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleEdit(menu._id)}
                        disabled={saving}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(menu._id)}
                        disabled={saving}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal */}
      {editMenu && (
        <div
          className="modal modal-open bg-black/40"
          onClick={() => setEditMenu(null)}
        >
          <div
            className="modal-box bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">Edit Menu</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                className="input input-bordered w-full bg-white dark:bg-gray-900
                         text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
                value={editMenu.name}
                onChange={(e) =>
                  setEditMenu({ ...editMenu, name: e.target.value })
                }
              />

              <input
                name="price"
                type="number"
                className="input input-bordered w-full bg-white dark:bg-gray-900
                         text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
                value={editMenu.price}
                onChange={(e) =>
                  setEditMenu({ ...editMenu, price: e.target.value })
                }
              />

              <textarea
                name="description"
                className="textarea textarea-bordered w-full bg-white dark:bg-gray-900
                         text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600"
                value={editMenu.description}
                onChange={(e) =>
                  setEditMenu({ ...editMenu, description: e.target.value })
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editMenu.isAvailable}
                  onChange={(e) =>
                    setEditMenu({ ...editMenu, isAvailable: e.target.checked })
                  }
                  className="checkbox checkbox-primary"
                />
                Available
              </label>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditMenu(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedMenus;
