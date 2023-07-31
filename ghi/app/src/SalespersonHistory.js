import React, {useEffect, useState} from 'react';

const SalespersonHistory = () => {
    const [salespeople, setSalespeople] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [sales, setSales] = useState([]);

    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        try {
            const response = await fetch(salespeopleUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setSalespeople(data.salespeople);
            }

        } catch(e) {
            console.log(e, "There was a problem fetching salespeople")
        }
    }

    const fetchSales = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        try {
            const response = await fetch(salesUrl);
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setSales(data.sales)
            }
        } catch(e) {
            console.log(e, "There was a problem fetching salespeople")
    }
    }

    const handleSalespersonChange = event => {
        const salespersonId = event.target.value;
        console.log(salespersonId)
        let filteredSales = sales.filter(sale => sale.salesperson.id === salespersonId);
        setFilteredSales(filteredSales);
    }

    useEffect( () => {
        fetchSalespeople();
        fetchSales();
    },[]);

    return (
        <>
        <h1> Salesperson History </h1>
        <div>
            <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a salesperson...</option>
                {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                    );
                })}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Salesperson</th>
                    <th scope="col">Customer</th>
                    <th scope="col">VIN</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map(sale => {
                        return (
                            <tr key={sale.id}>
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
        </>
    );
}

export default SalespersonHistory
