import React from 'react';
import ToDo from './ToDo';

class App extends React.Component {
  render() {
    return (
      <div className={'todo'}>
        <h1>TO-DO</h1>
        <ToDo />
      </div>
    )
  }
}

export default App;