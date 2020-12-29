import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsApi from '../src/utils/ContactsAPI';
import {Route} from 'react-router-dom'; 

class App extends Component {
  state = {

    contacts: [],
  }
  componentDidMount(){
    ContactsApi.getAll().then((contacts)=>{
      this.setState((currState)=>{
          return  {contacts}
      })
    })
  }

  removeContact = (contact) => {
    this.setState((currState)=>{
      return{contacts : currState.contacts.filter((c)=>{
          return c.id!==contact.id;
      })} 
    })
    ContactsApi.remove(contact)
  }
  // changeScreen=()=>{
  //   this.setState((c)=>{
  //       return {screen: c.screen == 'list' ? 'create':'list'}
  //   })
  // }
  CreateContact=(values)=>{
    ContactsApi.create(values).then((contact)=>{
      this.setState((c)=>{
        return { contacts:c.contacts.concat([contact])}
      })
    })
  }
  render() {
    return ( 
      <div>
        
        <Route exact path='/' render={()=>(<ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact}></ListContacts>)} />
        <Route path='/create' render={({history})=>(<CreateContact onCreateContact={(contact)=>{this.CreateContact(contact);history.push('/')}}></CreateContact>)}/>
      </div>
    );
  }
}

export default App;
