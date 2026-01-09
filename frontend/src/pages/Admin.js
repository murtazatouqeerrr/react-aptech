import React, { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

function Admin() {
  const token = localStorage.getItem("token");

  // Hooks must be unconditionally called
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
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

  // Fetch services function
  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/service", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data.getservice || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingServices(false);
    }
  }, [token]);

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

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);


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

  // Handle edit service
  const handleEdit = async (service) => {
    const newService = prompt("Enter new service name", service.service);
    const newDescription = prompt("Enter new description", service.description);
    const newPrice = prompt("Enter new price", service.price);
    const newProvider = prompt("Enter new provider", service.provider);
    if (newService && newDescription && newPrice && newProvider) {
      try {
        const response = await fetch(`http://localhost:8000/service/${service._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service: newService,
            description: newDescription,
            price: parseFloat(newPrice),
            provider: newProvider,
          }),
        });
        if (!response.ok) throw new Error("Failed to update service");
        await fetchServices(); // Refresh services
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle delete service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`http://localhost:8000/service/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to delete service");
        await fetchServices(); // Refresh services
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // ✅ Conditional rendering AFTER hooks
  if (!token || !isAdmin) return <h2>Access Denied ❌ Admins Only</h2>;
  if (loadingContacts || loadingUsers || loadingServices) return <h3>Loading data...</h3>;
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

      {/* SERVICES */}
      <div style={{ padding: "20px" }}>
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services found</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Description</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.service}</td>
                  <td>{s.description}</td>
                  <td>{s.price}</td>
                  <td>{s.provider}</td>
                  <td>
                    <button onClick={() => handleEdit(s)}>Edit</button>
                    <button onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
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
