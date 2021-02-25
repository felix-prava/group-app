import { useState ,useEffect} from 'react';
import Axios from 'axios';
import { Alert } from 'react-alert';

const MoveGroup = (props) => {
    
    const id = props.id;
    const groupName = props.groupName;
    const [groupsList, setGroupsList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/groups')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroupsList(data);
        })
    }, [id]);

    const moveGroup = (groupId) => {
        if (groupId == id){
            alert(" You can not move a group in the same group!")
        } else {
            Axios.patch('http://localhost:3001/api/groups/' + id, 
            {groupId: groupId }).then(() => {
                console.log("Person moved");
            }).then(() => {
                alert(groupName + " was moved to another group!")
            })
        }
    };
    
    return (
        <div className="container">
            <h5>Move this team into another group:</h5>
            <br/>
                {groupsList.map((group) => (
                    <div className="container">
                        <div className="card" >
                            <div className="card-header"><strong>{group.group_name}</strong></div>
                            <div className="card-body">
                                <button variant="primary" type="submit" onClick={() => { moveGroup(group.id)}}>
                                    Move in this group
                                </button>
                            </div>
                        </div>
                        <br/>
                    </div>
                ))}
                <div className="container">
                    <div className="card" >
                        <div className="card-header"><strong>No group</strong></div>
                        <div className="card-body">
                            <button variant="primary" type="submit" onClick={() => { moveGroup(0)}}>
                                Move this group alone
                            </button>
                        </div>
                    </div>
                    <br/>
                </div>
            <br/>
        </div>
    );
}

export default MoveGroup;