import React, {useState} from 'react';
import './forms.css'

function ManufacturerForm() {
  const [formData, setFormData] = useState({
    name: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        name: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,

      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value
    });
  }


  return (
    <div className="row form-outer">
      <div className="offset-3 col-6 form-inner">
      <div className='form-image manufacturer-form'>
                    <p>image</p>
                </div>
        <div className="shadow p-4 mt-4 myform ">
          <h1>Add Car Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="First Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Manufacturer Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
