import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api'; 
import { createServiceRequest } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

// Form to submit new service requests.
const client = generateClient({ authMode: 'userPool' });

function ServiceRequestForm({ onCreateSuccess }) {
  const [formData, setFormData] = useState({
    serviceRequestName: '',
    serviceRequestDescription: '',
    creationDate: '',
    severity: 'Low',
    reporterName: '',
    contactInformation: '',
    location: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    // Validate required fields.
    const required = [
      'serviceRequestName',
      'serviceRequestDescription',
      'creationDate',
      'severity',
      'reporterName',
      'contactInformation',
      'location',
    ];
    for (let r of required) {
      if (!formData[r]) {
        setErrorMessage(`Please fill out ${r} before submitting.`);
        return;
      }
    }

    // Determine resolution date based on severity.
    let daysToAdd = 5;
    if (formData.severity === 'Medium') daysToAdd = 3;
    if (formData.severity === 'High') daysToAdd = 1;

    const resolutionDate = dayjs(formData.creationDate, 'YYYY-MM-DD')
      .add(daysToAdd, 'day')
      .format('YYYY-MM-DD');

    const caseNumber = uuidv4();

    const input = {
      caseNumber,
      serviceRequestName: formData.serviceRequestName,
      serviceRequestDescription: formData.serviceRequestDescription,
      creationDate: formData.creationDate,
      severity: formData.severity,
      resolutionDate,
      reporterName: formData.reporterName,
      contactInformation: formData.contactInformation,
      location: formData.location,
    };

    try {
      await client.graphql({
        query: createServiceRequest,
        variables: { input },
      });
      setFormData({
        serviceRequestName: '',
        serviceRequestDescription: '',
        creationDate: '',
        severity: 'Low',
        reporterName: '',
        contactInformation: '',
        location: '',
      });
      alert('Service request submitted successfully!');

      // Refresh parent list after successful submission.
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (err) {
      console.error('Error creating service request:', err);
      setErrorMessage('Submission failed. Check console.');
    }
  };

  const outerWrapper = {
    width: '80%',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '20px'
  };

  const containerStyle = {
    border: '1px solid #E3FDF7',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#444'
  };

  const inputStyle = {
    width: '98%',
    marginBottom: '16px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '14px'
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#FFD3B4',
    color: '#333',
    border: '1px solid #FFC7A2',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={outerWrapper}>
      <div style={containerStyle}>
        <h3 style={{ marginBottom: '16px', color: '#444' }}>Create a New Service Request</h3>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridGap: '8px' }}>
          <div>
            <label style={labelStyle}>Service Request Name (*):</label>
            <input
              type="text"
              name="serviceRequestName"
              value={formData.serviceRequestName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Service Request Description (*):</label>
            <textarea
              name="serviceRequestDescription"
              rows="4"
              value={formData.serviceRequestDescription}
              onChange={handleChange}
              style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={labelStyle}>Creation Date (YYYY-MM-DD) (*):</label>
            <input
              type="date"
              name="creationDate"
              value={formData.creationDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Severity (*):</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Reporter Name (*):</label>
            <input
              type="text"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact Information (Email) (*):</label>
            <input
              type="email"
              name="contactInformation"
              value={formData.contactInformation}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Location (*):</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={e => e.target.style.backgroundColor = '#FFC7A2'}
            onMouseOut={e => e.target.style.backgroundColor = '#FFD3B4'}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceRequestForm;
