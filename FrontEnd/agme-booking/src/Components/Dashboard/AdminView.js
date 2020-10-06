import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import BusinessCard from './Admin/Business/BusinessCard';


function AdminView() {
    return (
        <div className="header-spacer container dashboard py-2">
            <Router>
                <Switch>
                    <Route exact path="/admin">
                        <div>
                            <h1 className="text-center">Your businesses at a glance</h1>
                            <div>
                                <div className="row text-center d.flex justify-content-center mt-4">
                                    <BusinessCard/>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default AdminView