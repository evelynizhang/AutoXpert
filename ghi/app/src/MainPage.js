import React, {useEffect, useState} from 'react';
import "./index.css"

const GrabAutomobiles = () => {
  const[automobiles, setAutomobiles] = useState([]);

    const fetchAutomobiles = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        try {
            const response = await fetch(automobilesUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                const unsoldAutos = data.autos.filter(auto => (auto.sold === false));
                const randomize = unsoldAutos.sort((a, b) => 0.5 - Math.random());
                setAutomobiles(randomize);
            }
        } catch(e) {
            console.log(e, "There was a problem fetching automobiles")
        }
    }

    useEffect( () => {
        fetchAutomobiles();
    },[]);

    return (
      <>
      <div className='inventory-container container text-center'>
        <h3>Inventory at a glance</h3>
        <div className='row'>
        {automobiles.slice(0,4).map(automobile => {
          return (
            <div className='col' key={automobile.id}>
              <img className='automobile-img' src={automobile.model.picture_url} />
              <p>{automobile.year} {automobile.model.manufacturer.name} {automobile.model.name}</p>
            </div>
          )
        })}
        </div>
        <div className='row'>
        {automobiles.slice(4,7).map(automobile => {
          return (
            <div className='col' key={automobile.id}>
              <img className='automobile-img' src={automobile.model.picture_url} />
              <p>{automobile.year} {automobile.model.manufacturer.name} {automobile.model.name}</p>
            </div>
          )
        })}
        </div>
        </div>
      </>
    )
}

const GrabSales = () => {
  const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/'

        try {
            const response = await fetch(salesUrl)
            if(!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setSales(data.sales);
            }
        }
        catch(e) {
            console.error(e, "There was a problem fetching sales")
        }
    }

    useEffect( () => {
        fetchSales();
    },[]);

    return (
      <div>
        <h5>Completed Sales</h5>
        <h2>{sales.length}</h2>
      </div>
    )

}

const RenderService = () => {
    const[services, setServices] = useState([]);

    const fetchServices = async () => {
      const appointmentsUrl = "http://localhost:8080/api/appointments/";
      const response = await fetch(appointmentsUrl);

      if (response.ok) {
        const data = await response.json()
        const createdStatus = data.appointments.filter(appointment => appointment.status === "Created")
        const ordered = createdStatus.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })

        setServices(ordered);
      }
  }

  useEffect(() => {
    fetchServices();
  },[])

  return (
    <>
    <div className='table-container'>
      <h3>Upcoming Service Appointments</h3>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
          {services.slice(0,5).map(service => {
            return (
              <tr key={service.id} >
                <td>{ service.customer }</td>
                <td>{ service.date }</td>
                <td>{ service.time }</td>
                <td>{ service.reason }</td>
                <td>{ service.technician.employee_id } </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className='counter-container'>
      <div>
        <h5>Service Appointments</h5>
        <h3>{services.length}</h3>
      </div>
      <GrabSales />
    </div>
    </>
  )
}


function MainPage() {
  return (
    <>
    <div className="px-4 py-0 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
    </div>
    <div className='bottom-container'>
      <RenderService />
    </div>
    <div>
      <GrabAutomobiles />
    </div>
    </>
  );
}

export default MainPage;
