import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import '@aws-amplify/ui-react/styles.css';

import { fetchAuthSession } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';

import NavigationBar from './components/NavigationBar';
import Gallery from './components/Gallery';
import ServiceRequestForm from './components/ServiceRequestForm';
import ServiceRequestList from './components/ServiceRequestList';

Amplify.configure(awsExports);

// Main App component: sets up auth, fetches service requests, and displays the dashboard.
function App({ signOut, user }) {
  const [requests, setRequests] = useState([]);

  async function fetchRequests() {
    try {
      const { generateClient } = await import('aws-amplify/api');
      const client = generateClient({ authMode: 'userPool' });
      const { listServiceRequests } = await import('./graphql/queries');

      const res = await client.graphql({
        query: listServiceRequests,
      });
      const items = res.data?.listServiceRequests?.items || [];
      setRequests(items);
    } catch (err) {
      console.error('Error fetching requests in App:', err);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  // Check authentication session.
  useEffect(() => {
    async function checkSession() {
      try {
        const session = await fetchAuthSession();
        console.log('fetchAuthSession() =>', session);
      } catch (err) {
        console.error('No valid session =>', err);
      }
    }
    checkSession();
  }, [user]);

  // Callback: refresh list when a new service request is submitted.
  const handleCreateSuccess = () => {
    fetchRequests();
  };

  const appStyle = {
    background: 'url("res/background_img.jpg") center center / cover no-repeat fixed',
    minHeight: '100vh'
  };

  const mainStyle = {
    width: '90%',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  };

  return (
    <div style={appStyle}>
      <NavigationBar signOut={signOut} user={user} />
      <main style={mainStyle}>
        <section style={{ margin: '20px 0' }}>
          <h2 style={{ marginBottom: '10px' }}>Static Content from S3</h2>
          <Gallery />
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '10px' }}>Service Request Portal</h2>
          <ServiceRequestForm onCreateSuccess={handleCreateSuccess} />
          <ServiceRequestList requests={requests} />
        </section>
      </main>
    </div>
  );
}

export default withAuthenticator(App);
