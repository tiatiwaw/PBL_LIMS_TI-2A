import React from "react";
import { users } from "@/data/clients";

export default function ManageUsers() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
