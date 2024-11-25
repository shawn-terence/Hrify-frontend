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
        <div className="flex flex-col">
            <Image id="Logo" width={80}  radius="full" src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'/>
        </div>
        <div id="linkbox" className="text-base"> 
          <Spacer y={4}/>
              <Spacer y={2}/>
            <Link to="/adm/admhome">
              <p className="text-base">Home</p>
            </Link>
            <Spacer y={2}/> 
            <Link to="/adm/attendance">
              <p className="text-base">Attendance</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/leave">
              <p className="text-base">Leave Requests</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/reports">
              <p className="text-base">My Reports</p>
            </Link>
            <Spacer y={4}/>
            <Spacer y={2} />
            <Link to="/adm/users">
              <p className="mb-4 text-base">Employees</p>
            </Link>
            <Link to="/adm/adduser">
              <p className="mb-4 text-base">Add Employee</p>
            </Link>
            <Link to='/adm/projects'>
              <p className="mb-4 text-base">Projects</p>
            </Link>
            <Link to="/adm/leaves">
              <p className="mb-4 text-base">Leaves</p>
            </Link>
            <Link to="/adm/report">
              <p className="mb-4 text-base">View Reports</p>
            </Link>
            <Link to="/adm/attendancepage">
              <p className="mb-4 text-base">Attendances</p>
            </Link>
        </div>
          </div>
          <Spacer y={6}/>
        <div id="side-footer" className="flex flex-col gap-8">
            <Link to="/adm/profile" className="pr-2">
                <Image width={48} src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"/>
            </Link>
            <Link to="/">
            <Image width={48} src="https://cdn0.iconfinder.com/data/icons/simpline-mix/64/simpline_43-256.png"/>
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
              <p className="text-base">Home</p>
            </Link>
            <Spacer y={2}/> 
            <Link to="/adm/attendance">
              <p className="mb-2 text-base">Attendance</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/leave">
              <p className="mb-2 text-base">Leave Requests</p>
            </Link>
            <Spacer y={2}/>
            <Link to="/adm/reports">
              <p className="mb-2 text-base">My Reports</p>
            </Link>
            <Spacer y={4}/>
            <Spacer y={2} />
            <Link to="/adm/users">
              <p className="mb-2 text-base">Employees</p>
            </Link>
            <Link to="/adm/adduser">
              <p className="mb-2 text-base">Add Employee</p>
            </Link>
            <Link to='/adm/projects'>
              <p className="mb-2 text-base">Projects</p>
            </Link>
            <Link to="/adm/leaves">
              <p className="mb-2 text-base">Leaves</p>
            </Link>
            <Link to="/adm/report">
              <p className="mb-2 text-base">View Reports</p>
            </Link>
            <Link to="/adm/attendancepage">
              <p className="mb-2 text-base">Attendances</p>
            </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbaradm;
