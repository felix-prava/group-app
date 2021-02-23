
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddPerson = (props) => {

    const groupsList = props.groupsList;

   
    

    return (
        <div className="card" >
            <h5 className="card-header">Add a new person</h5>
            <div class="card-body">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Group name: </Form.Label>
                    <br/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select">
                        {groupsList.map((group) => (
                            <option key={group.id}>{ group.group_name }</option>
                         ))}
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
            <br/>
            </div>
        </div>
    );
}

export default AddPerson;