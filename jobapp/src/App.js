
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'

import JobsDetails from './Components/JobsDetails';
import FullJobDetailsWrapper from './Components/FullJobDetailsWrapper';

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsDetails />} />
        <Route path="/jobs/:id" element={<FullJobDetailsWrapper />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
