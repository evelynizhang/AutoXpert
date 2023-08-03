import React, {useEffect, useState} from 'react';
import './forms.css'

const AutomobileForm = () => {
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        color: "",
        year: "",
        vin: "",
        type: "",
        mileage: "",
        dealer_price: "",
        model_id: "",
    })

    const fetchModels = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/';
        try {
            const response = await fetch(modelsUrl)
            if(!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setModels(data.models);
            }
        }
        catch(e) {
            console.error(e, "There was a problem fetching sales")
        }
    }

    useEffect( () => {
        fetchModels();
    },[]);

    const handleFormChange = event => {
        const value = event.target.value;
        const useStateVariable = event.target.name;
        setFormData({
            ...formData,
            [useStateVariable]: value
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "POST",
            body : JSON.stringify(formData),
            headers : {
                "Content-Type" : 'application/json',
            }
        }

        const response = await fetch(automobilesUrl, fetchConfig);
        if (response.ok) {
            alert("Automobile successfully added to inventory!")
            setFormData({
                color: "",
                year: "",
                vin: "",
                type: "",
                mileage: "",
                dealer_price: "",
                model_id: "",
            });
        };
    }

    return (
        <div className="row form-outer">
            <div className="offset-3 col-5 form-inner">
                <div className='form-image automobile-form'>
                    <p>image</p>
                </div>
                <div className="shadow p-4 mt-4 myform">
                <h1>Add Automobile to Inventory</h1>
                <form onSubmit={submitHandler} id="create-automobile-form">
                <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
                            <option value="">Choose a model...</option>
                            {models.map(model => {
                                return (
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.color} placeholder="Color..." required type="text" name="color" id="color" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.year} placeholder="Year..." required type="text" name="year" id="year" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.vin}placeholder="VIN..." required type="text" name="vin" id="vin" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.type} required name="type" id="type" className="form-select">
                            <option value="">Choose Car Condition...</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.mileage} placeholder="Miles..." required type="number" name="mileage" id="mileage" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.dealer_price} placeholder="Price..." required type="dealer_price" name="dealer_price" id="dealer_price" className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
    );
}

export default AutomobileForm;
