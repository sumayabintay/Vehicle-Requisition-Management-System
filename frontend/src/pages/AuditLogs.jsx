import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiClipboardDocumentList,
  HiMagnifyingGlass,
} from "react-icons/hi2";

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/requisitions/audit-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLogs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLogs = logs.filter((log) =>
  log.action.toLowerCase().includes(search.toLowerCase()) ||
  log.requisition_id.toString().includes(search)
);

    return (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 p-4 md:p-8 flex flex-col">
      {}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-slate-800 mb-2">
        Audit Logs
      </h1>

      <p className="text-center text-slate-500 mb-5 text-base md:text-lg">
        View all vehicle requisition activities and actions
      </p>

      <div className="flex justify-between items-center mb-6">
  <button
    onClick={() => window.history.back()}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
  >
    ← Back to Dashboard
  </button>
</div>

<div className="mb-6">
  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 w-full md:w-[500px]">

    <div className="flex items-center gap-5">

      <div className="bg-blue-100 p-4 rounded-full">
        <HiClipboardDocumentList className="text-4xl text-blue-600" />
      </div>

      <div>
        <p className="text-slate-600 text-xl font-semibold">
          Total Activities
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-1">
          {logs.length}
        </h2>
      </div>

    </div>

  </div>
</div>

<div className="relative mb-6 w-full md:w-[500px]">
  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

  <input
    type="text"
    placeholder="Search by Action or Requisition ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-12 p-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

      {}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-5 text-left font-semibold">ID</th>
                <th className="p-5 text-left font-semibold">Action</th>
                <th className="p-5 text-left font-semibold">
                  Requisition ID
                </th>
                <th className="p-5 text-left font-semibold">
                  Date & Time
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length > 0 ? (
               filteredLogs.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`
                      border-b border-gray-200
                      hover:bg-blue-100
                      transition-all duration-200
                      ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    `}
                  >
                    <td className="p-5 font-semibold text-gray-800">
                      #{log.id}
                    </td>

                    <td className="p-5">
                      <span
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium
                          ${
                            log.action.includes("Created")
                              ? "bg-green-100 text-green-700"
                              : log.action.includes("Assigned")
                              ? "bg-blue-100 text-blue-700"
                              : log.action.includes("Cancelled")
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="p-5 text-gray-700">
                      {log.requisition_id}
                    </td>

                    <td className="p-5 text-gray-600">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-12 text-gray-500"
                  >
                    No Audit Logs Found
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
    <p>Audit Logs</p>
  </div>

</footer>

    </div>
  );
}

export default AuditLogs;