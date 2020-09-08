import React from 'react'
import {
    Button
} from 'react-bootstrap'

class CreateBookingButton extends React.Component {
    render() {
        return (
            <div className="text-center mt-4 w-100">
                <Button variant="success" type="submit" onClick={() => this.props.setForm(1)}>
                    <h3 className="m-0">
                        Create booking
                </h3>
                </Button>
            </div>
        )
    }
}

export default CreateBookingButton