import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import Axios from 'axios'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllPeople from './AllPeople';
import Groups from './Groups';
import Group from './Group';
import Person from './Person';
import AddGroup from './AddGroup';
 

function App() {
    
    const [groupsList, setGroupsList] = useState([]);

    const getGroups = () => {
        Axios.get('http://localhost:3001/api/groups').then((response) => {
            setGroupsList(response.data);
        });
    };
    getGroups();

    return (
        <Router>
            <div className="App">
                <Navbar />
                <br />
                <div class = "container">
                    <Switch>
                        <Route exact path = "/">
                            <div className="container">
                                <h2>This is the home page</h2>
                            </div>
                        </Route>
                        <Route exact path = "/group/new">
                            <AddGroup />
                        </Route>
                        <Route exact path = "/add-person">
                            <AllPeople />
                        </Route>
                        <Route exact path = "/groups">
                            <Groups groupsList={groupsList} />
                        </Route>
                        <Route exact path = "/groups/:id">
                            <Group/>
                        </Route>
                        <Route exact path = "/persons/:id">
                            <Person groupsList={groupsList} />
                        </Route>
                    </Switch>
                </div> 
            </div>
        </Router>
    );
}

export default App;