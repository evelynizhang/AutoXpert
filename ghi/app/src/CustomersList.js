import React, {useEffect, useState} from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        const customersUrl = 'http://localhost:8090/api/customers/'

        try {
            const response = await fetch(customersUrl)
            if(!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setCustomers(data.customers);
            }
        }
        catch(e) {
            console.error(e, "There was a problem fetching customers")
        }
    }

    useEffect( () => {
        fetchCustomers();
    },[]);

    return (
        <div>
        <h1>Customers</h1>
        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            </tr>
        </thead>
        <tbody>
            {customers.map(customer => {
                return (
                    <tr key={customer.id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.phone_number}</td>
                        <td>{customer.address}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </div>
    )
}

export default CustomerList;
