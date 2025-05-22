import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "", // added to match backend
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">User Details (ID: {id})</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.name}
                </li>
                <li className="list-group-item">
                  <strong>Username:</strong> {user.username}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {user.address || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Gender:</strong> {user.gender || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Date of Birth:</strong>{" "}
                  {user.dateOfBirth || "-"}
                </li>
              </ul>
              <div className="mt-4 text-center">
                <Link className="btn btn-outline-primary" to="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
