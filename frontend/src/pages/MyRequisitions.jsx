import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import {
  HiClipboardDocumentList,
  HiChartBar,
  HiMagnifyingGlass,
  HiTruck,
  HiUser,
  HiPhone,
  HiDocumentText,
} from "react-icons/hi2";

const MyRequisitions = () => {

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchMyRequisitions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/requisitions/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequisitions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching requisitions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequisitions();
  }, []);

  const cancelRequest = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/requisitions/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Request Cancelled Successfully");

    fetchMyRequisitions();
  } catch (error) {
    console.error(error);
    alert("Cancel Failed");
  }
};

  const getStatusColor = (status) => {

  if (status === "Approved") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-700";
  }

  if (status === "Completed") {
    return "bg-purple-100 text-purple-700";
  }

  if (status === "Cancelled") {
  return "bg-gray-100 text-gray-700";
}

  return "bg-yellow-100 text-yellow-700";
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  const filteredRequisitions = requisitions.filter((req) => {
  console.log("Purpose =", req.purpose);

  return (
    req.requisition_number
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    req.purpose
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    req.status
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
});

console.log("Search =", search);
console.log("Total =", requisitions.length);
console.log("Filtered =", filteredRequisitions.length);

 return (
  <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-slate-50">
    <div className="max-w-7xl mx-auto shadow-xl rounded-3xl p-8 border border-gray-200 bg-white">

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

      {}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4 mb-3">

          <div className="bg-blue-100 p-4 rounded-2xl">
            <HiClipboardDocumentList className="text-4xl text-blue-600" />
          </div>

          <div>
            <h1 className="text-5xl font-bold text-blue-700">
              My Requisitions
            </h1>

            <p className="text-gray-500 mt-1">
              Manage and track all your requisitions in one place
            </p>
          </div>

        </div>
      </div>

        <div className="mb-6">
  <div
    className="rounded-3xl shadow-xl px-6 py-4 md:px-8 md:py-5 flex justify-between items-center"
    style={{
      background:
        "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
      color: "white",
    }}
  >
    {}
    <div className="flex items-center gap-4">

      <div className="bg-white/20 p-3 rounded-2xl">
  <HiChartBar className="text-4xl text-white" />
</div>

      <div>
        <p className="text-sm opacity-90">
          Total Requisitions
        </p>

        <h2 className="text-4xl md:text-5xl font-bold leading-none mt-1">
          {requisitions.length}
        </h2>
      </div>
    </div>

    {}
    <div className="hidden md:block opacity-90">
  <HiClipboardDocumentList className="text-5xl text-white" />
</div>
  </div>
</div>
<div className="mb-6">
  <div className="relative mb-6">
  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

  <input
    type="text"
    placeholder="Search by Req No, Purpose or Status..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-12 p-3 text-sm md:text-base border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
</div>

       <div
  className="overflow-x-auto overflow-y-auto"
  style={{
    maxHeight: "600px",
  }}
>
          <table className=" min-w-[1100px] w-full border border-gray-200">

            <thead className="sticky top-0 bg-blue-600 text-white z-10">
              <tr>
                <th className="p-4 min-w-[220px]">
  Req No
</th>

<th className="p-4 min-w-[140px] whitespace-nowrap">
  Travel Date
</th>

<th className="p-8 min-w-[250px]">
  Purpose
</th>

<th className=" w-[140px] p-4 text-center">
  Status
</th>

<th className=" w-[120px] p-4 text-center">
  Action
</th>

<th className="w-[320px] p-4">
  Driver & Vehicle Information
</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequisitions.length > 0 ? (
              filteredRequisitions.map((req, index) => (
  <tr
    key={`${req.id}-${index}`}
    className="border-b hover:bg-blue-50 transition duration-200"
  >
                    <td className="p-4 whitespace-nowrap">
  {req.requisition_number}
</td>

                    <td className="p-4 text-center whitespace-nowrap">
                     {req.travel_date?.split("T")[0]}
                        </td>

                    <td className="p-4 pl-30 font-medium break-words">
                    {req.purpose}
                        </td>

<td className="p-4 text-center align-middle">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
      req.status
    )}`}
  >
    {req.status}
  </span>
</td>

<td className="p-4 text-center">
  {req.status === "Pending" ? (
    <button
      onClick={() => cancelRequest(req.id)}
      className="bg-red-500 text-white px-3 py-2 rounded"
    >
      Cancel
    </button>
  ) : (
    "-"
  )}
</td>

<td className="p-4 align-middle">
  {req.status === "Approved" ? (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-300 shadow-sm text-sm mx-auto">

      <p className="flex items-center gap-2 mb-2">
    <HiTruck className="text-blue-600 text-lg" />
    <span className="font-semibold">Vehicle:</span>
    <span>{req.vehicle_number}</span>
  </p>

      <p className="flex items-center gap-2 mb-2">
    <HiUser className="text-green-600 text-lg" />
    <span className="font-semibold">Driver:</span>
    <span>{req.driver_name}</span>
  </p>

  <p className="flex items-center gap-2 mb-2">
    <HiPhone className="text-purple-600 text-lg" />
    <span>{req.driver_phone}</span>
  </p>

      <p className="flex items-center gap-2">
    <HiDocumentText className="text-orange-500 text-lg" />
    <span className="font-semibold">Remarks:</span>
    <span>{req.remarks}</span>
  </p>

    </div>


  ) : (
    "-"
  )}
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    No Requisitions Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

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
};

export default MyRequisitions;