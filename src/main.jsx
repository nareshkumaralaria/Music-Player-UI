import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the necessary Apollo Client components
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// Create a new Apollo Client instance with the API endpoint and cache settings
const Client = new ApolloClient({
  uri: 'https://api.ss.dev/resource/api',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component in the ApolloProvider component
  // to provide the Apollo Client instance to all child components
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
