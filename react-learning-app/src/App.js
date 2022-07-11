import React from 'react';
import './App.css';
import BasicFeatures from './components/es6-features/BasicFeatures';
import VariableDeclaration from './components/VariableDeclaration';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>hello</h1>
      <VariableDeclaration />
       <BasicFeatures />
      </header>
    </div>
  );
}

export default App;
