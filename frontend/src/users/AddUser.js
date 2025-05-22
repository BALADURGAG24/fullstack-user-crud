import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "", 
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", user); 
      navigate("/");
    } catch (err) {
      console.error("Failed to add user", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Register User</h3>

              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      name="name"
                      value={user.name}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      name="username"
                      value={user.username}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={user.email}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      name="phone"
                      value={user.phone}
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter address"
                      name="address"
                      value={user.address}
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={user.gender}
                      onChange={onInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary w-50 me-2">
                    Submit
                  </button>
                  <Link to="/" className="btn btn-outline-secondary w-50">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
