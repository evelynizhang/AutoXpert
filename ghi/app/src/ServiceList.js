import React, { useState, useEffect } from "react";


function ServiceList() {
  const[services, setServices] = useState([])

  const getData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setServices(data.appointments)
    }
  }

  useEffect(() => {
    getData()
  }, [])



    const[vins, setVins] = useState([])

    const getVins = async () => {
      const url = 'http://localhost:8100/api/automobiles/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setVins(data.autos.map(auto => {return (auto.vin)}))
      }
    }
console.log(vins)
    useEffect(() => {
      getVins();
    }, []);


  // function Finish(id) {
  //   const service = services.filter(service => service.id === id)
  //   service.status = "finish"
  //   setService(service)
  // }

  return (
    <React.Fragment>
      <h1>Service Appointments</h1>
      <table className="table table-striped" >
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            {/* <th>Time</th> */}
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            return (
              <tr key={service.id}>
                <td>{ service.vin }</td>
                <td>{ vins.includes(service.vin) }</td>
                <td>{ service.customer }</td>
                <td>{ service.date }</td>
                {/* <td>{ service.time }</td> */}
                <td>{ service.technician.employee_id } </td>
                <td>{ service.reason }</td>
                <td>
                  <button>Cancel</button><button>Finish</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default ServiceList;
