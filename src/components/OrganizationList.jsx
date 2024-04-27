import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrganizationListComp() {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          "http://122.170.12.63:90/api/Organization/getAllOrganization",
          {
            headers: { Authorization: token },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrganizations(data?.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        navigate("/");
      }
    };

    fetchOrganizations();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/add-organization")}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Organization
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            LOGOUT
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Organization Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Short Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>URL</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Logo</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {org.organizationName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {org.organizationShortName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <a
                    href={org.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {org.organizationURL}
                  </a>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <img
                    src={org.organizationLOGO}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default OrganizationListComp;
