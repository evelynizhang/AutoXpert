import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/manufacturers/">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/manufacturers/create">Create a Manufacturers</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/technicians">Technicians</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/technicians/create">Add a Technician</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/appointments/create">Create a Service Appointment</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/appointments/">Service Appointment</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
