import { useState, useEffect } from 'react';
import PeopleTable from './PeopleTable';

const SimpleGroup = (props) => {

    const id = props.id;
    const groupName = props.groupName;
    const [ownGroups, setOwnGroups] = useState([]);
    const [personsList, setPersonsList] = useState([]);
    const [numPersons, setNumPersons] = useState(0);
    

    useEffect(() => {
        fetch('http://localhost:3001/api/groups/owned/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setOwnGroups(data);
        })

        fetch('http://localhost:3001/api/groups/people/' + id)
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPersonsList(data);
            setNumPersons(data.length);
        })
    });


    return (
        <div>
            <div className="card" >
                <div>
                    <div class="card-header"><h5>{ groupName }</h5> <strong>Contains { numPersons } persons</strong></div>
                    <br/>
                </div>
                <PeopleTable personsList={personsList}/>
                <br/>
                <div className="container">
                    {ownGroups.map((group) => (
                        <div className="card">
                            <div class="card-body">
                                <SimpleGroup id={group.id} groupName={group.group_name}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default SimpleGroup;