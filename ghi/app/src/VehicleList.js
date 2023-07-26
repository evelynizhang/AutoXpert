import React, { useState, useEffect } from "react";


function VehicleList() {
  const[models, setModels] = useState([])

  const getData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setModels(data.models)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <React.Fragment>
      <h1>Vehicle Models</h1>
      <table className="table table-striped" >
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={model.href}>
                <td>{ model.name}</td>
                <td>{ model.manufacturer.name }</td>
                <td><img src={ model.picture_url} className="card-img-top" alt="shoe" width="10" height="200" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default VehicleList;
