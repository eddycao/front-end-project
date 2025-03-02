import React from 'react';
import dayjs from 'dayjs';

// List component: renders a table of service requests.
function ServiceRequestList({ requests }) {
  if (!requests || requests.length === 0) {
    return (
      <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
        <p style={{ color: '#666' }}>No service requests found.</p>
      </div>
    );
  }

  const outerWrapper = {
    width: '80%',
    maxWidth: '1200px',
    margin: '20px auto'
  };

  const containerStyle = {
    borderRadius: '12px',
    backgroundColor: '#FFEBFF',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  };

  const thStyle = {
    backgroundColor: '#FDDFF4',
    border: '1px solid #FBCDF0',
    padding: '8px',
    textAlign: 'left',
    fontWeight: '600'
  };

  const tdStyle = {
    border: '1px solid #FBCDF0',
    padding: '8px',
    fontSize: '14px'
  };

  return (
    <div style={outerWrapper}>
      <div style={containerStyle}>
        <h3 style={{ marginBottom: '10px', color: '#444' }}>Existing Service Requests</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Case #</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Severity</th>
              <th style={thStyle}>Resolution Date</th>
              <th style={thStyle}>Reporter</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Location</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr 
                key={req.id}
                style={{ transition: 'background-color 0.2s ease' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#FFEFF7'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={tdStyle}>{req.caseNumber}</td>
                <td style={tdStyle}>{req.serviceRequestName}</td>
                <td style={tdStyle}>{req.serviceRequestDescription}</td>
                <td style={tdStyle}>
                  {req.creationDate ? dayjs(req.creationDate).format('DD/MM/YYYY') : ''}
                </td>
                <td style={tdStyle}>{req.severity}</td>
                <td style={tdStyle}>
                  {req.resolutionDate ? dayjs(req.resolutionDate).format('DD/MM/YYYY') : ''}
                </td>
                <td style={tdStyle}>{req.reporterName}</td>
                <td style={tdStyle}>{req.contactInformation}</td>
                <td style={tdStyle}>{req.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRequestList;
