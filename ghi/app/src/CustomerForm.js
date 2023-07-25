import React, {useEffect, useState} from 'react';

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
    })

    const handleFormChange = event => {
        const value = event.target.value;
        const useStateVariable = event.target.name;
        setFormData({
            ...formData,
            [useStateVariable]: value
        });
    }

    const submitHandler = async event => {
        event.preventDefault();

        const customersUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers : {
                "Content-Type" : 'application/json',
            }
        }

        const response = await fetch(customersUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                address: '',
                phone_number: '',
            });
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form onSubmit={submitHandler} id="create-customer-form">
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="First name..." required type="text" name="first_name" id="first_name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="Last name..." required type="text" name="last_name" id="last_name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.address}placeholder="Address..." required type="text" name="address" id="address" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.phone_number}placeholder="Phone number..." required type="text" name="phone_number" id="phone_number" className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
    )
}

export default CustomerForm;
