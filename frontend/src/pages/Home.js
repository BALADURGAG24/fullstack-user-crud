import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/users");
      setUsers(result.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">User Management</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center text-secondary py-5 fs-5">Loading users...</div>
          ) : (
            <table className="table table-hover align-middle text-center mb-0">
              <thead className="table-primary text-primary">
                <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className="align-middle">
                      <td>{index + 1}</td>
                      <td className="text-start ps-3">{user.name}</td>
                      <td>{user.username}</td>
                      <td className="text-wrap" style={{ maxWidth: "180px" }}>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td className="text-wrap" style={{ maxWidth: "180px" }}>{user.address || "-"}</td>
                      <td>{user.gender || "-"}</td>
                      <td>{formatDate(user.dateOfBirth)}</td>
                      <td>
                        <Link
                          className="btn btn-sm btn-primary me-2"
                          to={`/viewuser/${user.id}`}
                          title="View User"
                        >
                          View
                        </Link>
                        <Link
                          className="btn btn-sm btn-outline-success me-2"
                          to={`/edituser/${user.id}`}
                          title="Edit User"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteUser(user.id)}
                          title="Delete User"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-muted py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
