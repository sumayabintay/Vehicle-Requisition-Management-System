import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

function EmployeeDashboard() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travel_date: "",
    pickup_location: "",
    destination: "",
    purpose: "",
    passenger_count: "",
    duration: "",
    priority: "Normal",
    additional_notes: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/requisitions/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Vehicle Requisition Submitted Successfully!");

      setFormData({
        travel_date: "",
        pickup_location: "",
        destination: "",
        purpose: "",
        passenger_count: "",
        duration: "",
        priority: "Normal",
        additional_notes: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to submit requisition."
      );
    }
  };

    return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-6 md:py-10 px-4">
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-5 md:p-8">

      {}
      <div className="flex justify-end mb-4">
        <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-blue-400 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
>
  <HiArrowRightOnRectangle className="text-lg" />
  Logout
</button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 flex items-center justify-center gap-3">
          <span className="bg-blue-100 p-2 rounded-full">
            <HiOutlineClipboardDocumentList className="text-3xl text-blue-700" />
          </span>
          Vehicle Requisition Form
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the details below to request a vehicle
        </p>
      </div>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-5"
>
          <input
            type="date"
            name="travel_date"
            value={formData.travel_date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <input
            type="text"
            name="pickup_location"
            placeholder="Pickup Location"
            value={formData.pickup_location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <input
            type="number"
            name="passenger_count"
            placeholder="Passenger Count"
            value={formData.passenger_count}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>

          <textarea
  name="additional_notes"
  placeholder="Additional Notes"
  value={formData.additional_notes}
  onChange={handleChange}
  className="md:col-span-2 w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
  rows="4"
></textarea>

          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit Requisition
          </button>

          <button
            type="button"
            onClick={() =>
              (window.location.href = "/my-requisitions")
            }
            className="md:col-span-2 w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            View My Requisitions
          </button>

        </form>
      </div>

<footer className="mt-16 bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">

  <div className="text-center md:text-left">
    <h3 className="text-blue-700">
      Vehicle Requisition System
    </h3>

    <p className="text-gray-600 mt-1">
      Developed for <strong>Confidence Infrastructure PLC</strong>
    </p>
  </div>

  <div className="text-center md:text-right text-gray-500">
    <p>© 2026 All Rights Reserved</p>
    <p>Employee Dashboard</p>
  </div>

</footer>
      
    </div>
  );
}
export default EmployeeDashboard;