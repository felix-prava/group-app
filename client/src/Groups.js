import { Link } from 'react-router-dom';

const Groups = (props) => {

    const groupsList = props.groupsList;

    return (
        <div className="card" >
            <div class="card-header"><h5>All groups</h5></div>
            
            <div class="card-body">
                {groupsList.map((group) => (
                    <div key={group.id}>
                        <Link to={`/groups/${group.id}`}>
                            { group.group_name }
                            <br/><br/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Groups;