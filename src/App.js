import React, { useEffect } from 'react';
import './App.css';
import Header from './components/AppHeader/Header';
import ContactDetail from './components/ContactDetail/ContactDetail';
import Contacts from './components/Contacts/AppHeader';
import { getUsers, setUsers } from './redux/mainReducer';
import { Route } from 'react-router-dom'; 
import { connect } from 'react-redux'; 

const App = React.memo(({ setUsers, getUsers, users }) => {   
    localStorage.getItem('favorites') == null && localStorage.setItem('favorites', JSON.stringify([]))

    useEffect(() => {
        let contacts = JSON.parse(localStorage.getItem('contacts'));
        contacts ? setUsers(contacts) : getUsers()
    }, [setUsers, getUsers]) 

    return (
        <div className="App">
            <Header />
            <div className="main">
                <div className="wrapper">
                    <Route exact path='/' render={ () => <Contacts users={ users }/> } />
                    <Route path='/contact/:userId' render={ () => <ContactDetail /> } />
                </div>
            </div>
        </div>
  );
})

const mstp = (state) => ({
    users: state.usersData.users,
    favorites: state.usersData.favorites
})

export default connect(mstp, { getUsers, setUsers })(App);
