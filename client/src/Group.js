import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

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
        if (firstName === "" || lastName === "" || job === ""){
            alert("All fields are mandatory!");
        } else{
            Axios.post('http://localhost:3001/api/people', 
            {firstName: firstName, lastName: lastName, job: job, groupId: id }).then(() => {
                console.log("Person added");
            });
        }
    };
    

    return (
        <div>
            <div className="card" >
                {group.map((group) => (
                    <div>
                        <div class="card-header"><h5>{ group.group_name }</h5> <strong>Contains { numPersons } persons</strong></div>
                        <br/>
                    </div>
                ))}
                <div className="container">
                    <table class="table table-success table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Job</th>
                        </tr>
                    </thead>
                        <tbody>
                        {personsList.map((person) => (
                                <tr>
                                <td>
                                    <a href={`/persons/${person.id}`}>{ person.first_name }</a>
                                </td>
                                <td>
                                    <a href={`/persons/${person.id}`}>{ person.last_name }</a>
                                </td>
                                <td>
                                    <a href={`/persons/${person.id}`}>{ person.job }</a>
                                </td>

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