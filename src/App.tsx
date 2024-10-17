import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';

const HomePage: React.FC = () => (
  <div>
      <h1>Välkommen till min app!</h1>
      <p>Detta är startsidan.</p>
  </div>
);

const App: React.FC = () => {
  return (
      <Router>
          <div>
              <NavBar />
              <Routes>
                  <Route path="/users" element={<UserList />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/" element={<HomePage />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App