import { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MoveGroup from './MoveGroup';

const TeamMoving = () => {
    
    const [groupName, setGroupName] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setGroupName(data[0].group_name);
        })
    }, [id]);
    
    return (
        <div className="container">
            <MoveGroup id={id} groupName={groupName}/>
        </div>
    );
}

export default TeamMoving;