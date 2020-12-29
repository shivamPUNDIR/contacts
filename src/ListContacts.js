import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
class ListContacts extends Component {
    static propTypes={
        contacts:PropTypes.array.isRequired,
        onDeleteContact:PropTypes.func.isRequired,
    }
    state={
        query:''
    }
    handler=(query)=>{
        this.setState((currState)=>{
            return {
                query:query.trim()
            }
        })
    }
    clearQuery=()=>{
        this.handler('');
    }
    render() {
        const {query}=this.state;
        const {contacts,onDeleteContact}=this.props;

        const showContacts= query===''?contacts:contacts.filter((c)=>{
            return c.name.toLowerCase().includes(query.toLowerCase())
        });
        const curr=showContacts.length;
        const all=contacts.length;
        // console.log(this.props)
       
        return (
            <div className='list-contacts'>
                {/* { JSON.stringify(showContacts) } */}
                <div className='list-contacts-top'>
                    <input className='search-contacts' type='text' placeholder='Search-Contacts' value={query} onChange={(event)=>{this.handler(event.target.value)}}></input>
                    <Link to='/create' className='add-contact'></Link>
                    {/*  onClick={()=>{onNavigate()}} */}
                </div>
                {
                    curr!== all &&(
                        <div className='showing-contacts'>
                            <span>Now showing {curr} out of {all} contacts.<button onClick={()=>this.clearQuery()}>Show All.</button></span>
                        </div>
                    )
                }
                <ol className='contact-list'>
                {showContacts.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={
                            {
                                backgroundImage: `url(${contact.avatarURL})`
                            }
                        }>

                        </div>
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.handle}</p>
                        </div>
                        <button className='contact-remove' onClick={()=>{
                            onDeleteContact(contact);
                        }}>

                        </button>
                    </li>
                ))}
            </ol>
            </div>
        )
    }
   
}

//Stateless Functional Component
// function ListContacts(props){
//     return(
//         <ol className='contact-list'>
//              {props.contacts.map((contact)=>(
//                  <li key={contact.id} className='contact-list-item'>
//                      <div className='contact-avatar' style={
//                          {
//                              backgroundImage:`url(${contact.avatarURL})`
//                          }
//                         }>

//                      </div>
//                      <div className='contact-details'>
//                          <p>{contact.name}</p>
//                          <p>{contact.handle}</p> 
//                      </div>
//                      <button className='contact-remove'>

//                      </button>
//                  </li>
//              ))}
//         </ol>
//     )
// }
export default ListContacts