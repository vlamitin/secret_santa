import React, { Component } from 'react';
import Header from './header';
import Form from '../containers/form';

export default class App extends Component {
  render() {
    return (
      <div className="app_container">
        <Header />
        <Form />
      </div>
    );
  }
}
