import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/layouts/NotFound/Error';
import AdminDashboard from './container/Admin/Dashboard';
import CompanyList from './container/CompanyList';
import Login from './container/Login';
import Signup from './container/SignupPage';
import PrivateRoutes from './routes/PrivateRoute';

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route exact element={<PrivateRoutes />}>
        <Route path='/signup' element={<Signup />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/lists/companies' element={<CompanyList />} />
        </Route>
        <Route path='/page' element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
