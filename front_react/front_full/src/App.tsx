import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import ClientProvider from './Context/ClientContext';
import RegisterProvider from './Context/RegisterContext';
import AuthProvider from './Context/LoginContext';
import { MainRoutes } from './routes';


import './App.css';

function App() {
  return (
    <div className="App">
      <RegisterProvider>
        <AuthProvider>
            <ClientProvider>
              <GlobalStyle/>
              <MainRoutes/>
            </ClientProvider>
        </AuthProvider>
      </RegisterProvider>
    </div>
  );
}

export default App;
