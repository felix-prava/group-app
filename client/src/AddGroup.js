import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Axios from 'axios';
import  { Redirect } from 'react-router-dom'

const AddGroup = (props) => {

    const [group, setGroup] = useState("");
   
    const addGroup = () => {
        if (group === "" || group === "Enter group name..")
            alert("You can not create a group with an empty name!");
        else{
            Axios.post('http://localhost:3001/api/groups', 
            {group: group }).then(() => {
                <Redirect to='/groups'/>;
            })
        }
    };

    return (
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
    );
}

export default AddGroup;