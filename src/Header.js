 import React from 'react'
import "./Header.css"
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
// import logo from './tinder-com-logo.png';
import ForumIcon from '@mui/icons-material/Forum';

function Header() {
  return (
    <div className='header'>
        <IconButton>
            <PersonIcon fontSize="large" className="header-icon"/>
        </IconButton>
        <img 
        className='header__logo'
        src="./tinder-com-logo.png"
        alt=""
        />
        <IconButton>
          <ForumIcon fontSize="large" className="header-icon"/>
        </IconButton>
    </div>
  )
}

export default Header