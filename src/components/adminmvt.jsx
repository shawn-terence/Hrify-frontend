import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spacer, Image } from "@nextui-org/react";
import "../styles/app.css";

const Navbaradm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  return (
    <div >
      {/* Sidebar for desktop */}
      <div className={`admsidebar ${menuOpen ? "open" : ""}`}>
        <div className="font-bold text-base flex flex-col">
          <div className="flex flex-col">
            <Image
              id="Logo"
              width={80}
              radius="full"
              src="https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png"
            />
          </div>
          <div id="linkbox" className="text-base">
            <Spacer y={4} />
            <Spacer y={2} />
              <p className="text-base">
              <Link to="/adm/admhome">Home</Link>
              </p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
              <Link to="/adm/attendance">Attendance</Link></p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
                <Link to="/adm/leave">Leave Requests</Link>
              </p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
                <Link to="/adm/reports">My Reports</Link>
              </p>
            <Spacer y={4} />
            <Spacer y={2} />
            <p className="mb-4 text-base">
                <Link to="/adm/users">Employees</Link>
            </p>
            <p className="mb-4 text-base">
                <Link to="/adm/adduser">Add Employee</Link>
            </p>
            <p className="mb-4 text-base">
                <Link to="/adm/projects">Projects</Link>
            </p>
            <p className="mb-4 text-base">
                <Link to="/adm/leaves">Leaves</Link>
            </p>
            <p className="mb-4 text-base">
                <Link to="/adm/report">View Reports</Link>
            </p>
            <p className="mb-4 text-base">
                <Link to="/adm/attendancepage">Attendances</Link>
            </p>
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

      {/* Navbar for mobile */}
      <div className="admnavbar-mobile">
        <div className="admnavbar-header">
          <div className="flex flex-row items-center gap-2 pt-2">
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
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <Spacer y={2} />
        {menuOpen && (
          <div className="addropdown">
            <div className="font-bold text-base">
              <p className="text-lg font-bold">My Links</p>
              <Spacer y={2} />
              <p className="text-base">
              <Link to="/adm/admhome">Home</Link>
              </p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
              <Link to="/adm/attendance">Attendance</Link></p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
                <Link to="/adm/leave">Leave Requests</Link>
              </p>
              <Spacer y={2} />
              <p className="mb-2 text-base">
                <Link to="/adm/reports">My Reports</Link>
              </p>
              <Spacer y={4} />
              <Spacer y={2} />
              <p className="mb-2 text-base">
                <Link to="/adm/users">Employees</Link>
              </p>
              <p className="mb-2 text-base">
                <Link to="/adm/adduser">Add Employee</Link>
              </p>
              <p className="mb-2 text-base">
                <Link to="/adm/projects">Projects</Link>
              </p>
              <p className="mb-2 text-base">
                <Link to="/adm/leaves">Leaves</Link>
              </p>
              
              <p className="mb-2 text-base">
                <Link to="/adm/report">View Reports</Link>
              </p>
              <p className="mb-2 text-base">
                <Link to="/adm/attendancepage">Attendances</Link>
             </p>
              <p className="mb-2 text-base" onClick={handleLogout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbaradm;
