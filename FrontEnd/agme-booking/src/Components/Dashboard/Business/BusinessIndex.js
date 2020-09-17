import React from 'react'
import axios from 'axios';
import {
    Card
} from 'react-bootstrap'

class BusinessIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: []
        }

        axios.get('http://localhost:8080/api/Business')
            .then((response) => {
                this.setState({ businesses: response.data })
            });
    }

    render() {
        var bussinessCards = [];
        this.state.businesses.forEach(element => {
            bussinessCards.push(
                <Card>
                    {element.name}
                </Card>
            )
        });
        return (
            <div id="businesses-list">
                {bussinessCards}
            </div>
        )
    }
}

export default BusinessIndex