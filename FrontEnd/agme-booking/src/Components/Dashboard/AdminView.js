import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import BusinessCard from './Admin/Business/BusinessCard';


function AdminView() {

    const [business, setBusiness] = useState("")

    useEffect(() => {
        axios({
            method: "GET",
            url: 'http://localhost:8080/api/users/' + JSON.parse(localStorage.user).id,
            headers: {},
        }).then(function (response) {
            setBusiness(<BusinessCard business={response.data.business} />);
        });
    }, []);

    return (
        <div className="header-spacer container dashboard py-2">
            <Router>
                <Switch>
                    <Route exact path="/admin">
                        <div>
                            <h1 className="text-center">Your businesses at a glance</h1>
                            <div>
                                <div className="row text-center d.flex justify-content-center mt-4">
                                    {business}
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