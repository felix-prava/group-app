import { useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Person = (props) => {

    const groupsList = props.groupsList;
    const { id } = useParams();
    const [person, setPerson] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/people/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPerson(data);
            setFirstName(data[0].first_name);
            setLastName(data[0].last_name);
            setJob(data[0].job);
        })
    }, [id]);

    

    const movePerson = (groupId) => {
        Axios.patch('http://localhost:3001/api/people/' + id, 
        {groupId: groupId }).then(() => {
            console.log("Person moved");
        }).then(() => {
            alert(firstName + "was moved to another group!")
        })
    };

    const editPerson = () => {
        if (firstName === "" || lastName === "" || job === ""){
            alert("All fields must be completed!");
        } else{
            Axios.patch('http://localhost:3001/api/people/edit/' + id, 
            {firstName: firstName, lastName: lastName, job: job }).then(() => {
                console.log("Person edited!");
            });
        }
    };
    return (
        <div>
            <div className="card" >
                {person.map((person) => (
                    <div>
                        <div className="card-header"><h5>{ person.first_name } { person.last_name} </h5> </div>
                        <div className="card-body">
                            <strong> { person.job } </strong>
                        </div>
                    </div>
                ))}
                <div className="container">
                    <h5>Move this person to another group:</h5>
                    <br/>
                        {groupsList.map((group) => (
                            <div className="container">
                                <div className="card" >
                                    <div className="card-header"><strong>{group.group_name}</strong></div>
                                    <div className="card-body">
                                        <button variant="primary" type="submit" onClick={() => { movePerson(group.id)}}>
                                            Move in this group
                                        </button>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))}
                    <br/>
                </div>
            </div>
            <br/>
            <div className="card">
                <div className="card-header">
                    <h5>Edit person</h5> 
                </div>
                <div className="card-body">
                {person.map((person) => (
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First name: </Form.Label>
                            <br/>
                            <input type="text" defaultValue={person.first_name}  onChange={(event) => {
                                setFirstName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label>Last name: </Form.Label>
                            <br/>
                            <input type="text" defaultValue={person.last_name}  onChange={(event) => {
                                setLastName(event.target.value);
                            }} />
                            <br/>
                            <Form.Label>Job: </Form.Label>
                            <br/>
                            <input type="text" defaultValue={person.job} onChange={(event) => {
                                setJob(event.target.value);
                            }} />
                            <br/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" onClick={() => { editPerson()}}>
                            Submit
                        </Button>
                    </Form>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Person;