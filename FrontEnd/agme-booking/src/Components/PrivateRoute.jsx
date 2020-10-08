import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// from: https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
export const PrivateRoute = ({ component: Component, userType: userType, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = localStorage.user;
        if (!currentUser || currentUser.account_type !== userType) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/' }} />
        }
        if (currentUser.account_type === userType) {
            return <Component {...props} />
        }
    }} />
)