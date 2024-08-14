import { useState } from 'react';
import { NavLink } from "react-router-dom";

import Button from '../Button/Button';
import Profile from '../Profile/Profile';
import Modal from '../Modal/Modal';
import { useUser } from '../../UserProvider';
import Popup from '../Popup/Popup';
import './Header.css';

const Header = () => {
    const tabs = [
        {
            ref: '/',
            title: 'Home'
        }, 
        {
            ref: '/contact',
            title: 'Contact'
        }, 
        {
            ref: '/about',
            title: 'About'
        }
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].title);
    const [open, setOpen] = useState(false);

    const { user, logout } = useUser();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      }; 
    return (
        <div className='header'>
          <div className='headerLeft'>
            <Profile />
            <ul className="tabs">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`${activeTab === tab.title ? 'activeTab' : ''}`}
                  onClick={() => handleTabClick(tab.title)}
                >
                  <NavLink to={tab.ref}>{tab.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className='popUp'>
              <Popup />
          </div>
          <div className='logBtn'>
            {
              user ? 
              <Button onClick={() => logout()}>Logout</Button> : 
              <Button onClick={() => setOpen(true)}>Login</Button>
            }
          </div>

          <Modal open={open} setOpen={setOpen} />
        </div>
      );
}

export default Header;
