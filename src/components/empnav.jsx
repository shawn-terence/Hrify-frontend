import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spacer, Image } from "@nextui-org/react";
import "../styles/app.css";

const Navbaradm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://hrify-backend.onrender.com/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const links = [
    { to: "/adm/admhome", label: "Home" },
    { to: "/adm/attendance", label: "Attendance" },
    { to: "/adm/leave", label: "Leave Requests" },
    { to: "/adm/reports", label: "My Reports" },
    { to: "/adm/users", label: "Employees" },
    { to: "/adm/adduser", label: "Add Employee" },
    { to: "/adm/projects", label: "Projects" },
    { to: "/adm/leaves", label: "Leaves" },
    { to: "/adm/report", label: "View Reports" },
    { to: "/adm/attendancepage", label: "Attendances" },
  ];

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="adsidebar">
        <div className="font-bold text-base flex flex-col">
          <div className="flex flex-col items-center">
            <Image
              id="Logo"
              width={80}
              radius="full"
              src="https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png"
            />
          </div>
          <div id="linkbox" className="text-base">
            <Spacer y={4} />
            {links.map((link) => (
              <React.Fragment key={link.to}>
                <Link to={link.to}>
                  <p className="text-base mb-2">{link.label}</p>
                </Link>
                <Spacer y={1} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <Spacer y={6} />
        <div id="side-footer" className="flex flex-col gap-8">
          <Link to="/adm/profile" className="pr-2">
            <Image
              width={48}
              src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            />
          </Link>
          <button onClick={handleLogout} style={{ background: "none", border: "none" }}>
            <Image
              width={48}
              src="https://cdn0.iconfinder.com/data/icons/simpline-mix/64/simpline_43-256.png"
              alt="Logout"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="adnavbar-mobile">
        <div className="adnavbar-header flex items-center justify-between px-4 py-2">
          <div className="flex flex-row items-center gap-2">
            <Image
              id="Logo"
              width={64}
              radius="full"
              src="https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png"
            />
            <p className="text-white text-2xl font-bold text-center">
              Hrify <span className="text-sm">admin</span>
            </p>
          </div>
          <button className="menu-toggle text-white text-3xl" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="addropdown px-4 py-2">
            <div className="font-bold text-base">
              <p className="text-lg font-bold mb-2">My Links</p>
              {links.map((link) => (
                <Link to={link.to} key={link.to}>
                  <p className="mb-2 text-base">{link.label}</p>
                </Link>
              ))}
              <p className="mb-2 text-base cursor-pointer" onClick={handleLogout}>
                Logout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbaradm;
