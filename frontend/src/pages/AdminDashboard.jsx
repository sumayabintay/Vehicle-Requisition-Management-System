import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import {
  HiMagnifyingGlass,
  HiOutlineDocumentText,
  HiCheckCircle,
  HiOutlineXCircle,
  HiTruck,
  HiChevronDown,
} from "react-icons/hi2";

function AdminDashboard() {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [vehicleId, setVehicleId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [driverPhone, setDriverPhone] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

 const fetchVehicles = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setVehicles(response.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const [selectedRequest, setSelectedRequest] = useState(null);

const [showAssignModal, setShowAssignModal] = useState(false);
const [selectedReqId, setSelectedReqId] = useState(null);

const [openMenuId, setOpenMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  navigate("/login");
};

  const fetchRequisitions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/requisitions/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequisitions(response.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setRequisitions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequisitions();
      fetchVehicles();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requisitions/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Request ${status}`);
      fetchRequisitions();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const assignVehicle = async (requisitionId) => {
     
  try {

    await axios.post(
      "http://localhost:5000/api/requisitions/assign",
      {
        requisition_id: requisitionId,
        vehicle_id: selectedVehicle,
        driver_name: driverName,
        driver_phone: driverPhone,
        remarks: remarks
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      alert("Vehicle Assigned Successfully");

      setSelectedVehicle("");
      setDriverName("");
      setDriverPhone("");
      setRemarks("");

      fetchRequisitions();
    } catch (error) {
      console.error(error);
      alert("Assignment Failed");
    }
  };

  const filteredRequisitions = requisitions.filter(
    (req) =>
      req.name?.toLowerCase().includes(search.toLowerCase()) ||
      req.destination?.toLowerCase().includes(search.toLowerCase()) ||
      req.status?.toLowerCase().includes(search.toLowerCase()) ||
      req.requisition_number?.toLowerCase().includes(search.toLowerCase())
  );

  const cancelledCount = requisitions.filter(
  (req) => req.status === "Cancelled"
).length;

  const pendingCount = requisitions.filter(
  (req) => req.status === "Pending"
).length;

const approvedCount = requisitions.filter(
  (req) => req.status === "Approved"
).length;

const rejectedCount = requisitions.filter(
  (req) => req.status === "Rejected"
).length;

const completedCount = requisitions.filter(
  (req) => req.status === "Completed"
).length;

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (

  <div className="min-h-screen bg-slate-50 p-4 md:p-6 flex flex-col">

    {}
    <div className="flex justify-end mb-4">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium shadow-md transition duration-300"
      >
        <HiArrowRightOnRectangle className="text-lg" />
        Logout
      </button>
    </div>

    <div className="mb-8">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
        Admin Dashboard
      </h1>

  <p className="text-slate-500 mt-2">
    Manage vehicle requisitions and approvals
  </p>
</div>

<div className="mb-5">
  <button
    onClick={() => window.location.href = "/audit-logs"}
    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
  >
    View Audit Logs
  </button>
</div>

<div className="flex flex-wrap gap-6 mb-8">
<div
  className="bg-white p-5 rounded-xl shadow-md min-w-[180px]"
  style={{
    borderLeft: "5px solid #2563eb",
  }}
>
  <p className="text-gray-500">Total Requests</p>

  <h2 className="text-3xl font-bold text-blue-600">
    {requisitions.length}
  </h2>
</div>

  <div
  className="bg-white p-5 rounded-xl shadow-md .min-w-[180px]"
  style={{
    borderLeft: "5px solid #16a34a",
  }}
>
  <p className="text-gray-500">Approved</p>

  <h2 className="text-3xl font-bold text-green-600">
    {approvedCount}
  </h2>
</div>

<div
  className="bg-white p-5 rounded-xl shadow-md .min-w-[180px]"
  style={{
    borderLeft: "5px solid #7c3aed",
  }}
>
  <p className="text-gray-500">Completed</p>

  <h2 className="text-3xl font-bold text-purple-600">
    {completedCount}
  </h2>
</div>

 <div
  className="bg-white p-5 rounded-xl shadow-md .min-w-[180px]"
  style={{
    borderLeft: "5px solid #dc2626",
  }}
>
  <p className="text-gray-500">Rejected</p>

  <h2 className="text-3xl font-bold text-red-600">
    {rejectedCount}
  </h2>
</div>

  <div
  className="bg-white p-5 rounded-xl shadow-md .min-w-[180px]"
  style={{
    borderLeft: "5px solid #6b7280",
  }}
>
  <p className="text-gray-500">Cancelled</p>

  <h2 className="text-3xl font-bold text-gray-600">
    {cancelledCount}
  </h2>
</div>

<div
  className="bg-white p-5 rounded-xl shadow-md .min-w-[180px]"
  style={{
    borderLeft: "5px solid #f59e0b",
  }}
>
  <p className="text-gray-500">Pending</p>

  <h2 className="text-3xl font-bold text-yellow-500">
    {pendingCount}
  </h2>
</div>

</div>

      <div className="relative w-full max-w-lg mb-5">
  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

  <input
    type="text"
    placeholder="Search Employee / Destination / Status / Req No"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-12 pr-4 py-3 border border-blue-400 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

    <div className="overflow-x-auto">

      <table className="min-w-[900px] w-full mt-5 border-collapse bg-white shadow-md rounded-lg overflow-hidden">

  <thead className="bg-blue-900 text-white">
    <tr className="hover:bg-blue-500 transition ">

<th className="border border-gray-300 p-4">Req No</th>
<th className="border border-gray-300 p-4">Employee</th>
<th className="border border-gray-300 p-4">Travel Date</th>
<th className="border border-gray-300 p-4 w-64">
  Destination
</th>
<th className="border border-gray-300 p-4 w-52">
  Purpose
</th>
<th className="border border-gray-300 p-4 w-44">
  Status
</th>

<th className="border border-gray-300 p-4 w-32">
  Action
</th>

    </tr>
  </thead>

  <tbody>
    {filteredRequisitions.length > 0 ? (
      filteredRequisitions.map((req) => (
        <tr key={req.id}>

<td className="border border-gray-300 p-3">
{req.requisition_number}
</td>

<td className="border border-gray-300 p-3">
  {req.name}
</td>

<td className="border border-gray-300 p-3">
{req.travel_date?.split("T")[0]}
</td>

<td className="border border-gray-300 p-3 w-64 break-words">
  {req.destination}
</td>

<td className="border border-gray-300 p-3 w-52 break-words">
  {req.purpose}
</td>

<td className="border border-gray-300 p-3 text-center">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      req.status === "Approved"
        ? "bg-green-100 text-green-700"
        : req.status === "Rejected"
        ? "bg-red-100 text-red-700"
        : req.status === "Completed"
        ? "bg-purple-100 text-purple-700"
        : req.status === "Cancelled"
        ? "bg-gray-200 text-gray-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {req.status}
  </span>
</td>

<td className="border border-gray-300 p-3">

  <div className="relative flex items-center justify-center gap-2">

    <button
  onClick={() => setSelectedRequest(req)}
  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
>
  <HiOutlineDocumentText className="text-lg" />
  Details
</button>

    <button
  className="bg-white border border-gray-300 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
  onClick={() =>
    setOpenMenuId(openMenuId === req.id ? null : req.id)
  }
>
  <HiChevronDown className="text-lg text-gray-700" />
</button>

    {openMenuId === req.id && (
      <div className="absolute top-12 right-0 w-48 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">

        <button
  className="w-full p-2.5 flex items-center gap-2 hover:bg-gray-100 transition"
  onClick={() => updateStatus(req.id, "Approved")}
>
  <HiCheckCircle className="text-green-600 text-lg" />
  Approve
</button>

        <button
  className="w-full p-2.5 flex items-center gap-2 hover:bg-gray-100 transition"
  onClick={() => updateStatus(req.id, "Completed")}
>
  <HiCheckCircle className="text-purple-600 text-lg" />
  Complete
</button>

        <button
  className="w-full p-2.5 flex items-center gap-2 hover:bg-gray-100 transition"
  onClick={() => updateStatus(req.id, "Rejected")}
>
  <HiOutlineXCircle className="text-red-600 text-lg" />
  Reject
</button>

        <button
  className="w-full p-2.5 flex items-center gap-2 hover:bg-gray-100 transition"
  onClick={() => {
    setSelectedReqId(req.id);
    setShowAssignModal(true);
    setOpenMenuId(null);
  }}
>
  <HiTruck className="text-blue-600 text-lg" />
  Assign Vehicle
</button>

      </div>
    )}

  </div>

</td>
          
   </tr>
   
      ))
    ) : (
      <tr>
        <td colSpan="7" className="text-center p-4">
          No Requisitions Found
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
    {selectedRequest && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl w-11/12 max-w-lg shadow-2xl z-50">

    <h2 className="text-2xl font-bold mb-4">
  Request Details
</h2>

    <p className="mb-2">Employee: ...</p>

    <p>
      Travel Date:
      {selectedRequest.travel_date?.split("T")[0]}
    </p>

    <p>
      Pickup:
      {selectedRequest.pickup_location}
    </p>

    <p>
      Destination:
      {selectedRequest.destination}
    </p>

    <p>
      Purpose:
      {selectedRequest.purpose}
    </p>

    <button
  onClick={() => setSelectedRequest(null)}
  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
>
  Close
</button>

  </div>
)}

{showAssignModal && (
  <div className="fixed inset-0 bg-black/40 z-50" />
)}

{showAssignModal && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl w-11/12 max-w-md shadow-2xl z-50">
    <h2 className="text-2xl font-bold mb-4">
      Assign Vehicle
    </h2>

    <select
      value={selectedVehicle}
      onChange={(e) => setSelectedVehicle(e.target.value)}
      className="w-full p-2.5 mb-3 border border-gray-300 rounded-lg"
>
      <option value="">Select Vehicle</option>

      {vehicles.map((vehicle) => (
        <option
          key={vehicle.id}
          value={vehicle.id}
        >
          {vehicle.vehicle_number}
        </option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Driver Name"
      value={driverName}
      onChange={(e) => setDriverName(e.target.value)}
      className="w-full p-2.5 mb-3 border border-gray-300 rounded-lg"
    />

    <input
  type="text"
  placeholder="Driver Phone Number"
  value={driverPhone}
  onChange={(e) => setDriverPhone(e.target.value)}
  className="w-full p-2.5 mb-3 border border-gray-300 rounded-lg"
/>

    <input
      type="text"
      placeholder="Remarks"
      value={remarks}
      onChange={(e) => setRemarks(e.target.value)}
      className="w-full p-2.5 mb-4 border border-gray-300 rounded-lg"
    />

    <button
  onClick={() => {
    assignVehicle(selectedReqId);
    setShowAssignModal(false);
  }}
  className="w-full bg-blue-600 text-white py-2.5 rounded-lg mb-3 hover:bg-blue-700 transition"
>
      Assign Vehicle
    </button>

    <button
  onClick={() => setShowAssignModal(false)}
  className="w-full bg-red-600 text-white py-2.5 rounded-lg mt-2 hover:bg-red-700 transition"
>
      Close
    </button>
  </div>
)}
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
    <p>Admin Dashboard</p>
  </div>

</footer>

</div>
  );
}

export default AdminDashboard;