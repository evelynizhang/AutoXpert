import Dropdown from 'react-bootstrap/Dropdown';
import './nav.css'
import { NavLink } from 'react-router-dom';
import Header from './Header';


const Nav = () => {
    const carWheelUrl = process.env.PUBLIC_URL+"/car-wheel.svg"
    return (
        <>
        <div className='header-container'>
        <div className='navbar'>
        <div className='brand'>
            <img className='icon' src={carWheelUrl} />
            <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        </div>
        <div className='navbar-right'>
        <Dropdown>
        <Dropdown.Toggle className='dropdown' variant="success" id="dropdown-basic">
            Inventory
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="/manufacturers/">Manufacturers</Dropdown.Item>
            <Dropdown.Item href="/manufacturers/create/">Create Manufacturer</Dropdown.Item>
            <Dropdown.Item href="/models/">Models</Dropdown.Item>
            <Dropdown.Item href="/models/new">Create Model</Dropdown.Item>
            <Dropdown.Item href="/automobiles/">Automobiles</Dropdown.Item>
            <Dropdown.Item href="/automobiles/new">Create Automobile</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
        <Dropdown.Toggle className='dropdown' variant="success" id="dropdown-basic">
            Service
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="/technicians/">Technicians</Dropdown.Item>
            <Dropdown.Item href="/technicians/favorite">Favorite Technicians</Dropdown.Item>
            <Dropdown.Item href="/technicians/create">Add a Technician</Dropdown.Item>
            <Dropdown.Item href="/appointments/">Appointments</Dropdown.Item>
            <Dropdown.Item href="/appointments/create">Add an Appointment</Dropdown.Item>
            <Dropdown.Item href="/appointments/history">Service History</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
        <Dropdown.Toggle className='dropdown' variant="success" id="dropdown-basic">
            Sales
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="/salespeople/">Salespeople</Dropdown.Item>
            <Dropdown.Item href="/salespeople/new">Create a Salesperson</Dropdown.Item>
            <Dropdown.Item href="/customers/">Customers</Dropdown.Item>
            <Dropdown.Item href="/customers/new">Add a Customer</Dropdown.Item>
            <Dropdown.Item href="/sales/">Sales</Dropdown.Item>
            <Dropdown.Item href="/sales/new">Add a sale</Dropdown.Item>
            <Dropdown.Item href="/sales/history">Sales History</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </div>
        </div>
        {<Header />}
        </div>
        </>
    )
}

export default Nav;
