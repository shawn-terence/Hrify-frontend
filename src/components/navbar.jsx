import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spacer ,Image,Accordion,AccordionItem} from "@nextui-org/react";
import '../styles/app.css';

const Navbaradm = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="adnavbar ">
      {/* Sidebar for desktop */}
      <div className={`adsidebar ${menuOpen ? "open" : ""}`}>
        <div  className="font-bold text-base flex flex-col">
        <div className="flex flex-col items-center ">
            <Image id="Logo" width={80}  radius="full" src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'/>
        </div>
        <div id="linkbox" className="text-base"> 
          <Spacer y={4}/>
              <Spacer y={2}/>
            <Link to="/adm/admhome">
              <p className="text-lg">Home</p>
            </Link>
            <Spacer y={2}/> 
            <Link to="/adm/attendance">
              <p className="text-lg">Attendance</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/leave">
              <p className="text-lg">Leave Requests</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/reports">
              <p className="text-lg">My Reports</p>
            </Link>
            <Spacer y={4}/>
            <Spacer y={2} />
            <Link to="/adm/users">
              <p className="mb-4 text-lg">Employees</p>
            </Link>
            <Link to="/adm/adduser">
              <p className="mb-4 text-lg">Add Employee</p>
            </Link>
            <Link to="/adm/leaves">
              <p className="mb-4 text-lg">Leaves</p>
            </Link>
            <Link to="/adm/report">
              <p className="mb-4 text-lg">View Reports</p>
            </Link>
            <Link to="/adm/attendancepage">
              <p className="mb-4 text-lg">Attendances</p>
            </Link>
        </div>
          </div>
          <Spacer y={6}/>
        <div id="side-footer" className="flex flex-col gap-8">
            <Link to="/adm/profile" className="pr-2">
                <Image width={48} src="https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-256.png"/>
            </Link>
            <Link to="/">
            <Image width={48} src="https://cdn4.iconfinder.com/data/icons/internet-security-flat-2/32/Internet_Security_entrance_exit_log_out_arrow-256.png"/>
            </Link>
        </div>
      </div>

      {/* Navbar for mobile */}
      <div className="adnavbar-mobile">
        <div className="adnavbar-header">
        <div className="flex flex-row items-center gap-2 pt-2">
            <Image id="Logo" width={64}  radius="full" src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'/>
            <p className="text-white text-2xl font-bold text-center">Hrify <span className="text-sm">admin</span></p>
        </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <Spacer y={2}/>
        {menuOpen && (
          <div className="addropdown">
            <div className="font-bold text-base">
            <p className="text-lg  font-bold">My Links</p>
            <Spacer y={2}/>
          <Link to="/adm/admhome">
            <p>Home</p>
          </Link>
          <Link to="/adm/profile">
            <p>My Profile</p>
          </Link>
          <Link to="/adm/attendance">
            <p>Attendance</p>
          </Link>
          <Link to="/adm/leave">
            <p>My Leave Requests</p>
          </Link>
          <Link to="/adm/reports">
            <p>My Reports</p>
          </Link>
          <Spacer y={4}/>
          <p className="font-bold text-lg">Employee Links</p>
          <Spacer y={2}/>
          <Link to="/adm/adduser">
            <p>Add New Employee</p>
          </Link>
          <Link to="/adm/users">
            <p>Manage Employees</p>
          </Link>
          <Link to="/adm/leaves">
            <p>Leaves</p>
          </Link>
          <Link to="/adm/report">
            <p>View Reports</p>
          </Link>
          <Link to='/adm/attendancepage'>
          <p>Attendances</p>
          </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbaradm;
