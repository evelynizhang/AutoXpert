import React, { useState, useEffect } from "react";


function ServiceList() {
  const[services, setServices] = useState([])
  const[vins, setVins] = useState([])


  const getData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const app = data.appointments.filter(appointment => appointment.status === "Created")
      setServices(app)
    }
  }

  useEffect(() => {
    getData()
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


    const handleCancel = (serviceId) => {
      fetch(`http://localhost:8080/api/appointments/${serviceId}/cancel/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Canceled" }),
      })
      .then((response) => {
        // If the update is successful, update the frontend state accordingly
        const updatedServices = services.map((service) => {
          if (service.id === serviceId) {
            return { ...service, status: "Canceled" };
          }
          return service;
        });

        setServices(updatedServices);
        window.location.reload();
      })
    }

    const handleFinish = (serviceId) => {
      fetch(`http://localhost:8080/api/appointments/${serviceId}/finish/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Finished" }),
      })
      .then((response) => {
        // If the update is successful, update the frontend state accordingly
        const updatedServices = services.map((service) => {
          if (service.id === serviceId) {
            return { ...service, status: "Finished" };
          }
          return service;
        });

        setServices(updatedServices);
        window.location.reload();
      })
    }


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
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            return (
              <tr key={service.id} >
                <td>{ service.vin }</td>
                <td>{ service.vip}</td>
                <td>{ service.customer }</td>
                <td>{ service.date }</td>
                <td>{ service.time }</td>
                <td>{ service.technician.employee_id } </td>
                <td>{ service.reason }</td>
                <td>
                <button onClick={() => handleCancel(service.id)} className="btn btn-success" >Cancel</button><button onClick={() => handleFinish(service.id)} className="btn btn-danger">Finish</button>
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
