import React, { useState, useEffect } from "react";


function VehicleList() {
  const[automobiles, setAutomobiles] = useState([])

  const getData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setAutomobiles(data.autos)
    }
  }
  console.log(automobiles)

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
          {automobiles.map(automobile => {
            return (
              <tr key={automobile.href}>
                <td>{ automobile.model.name}</td>
                <td>{ automobile.model.manufacturer.name }</td>
                <td><img src={ automobile.model.picture_url} className="card-img-top" alt="shoe" width="10" height="200" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default VehicleList;
