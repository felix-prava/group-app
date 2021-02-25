import PeopleGroupTable from "./PeopleGroupTable";
import { useState, useEffect } from 'react';

const AllPeople = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/people-team')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setPeople(data);
        })

    }, []);

    return (
        <div className="card" >
            <PeopleGroupTable personsList={people}/>
        </div>
    );
}

export default AllPeople;