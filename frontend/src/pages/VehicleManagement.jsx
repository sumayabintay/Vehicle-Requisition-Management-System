import React, { useState, useEffect } from "react";
import axios from "axios";

function VehicleManagement() {

    const [vehicleNumber, setVehicleNumber] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setVehicles(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchVehicles();
}, []);

  const handleAddVehicle = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/vehicles/create",
      {
        vehicle_number: vehicleNumber,
        model: model,
        capacity: capacity,
        status: "Available",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Vehicle Added Successfully");

    setVehicleNumber("");
    setModel("");
    setCapacity("");
  } catch (error) {
    console.error(error);
    alert("Failed To Add Vehicle");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
  Vehicle Management
</h1>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">
  Add Vehicle
</h3>
      <input
  type="text"
  placeholder="Vehicle Number"
  value={vehicleNumber}
  onChange={(e) => setVehicleNumber(e.target.value)}
  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>
     

      <input
  type="text"
  placeholder="Model"
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>
     
     <input
  type="number"
  placeholder="Capacity"
  value={capacity}
  onChange={(e) => setCapacity(e.target.value)}
  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>

      <button
  onClick={handleAddVehicle}
  className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
>
  Add Vehicle
</button>

<h2 className="text-2xl font-bold mt-8 mb-4 text-gray-700">
  Vehicle List
</h2>

<div className="overflow-x-auto">
  <table className="min-w-[700px] w-full bg-white shadow-md rounded-lg">
  <thead className="bg-blue-600 text-white">
  <tr>
      <th className="p-3 text-center">ID</th>
      <th className="p-3 text-center">Vehicle Number</th>
      <th className="p-3 text-center">Model</th>
      <th className="p-3 text-center">Capacity</th>
      <th className="p-3 text-center">Status</th>
    </tr>
  </thead>

  <tbody>
    {vehicles.map((vehicle) => (
  <tr
   key={vehicle.id || vehicle.vehicle_number}
    className="border-b hover:bg-gray-50"
  >
        <td className="p-3 text-left">{vehicle.id}</td>
        <td className="p-3 text-left">{vehicle.vehicle_number}</td>
        <td className="p-3 text-left">{vehicle.model}</td>
        <td className="p-3 text-left">{vehicle.capacity}</td>
        <td className="p-3 text-left">{vehicle.status}</td>
      </tr>
    ))}
  </tbody>
</table>

</div>
    </div>
  );
}

export default VehicleManagement;