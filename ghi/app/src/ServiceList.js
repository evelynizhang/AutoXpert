import React, { useState, useEffect } from "react";


function ServiceList() {
  const[services, setServices] = useState([])
  const[service, setService] = useState([])

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



    const[vins, setVins] = useState([])

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


    const handleCencel = async event => {
      const serviceid = event.target.value
      console.log(serviceid)
      // console.log(services)
      // const filterService = services.filter(app => app.id == serviceid)
      // console.log(filterService)
      // filterService[0].status = "Canceled"
      // setServices(filterService)
      const url = "http://localhost:8080/api/appointments/${serviceid}/cancel/"

      const fetchConfig = {
        method : "PUT",
        body : JSON.stringify({'status': "Canceled"}),
        headers : {
            "Content-Type" : 'application/json',
        }
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok){
      setServices(response.json())
    }
    }

    // const submitHandler = async event => {
    //   const url = "http://localhost:8080/api/appointments/${serviceid}/cancel/"

    //   const fetchConfig = {
    //     method : "PUT",
    //     body : JSON.stringify({'status': "Canceled"}),
    //     headers : {
    //         "Content-Type" : 'application/json',
    //     }
    // }
    // const response = await fetch(url, fetchConfig);
    // if (response.ok){

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
                <button onClick={handleCencel} value={service.id} >Cancel</button><button>Finish</button>
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
