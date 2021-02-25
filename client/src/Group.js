import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditGroup from './EditGroup';
import SimpleGroup from './SimpleGroup';
import { Link } from 'react-router-dom';

const Group = () => {

    const { id } = useParams();
    const [groupName, setGroupName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [job, setJob] = useState("");
    

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroupName(data[0].group_name);
        })

        fetch('http://localhost:3001/api/groups/people/' + id)
        .then(res => {
            return res.json()
        })
    });

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

    const deleteGroup = (id) => {
        Axios.delete(`http://localhost:3001/api/groups/${id}`);
        //than redirect to groups page
    };

    return (
        <div>
            <SimpleGroup id={id} groupName={groupName} />
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
            <br/>
            <EditGroup id={id} />
            <br/>
            <Link class="nav-link" to={`/groups/move/${id}`} >Move this group</Link>
            <br/>
            <Button variant="danger" onClick={() => deleteGroup(id)}>
                Delete group
            </Button>
            <br/>
        </div>
    );
}

export default Group;