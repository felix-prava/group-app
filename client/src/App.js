import './App.css';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Axios from 'axios'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddPerson from './AddPerson';
import Groups from './Groups';
import Group from './Group';
import Person from './Person';
 

function App() {

    const [group, setGroup] = useState("");

    const [groupsList, setGroupsList] = useState([]);

    const addGroup = () => {
        if (group === "" || group === "Enter group name..")
            alert("You can not create a group with an empty name!");
        else{
            Axios.post('http://localhost:3001/api/groups', 
            {group: group }).then(() => {
                console.log("Group added");
            });
        }
    };

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
                            <div className="card" >
                                <h5 className="card-header">Create a new group</h5>
                                <div class="card-body">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Group name: </Form.Label>
                                        <br/>
                                        <input type="text" placeholder="Enter group name.." onChange={(event) => {
                                            setGroup(event.target.value);
                                        }} />
                                    </Form.Group>
                                    <br/>
                                    <Button variant="primary" type="submit" onClick={addGroup}>
                                        Submit
                                    </Button>
                                </Form>
                                </div>
                            </div>
                        </Route>
                        <Route exact path = "/add-person">
                            <AddPerson groupsList={groupsList} />
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