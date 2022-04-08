import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import { useSelector, useDispatch } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import {logout} from '../../../Actions/userActions'
import User_Icon from '../../../Images/User_Icon.png'


const UserOptions = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  
  const actions = [
   
    { icon: <PersonIcon />, name: 'PROFILE', func: account },
    { icon: <ListAltIcon />, name: 'ORDERS', func: orders },
    { icon: <ExitToAppIcon />, name: 'LOGOUT', func: logOutUser },
  ];

  if(user.role === "admin"){
    actions.unshift( { icon: <DashboardIcon />, name: 'DASHBOARD', func: dashboard });
  }

  function account(){
    history('/account');
  }
  function orders(){
    history('/orders');
  }
  function logOutUser(){
    dispatch(logout())
    history('/login');
    alert.success("Logged out successfully");
  }
  function dashboard(){
    history('/dashboard');
  }

  return ( 
    <>
      <div>
        <SpeedDial ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', top: 25, right: 25 }}
          onOpen={() => { setOpen(true) }}
          onClose={() => { setOpen(false) }}
          open={open}
          direction="down"
          className=''
          icon={<img className='speedDial' src={user.avatar.url ? user.avatar.url : '/User_Icon.png'} alt="Your Profile" />}
        >

          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
        </SpeedDial>
      </div>
    </>
  )
}

export default UserOptions