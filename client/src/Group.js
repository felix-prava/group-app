import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Group = () => {

    const { id } = useParams();
    const [group, setGroup] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [job, setJob] = useState("");
    const [personsList, setPersonsList] = useState([]);
    const [numPersons, setNumPersons] = useState(0);
    

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroup(data);
        })

        fetch('http://localhost:3001/api/groups/people/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPersonsList(data);
            setNumPersons(data.length);
        })
    }, []);

    const addPerson = () => {
        Axios.post('http://localhost:3001/api/people', 
        {firstName: firstName, lastName: lastName, job: job, groupId: id }).then(() => {
            console.log("Person added");
        });
    };
    

    return (
        <div>
            <div className="card" >
                {group.map((group) => (
                    <div>
                        <div class="card-header"><h5>{ group.group_name }</h5></div>
                        <div class="card-body" key={group.id}>
                            Contains { numPersons } persons
                            <br/><br/>
                        </div>
                    </div>
                ))}
                <div className="container">
                    <table class="table table-success table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Job</th>
                        </tr>
                    </thead>
                        <tbody>
                        {personsList.map((person) => (
                            <tr>
                            <th scope="row">1</th>
                            <td>{ person.first_name }</td>
                            <td>{ person.last_name }</td>
                            <td>{ person.job }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="card" >
                <h5 className="card-header">Add a new person to this group</h5>
                <div class="card-body">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First name: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setFirstName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label>Last name: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setLastName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label> Job: </Form.Label>
                            <br/>
                            <input type="text" onChange={(event) => {
                                setJob(event.target.value);
                            }} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" onClick={addPerson}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Group;