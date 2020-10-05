import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import Chart from './Chart';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: 'http://localhost:4008/graphql' }),
  });
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <header className='App-header'>
          <Chart granularity='year'></Chart>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
