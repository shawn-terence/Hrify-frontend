//@ts-nocheck
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Image} from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import '../styles/app.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
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
    <>
          {/* Sidebar for desktop */}
          <div className={`sidebar ${menuOpen ? "open" : ""} `}>
        <div  className=" font-bold text-base  flex flex-col">
          <div className="flex flex-col items-center">
            <Image id="Logo" width={80}  radius="full" src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'/>
          </div>
          <Spacer y={2}/>
          <div className="">
            <Spacer y={28}/>
            <p className="text-lg">
              <Link to="/emp/emphome">Home</Link>
            </p>
            <Spacer y={4}/>
            <p className="text-lg">
              <Link to="/emp/leave">Leave</Link>
            </p>
            <Spacer y={4}/>
            <p className="text-lg">
              <Link to="/emp/reports"> Reports</Link>
            </p>
            <Spacer y={4}/>
            <p className="text-lg">
              <Link to="/emp/attendance">Attendance</Link>
            </p>
            <Spacer y={4}/>
            <p className="text-lg">
              <Link to="/emp/projects">Projects</Link>
            </p>
          </div>
        </div>
        <div id="side-footer" className="flex flex-col gap-8 items-center">
            <Link to="/emp/profile" className="pr-2">
                <Image width={48} src="https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-256.png"/>
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
      <div className="navbar-mobile">
        <div className="navbar-header">
          <div className="flex flex-row items-center gap-2 pt-2">
            <Image id="Logo" width={64}  radius="full" src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'/>
            <p className="text-white text-2xl font-bold text-center">Hrify</p>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <Spacer y={2}/>
        {menuOpen && (
          <div className="dropdown font-bold text-base">
            <p>
              <Link to="/emp/emphome">Home</Link>
            </p>
            <Spacer y={2}/>
            <p>
              <Link to="/emp/profile">My Profile</Link>

            </p>
            <Spacer y={2}/>
            <p>
              <Link to="/emp/leave">Leave</Link>
            </p>
            <Spacer y={2}/>
            <p>
              <Link to="/emp/reports">My Reports</Link>
            </p>
            <Spacer y={2}/>
            <p>
              <Link to="/emp/projects">Projects</Link>
            </p>
            <Spacer y={2}/>
            <p>
              <Link to="/emp/attendance">My Attendance</Link>
            </p>
            <Spacer y={2}/>
            <Link>
              <p className="mb-2 text-base" onClick={handleLogout}>Logout</p>
            </Link>
          </div>
        )}
      </div>
    </>
    
  );
};

export default Navbar;
