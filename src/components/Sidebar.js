import React from 'react'
import { NavLink } from 'react-router-dom';
import {FaNewspaper, FaBars, FaCalendar} from 'react-icons/fa';
import '../App.css'

const Sidebar = ({children}) => {
    const menuItem=[
        {
            name: 'News',
            url: '/news',
            icon: <FaNewspaper />,
          },
          {
            name: "Events",
            url: "/events",
            icon: <FaCalendar />,
          },
    ]
  return (
    <div className="sideContainer">
     <div className='sidebar'>
     <div className='top_section'>
        <h1 className='logo'>Logo</h1>
        <div className='bars'>
           <FaBars />
        </div>
     </div>

        {menuItem.map((item,index) => (

            <NavLink to={item.url} key={index} className='nav' activeclassname="active">
                <div className='icon'>{item.icon}</div>
                <div className='link_text'>{item.name}</div>
            </NavLink>
        ))
        }
        </div>
        <main className='main'>{children}</main>
    </div>
    
  );
}

export default Sidebar;
