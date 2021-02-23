
import { useState ,useEffect} from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditGroup = (props) => {

    const id = props.id;
    const [group, setGroup] = useState([]);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroup(data);
            setGroupName(data[0].group_name);
        })
    }, [id]);

    const editGroup = () => {
        if (groupName === ""){
            alert("The group must have a name!");
        } else{
            Axios.patch('http://localhost:3001/api/groups/edit/' + id, 
            {groupName: groupName}).then(() => {
                console.log("Group edited!");
            });
        }
    };
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h5>Edit group name</h5>
                </div>
                <div className="card-body">
                {group.map((group) => (
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First name: </Form.Label>
                            <br/>
                            <input type="text" defaultValue={group.group_name}  onChange={(event) => {
                                setGroupName(event.target.value);
                            }} />
                            <br/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" onClick={() => { editGroup()}}>
                            Submit
                        </Button>
                    </Form>
                ))}
                </div>
            </div>
        </div>
    );
}

export default EditGroup;