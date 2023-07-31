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
import ServiceHistoryList from "./ServiceHistory"
import VehicleList from "./VehicleList"
import VehicleForm from './VehiclesForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import CustomerList from './CustomersList';
import CustomerForm from './CustomerForm';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import SalespersonHistory from './SalespersonHistory';
import Footer from './Footer';


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
          <Route path="models">
            <Route index element={<VehicleList />} />
            <Route path='new' element={<VehicleForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path='new' element={<AutomobileForm />} />
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
          <Route path="appointments/history">
            <Route index element={<ServiceHistoryList />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path='new' element={<SalespersonForm />}  />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path='new' element={<CustomerForm />}  />
          </Route>
          <Route path="sales">
            <Route index element={<SaleList />} />
            <Route path='new' element={<SaleForm />}  />
            <Route path='history' element={<SalespersonHistory />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
