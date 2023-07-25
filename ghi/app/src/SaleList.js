import React, {useEffect, useState} from 'react';

const SaleList = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/'

        try {
            const response = await fetch(salesUrl)
            if(!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setSales(data.sales);
            }
        }
        catch(e) {
            console.error(e, "There was a problem fetching sales")
        }
    }

    useEffect( () => {
        fetchSales();
    },[]);

    return (
        <div>
        <h1>Sales</h1>
        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">Salesperson Employee ID</th>
            <th scope="col">Salesperson Name</th>
            <th scope="col">Customer</th>
            <th scope="col">VIN</th>
            <th scope="col">Price</th>

            </tr>
        </thead>
        <tbody>
            {sales.map(sale => {
                return (
                    <tr key={sale.id}>
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>${sale.price}</td>
                    </tr>

                )
            })}
        </tbody>
        </table>
    </div>
    );
}

export default SaleList;
