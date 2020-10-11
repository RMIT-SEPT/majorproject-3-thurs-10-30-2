import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// from: https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example with a little customisation
export const PrivateRoute = ({ component: Component, userType, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = JSON.parse(localStorage.user);
        if (!currentUser || currentUser.accountType !== userType) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/' }} />
        }
        if (currentUser.accountType === userType) {
            return Component
        }
    }} />
)