import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import StockContext from './context/StockContext';
import ThemeContext from './context/ThemeContext';

function App() {
  
  return (
    <ThemeContext>
      <StockContext>
        <Dashboard/>
      </StockContext>
    </ThemeContext>
    );
}

export default App;
