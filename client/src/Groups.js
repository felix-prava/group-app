import { Link } from 'react-router-dom';

const Groups = (props) => {

    const groupsList = props.groupsList;

    return (
        <div className="card" >
            <div class="card-header"><h5>All groups</h5></div>
            
            <div class="card-body">
            <div className="container">
                    <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Group name</th>
                        </tr>
                    </thead>
                        <tbody>
                        {groupsList.map((group) => (
                            <tr>
                            <td>
                                <Link to={`/groups/${group.id}`}>
                                    { group.group_name }
                                </Link>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Groups;