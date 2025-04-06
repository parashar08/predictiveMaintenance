import React, { useEffect, useState } from 'react';
import SystemStatus from './components/SystemStatus';
import './styles.css';

function App() {
  const [status, setStatus] = useState(null);

  // Start Python Agent when app loads
  useEffect(() => {
    fetch('http://localhost:5000/api/start-agent')
      .then((res) => res.json())
      .then((data) => console.log('Agent started:', data.message));
  }, []);

  // Fetch predictions every 1 minute
  useEffect(() => {
    const fetchPrediction = () => {
      fetch('http://localhost:5000/api/predict/latest')
        .then((res) => res.json())
        .then((data) => setStatus(data))
        .catch((err) => console.error('Error fetching prediction:', err));
    };

    fetchPrediction(); // run once on load
    const interval = setInterval(fetchPrediction, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🛠 Predictive Maintenance Dashboard</h1>
      <SystemStatus status={status} />
    </div>
  );
}

export default App;
