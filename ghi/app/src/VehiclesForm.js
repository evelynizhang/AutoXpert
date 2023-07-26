import React, {useEffect, useState} from 'react';

const VehicleForm = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    })

    const fetchManufacturers = async () => {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        try {
            const response = await fetch(manufacturersUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setManufacturers(data.manufacturers)
            }
        } catch(e) {
            console.log(e, "There was a problem fetching manufacturers")
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const useStateVariable = event.target.name;
        setFormData({
            ...formData,
            [useStateVariable]:value
        })
    }

    useEffect( () => {
        fetchManufacturers();
    },[]);

    const submitHandler = async (event) => {
        event.preventDefault();

        const vehicleModellUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method : "POST",
            body : JSON.stringify(formData),
            headers : {
                "Content-Type" : 'application/json',
            }
        };
        const response = await fetch(vehicleModellUrl,fetchConfig);
        if (response.ok) {
            alert("New vehicle model created");
            setFormData({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            });
        }
        };

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Vehicle Model</h1>
                <form onSubmit={submitHandler} id="create-vehicle-model-form">
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.name} placeholder="Model name..." required type="text" name="name" id="name" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL..." required type="url" name="picture_url" id="picture_url" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                            <option value="">Choose a manufacturer...</option>
                            {manufacturers.map(manufacturer => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        </>
    );
}

export default VehicleForm;
