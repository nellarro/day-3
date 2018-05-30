import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('api/oddballs').then(resp => resp.json()).then(data => {
      console.log(data)
      this.setState({contacts: data})
    })
  }

  constructor() {
    super()
    this.state = {
      contacts: []
    }
  }
  render() {
    return (
      <div className="App">
          <input
            type="text"
            name="search"
          />
          <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}

class ContactList extends Component {
  constructor() {
    super()
    this.state = {
      isActive: null
    }
  }
  clickAThing = key => {
    console.warn('clicked!', key)
    this.setState({ isActive: key })
  }
  render(){
   const mapOverContacts = dataFromBack => {
    return dataFromBack.map(contact => (
      <Contact 
        key={contact.id}
        useableKey={contact.id}
        firstName={contact.firstName}
        lastName={contact.lastName}
        street={contact.street}
        city={contact.city}
        state={contact.state}
        email={contact.email}
        onClick={this.clickAThing}
        isActive={this.state.isActive === contact.id}/>
    ))
   }
   return mapOverContacts(this.props.contacts)
  }
}

class Contact extends Component {
  handleClick = () => {
    return this.props.onClick(this.props.useableKey)
  }
  render() {
    return(
      <div onClick={this.handleClick}>
        <h2>{this.props.firstName} {this.props.lastName}</h2>
        <p>{this.props.street}</p>
        <p>{this.props.city}, {this.props.state}</p>
        <p>{this.props.email}</p>
      </div>
    )
  }
}



export default App;
