import React, {useState, useEffect} from 'react';


function ServiceForm() {
  const [technicians, setTechnicians] = useState([])
  const [formData, setFormData] = useState({
    vin: '',
    customer: '',
    date:'',
    time:'',
    technician:'',
    reason:'',
  })

  const getTechnicians = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    getTechnicians();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceUrl = 'http://localhost:8080/api/appointments/'

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response1 = await fetch(serviceUrl, fetchConfig);

    if (response1.ok) {
      setFormData({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician:'',
        reason:'',
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
        <div className='form-image automobile-form'>
            <p>image</p>
        </div>
        <div className="shadow p-4 mt-4 myform">
          <h1>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="Automobile VIN" required type="text" name="vin" id="vin" className="form-control" />
            </div>
            <div className="mb-3">
              <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
            </div>
            <div className="mb-3">
              <input onChange={handleFormChange} value={formData.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
            </div>
            <div className="mb-3">
              <input onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Choose a technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.id} value={technician.employee_id}>{technician.first_name} {technician.last_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
