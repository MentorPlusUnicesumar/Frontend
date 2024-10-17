import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    isSignedIn: boolean,
    children: any
}

const PrivateRoute = ({ isSignedIn, children }: Props) => {


  return isSignedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
