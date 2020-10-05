import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

function AdminView() {
    return (
        <Router>
        <Switch>
            <Route exact path="/admin">
                Admin dashboard
            </Route>
        </Switch>
    </Router>
    );
}

export default AdminView