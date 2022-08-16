import React, {useState} from 'react';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Navbar from './components/Navbar.jsx';
import ExploreSearch from './components/pages/ExploreSearch'
import Explore from './components/pages/Explore'
import MyChecklist from './components/pages/MyChecklist';
import UserProfile from './components/pages/UserProfile';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import useToken from './components/useToken';

function App() {

  const { token, setToken } = useToken();
  if(!token){
    return(
      <div className = "App">
        <Router>
        <Navbar user = {false} />
        <Routes>
          <Route exact path = "/" element = {<Home />}/>
          <Route exact path = "/SignUp" element = {<SignUp setToken = {setToken}/>}/>
          <Route exact path = "/Login" element = {<Login setToken = {setToken} />} />
          <Route exact path = {`/MyChecklist`} element = {<SignUp/>}/>
          <Route exact path = {`/Explore`} element = {<Explore />}>
            <Route exact path = {`:word_count`} element = {<Explore />}/>
            <Route exact path = {`:word_count/:age_range`} element = {<Explore />}/>
            </Route>
          <Route exact path = "/ExploreSearch" element = {<ExploreSearch />}/>
          </Routes>
          </Router>
      </div>
    )
  }
  return (
    <div className="App">
      <Router>
        <Navbar user = {true}/>
        <Routes>
          <Route exact path = "/" element = {<Home />}/>
          <Route exact path = {`/MyChecklist`} element = {<MyChecklist />}/>
          <Route exact path = {`/Explore`} element = {<Explore />}>
            <Route exact path = {`:word_count`} element = {<Explore />}/>
            <Route exact path = {`:word_count/:age_range`} element = {<Explore />}/>
            </Route>
          <Route exact path = "/ExploreSearch" element = {<ExploreSearch />}/>
          <Route exact path = {`/UserProfile`} element = {<UserProfile />}>
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
