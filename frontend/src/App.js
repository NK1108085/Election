import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Voting from './components/Voting';
import Results from './components/Results';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vote" element={<Voting />} />
        <Route path="/results" element={<Results />} />
        
        <Route path="/ProtectedRoute" element={
          <ProtectedRoute>
            <ProtectedRoute />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
