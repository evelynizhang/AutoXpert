import React, {useEffect, useState} from 'react';

const SalespeopleList = () => {
    const [salespeople, setSalespeople] = useState([]);

    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        try {
            const response = await fetch(salespeopleUrl)
            if(!response.ok) {
                throw new Error("Response not okay!")
            } else {
                const data = await response.json();
                setSalespeople(data.salespeople);
            }
        }
        catch(e) {
            console.error(e, "There was an error")
        }
    }

    useEffect( () => {
        fetchSalespeople();
    },[])

    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(saleperson => {
                    return (
                        <tr key={saleperson.id}>
                            <td>{saleperson.employee_id}</td>
                            <td>{saleperson.first_name}</td>
                            <td>{saleperson.last_name}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    )
}

export default SalespeopleList
