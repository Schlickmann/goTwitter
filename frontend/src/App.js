import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login.js';
import Timeline from './pages/Timeline.js';

class App extends Component {
  render() {
    return (
      // {/* mostra o caminho na URL */ }
      <BrowserRouter >
      {/* garante que apenas uma rota seja chamada cada vez que o user esteja num endereço diferente */}
      < Switch >
        <Route exact path='/' component={Login} />
        <Route path='/timeline' component={Timeline} />
      </Switch >
      </BrowserRouter >
    );
  }
}

export default App;
