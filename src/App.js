import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Chat from './Pages/Chat/Chat';
import Navigation from "./Components/Navigation/Navigation";
import { useSelector } from "react-redux";
import LoginAlert from './Pages/LoginAlert/LoginAlert';
import { useState } from 'react';
import { AppContext, socket } from "./Context/appContext";
import Slide from 'react-reveal/Slide';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
        <BrowserRouter>
          <Slide top>
            <Navigation />
          </Slide>

          <Switch>
            <Route exact path="/">
              {!user ? <Home /> : <Redirect to='/chats' />}
            </Route>

            <Route exact path="/chats">
              {user ? <Chat /> : <LoginAlert />}
            </Route>

            {!user && (
              <>
                <Route exact path="/login">
                  <Login />
                </Route>

                <Route exact path="/signup">
                  <Signup />
                </Route>
              </>
            )}
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div >
  );
}

export default App;
