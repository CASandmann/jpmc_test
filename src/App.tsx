import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Table, { Data } from './Table';
import data from './sampleData.json';

/**
 * The entry point of our application
 */
function App() {
  const [fetchedData, setFetchedData] = useState<Data[]>([]);

  useEffect(() => {
    // Simulate the fetching of data
    window.setTimeout(() => {
      setFetchedData(data);
    }, 1000);
  }, [])

  return (
    <div className="App">
      <Table data={fetchedData} />
    </div>
  );
}

export default App;
