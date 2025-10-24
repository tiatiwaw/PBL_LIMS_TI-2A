import React from "react";
import clients from "../../../data/users";

export default function ManageClients() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Clients</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{client.id}</td>
              <td className="py-2 px-4 border-b">{client.name}</td>
              <td className="py-2 px-4 border-b">{client.company}</td>
              <td className="py-2 px-4 border-b">{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
