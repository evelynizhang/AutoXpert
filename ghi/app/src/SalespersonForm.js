import React, {useEffect, useState} from 'react';

const SalespersonForm = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    const handleFormChange = (event) => {
        const value = event.target.value;
        const useStateVariable = event.target.name;
        setFormData({
            ...formData,
            [useStateVariable]: value
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers : {
                "Content-Type" : 'application/json',
            }
        };

        const response = await fetch(salespeopleUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);
            setFormData({
                first_name: "",
                last_name: "",
                employee_id: "",
            });
        }
    }

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Salesperson</h1>
                <form onSubmit={submitHandler} id="create-salesperson-form">
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="First name..." required type="text" name="first_name" id="first_name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="Last name..." required type="text" name="last_name" id="last_name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.employee_id}placeholder="Employee ID..." required type="text" name="employee_id" id="employee_id" className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default SalespersonForm
