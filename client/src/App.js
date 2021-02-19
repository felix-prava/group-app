import './App.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

function App() {
  return (
      
    <div className="App">
        <div class = "container"> 
            <div className="card" >
                <h5 className="card-header">Create a new group</h5>
                <div class="card-body">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Group name: </Form.Label>
                        <br/>
                        <input type="email" placeholder="Enter group name.." />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </div>
            </div>
        </div> 
    </div>
  );
}

export default App;