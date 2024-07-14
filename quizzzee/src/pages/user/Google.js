import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Google() {
    const navi = useNavigate();
    const { login } = useContext(UserContext);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = params.get('user');
    login(user, token, true);
    navi("/");
  return (
    <div>Loading...</div>
  )
}

export default Google