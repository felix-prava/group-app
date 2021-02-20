import './App.css';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { useState } from 'react';
import Axios from 'axios'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddPerson from './AddPerson';
 

function App() {

    const [group, setGroup] = useState("");

    const [groupsList, setGroupsList] = useState([]);

    const addGroup = () => {
        Axios.post('http://localhost:3001/api/add-group', 
        {group: group }).then(() => {
            console.log("Group added");
        });
    };

    const getGroups = () => {
        Axios.get('http://localhost:3001/api/groups').then((response) => {
            setGroupsList(response.data);
        });
    };

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
                                <br/>
                                <Button variant="primary" onClick={getGroups}>
                                    All groups
                                </Button>
                                </div>
                            </div>
                        </Route>
                        <Route exact path = "/test">
                            <AddPerson />
                        </Route>
                    </Switch>
                </div> 
            </div>
        </Router>
    );
}

export default App;