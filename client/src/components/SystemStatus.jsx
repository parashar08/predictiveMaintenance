import React from 'react';

const SystemStatus = ({ status }) => {
  if (!status) return <p>Loading system status...</p>;

  return (
    <div className="status-card">
      <h2>System Health Status</h2>
      {status?.maintenance?.map((item, index) => (
        <div
          key={index}
          className={`component ${
            item.health === 'Unhealthy' ? 'unhealthy' : 'healthy'
          }`}
        >
          <strong>{item.component}</strong>: {item.health}
        </div>
      ))}
    </div>
  );
};

export default SystemStatus;
