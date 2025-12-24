import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Admin() {
  const token = localStorage.getItem("token");

  // Hooks must be unconditionally called
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  // Decode token safely
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [token]);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:8000/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();
        setContacts(data.contact || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingContacts(false);
      }
    };
    fetchContacts();
  }, [token]);

  // ✅ Conditional rendering AFTER hooks
  if (!token || !isAdmin) return <h2>Access Denied ❌ Admins Only</h2>;
  if (loadingContacts || loadingUsers) return <h3>Loading data...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <>
      <h1>Admin Dashboard</h1>

      {/* CONTACTS */}
      <div style={{ padding: "20px" }}>
        <h2>Contact List</h2>
        {contacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* USERS */}
      <div style={{ padding: "20px" }}>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.isAdmin ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Admin;
