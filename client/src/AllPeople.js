import PeopleTable from "./PeopleTable";
import { useState, useEffect } from 'react';

const AllPeople = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/people')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPeople(data);
        })

    }, []);

    return (
        <div className="card" >
            <PeopleTable personsList={people}/>
        </div>
    );
}

export default AllPeople;