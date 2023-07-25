import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from "./TechnicianList"
import TechnicianForm from "./TechnicianForm"
import ServiceForm from "./ServiceForm"
import ServiceList from "./ServiceList"
import VinList from "./VinForm"

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
          <Route path="technicians/create">
            <Route index element={<TechnicianForm />} />
          </Route>
          <Route path="appointments/create">
            <Route index element={<ServiceForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<ServiceList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
