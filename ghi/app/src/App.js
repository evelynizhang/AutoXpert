import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from "./TechnicianList"
import TechnicianForm from "./TechnicianForm"
import ServiceForm from "./ServiceForm"
import ServiceList from "./ServiceList"
import VinList from "./VinForm"
import ManufacturerList from "./ManufacturerList"
import ManufacturerForm from "./ManufacturerForm"
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import CustomerList from './CustomersList';
import CustomerForm from './CustomerForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
          </Route>
          <Route path="vins">
            <Route index element={<VinList />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
          </Route>
          <Route path="manufacturers/create">
            <Route index element={<ManufacturerForm />} />
          </Route>
          <Route path="technicians/create">
            <Route index element={<TechnicianForm />} />
          </Route>
          <Route path="appointments/create">
            <Route index element={<ServiceForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<ServiceList />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path='new' element={<SalespersonForm />}  />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path='new' element={<CustomerForm />}  />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
