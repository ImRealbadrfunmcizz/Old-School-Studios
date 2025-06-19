import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const isDeviceAdmin = () => {
  const allowedDevices = ["device1", "device2"];
  const thisDevice = localStorage.getItem("oss-device") || "unknown";
  return allowedDevices.includes(thisDevice);
};

const App = () => {
  const [admins, setAdmins] = useState(["you@example.com"]);
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = "you@example.com";
    setIsAdmin(admins.includes(currentUser));
  }, [admins]);

  const addAdmin = () => {
    if (isDeviceAdmin() && email && !admins.includes(email)) {
      setAdmins([...admins, email]);
      setEmail("");
    }
  };

  return (
    <div className="container">
      <h1>Old School Studios</h1>

      <div className="card">
        <h2>Games</h2>
        <p>No games published yet. Coming soon!</p>
      </div>

      {isDeviceAdmin() && (
        <div className="card">
          <h2>Admin Panel</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to grant admin access"
          />
          <button onClick={addAdmin}>Add Admin</button>
          <div className="admin-list">
            <h3>Current Admins:</h3>
            <ul>
              {admins.map((admin, idx) => (
                <li key={idx}>{admin}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
