import React, { useState, useEffect } from "react";


function ServiceHistoryList() {
  const[services, setServices] = useState([])
  const[service, setService] = useState([])
  const[vins, setVins] = useState([])


  const getServices = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      setServices(data.appointments)
    }
  }

  useEffect(() => {
    getServices()
  }, [])


    const getVins = async () => {
      const url = 'http://localhost:8100/api/automobiles/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setVins(data.autos.map(auto => {return (auto.vin)}))
      }
    }
    useEffect(() => {
      getVins();
    }, []);


    const VIP = []
    for (let service of services) {
      if (vins.includes(service.vin)){
      VIP.push("Yes")}
      else {
        VIP.push("No")
      }
    }

    for (let i = 0; i < services.length;i++){
      services[i]["vip"] = VIP[i]
    }

    const handleCencel = event => {
      const serviceId = event.target.id
      let service = services.filter(app => app.id = serviceId)
      console.log(service)
      setService(service)
    }

  return (
    <React.Fragment>
      <h1>Service History</h1>
      <table className="table table-striped" >
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            return (
              <tr key={service.id}>
                <td>{ service.vin }</td>
                <td>{ service.vip}</td>
                <td>{ service.customer }</td>
                <td>{ service.date }</td>
                <td>{ service.time }</td>
                <td>{ service.technician.employee_id } </td>
                <td>{ service.reason }</td>
                <td>{ service.status }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default ServiceHistoryList;
