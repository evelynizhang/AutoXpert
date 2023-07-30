import React, { useState, useEffect } from "react";


function TechnicianList() {
  const[technicians, setTechnicians] = useState([])

  const getData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setTechnicians(data.technicians)
    }
  }

  useEffect(() => {
    getData()
  }, [])



  return (
    <React.Fragment>
      {/* <h1>Technicians</h1>
      <table className="table table-striped" >
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
              <tr key={technician.id}>
                <td>{ technician.employee_id }</td>
                <td>{ technician.first_name }</td>
                <td>{ technician.last_name }</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <h1>Technicians</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          {technicians.map(technician => {
              return (
          <div key={technician.id} className="card">
              <img src={technician.picture_url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{technician.first_name} {technician.last_name}</h5>
                <p className="card-text">Add some text later</p>
              </div>
          </div>
              )})}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TechnicianList;
