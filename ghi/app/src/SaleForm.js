import React, {useEffect, useState} from 'react';

const SaleForm = () => {
    const [autos, setAutos] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const[formData, setFormData] = useState({
        automobile: "",
        salesperson: "",
        customer: "",
        price: "",
    });

    const fetchVin = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        try {
            const response = await fetch(automobilesUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                let unsoldAutos = data.autos.filter(auto => (auto.sold === false));
                setAutos(unsoldAutos);
            }

        } catch(e) {
            console.log(e, "There was a problem fetching automobiles")
        }
    }

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


    const fetchCustomers = async () => {
        const customersUrl = 'http://localhost:8090/api/customers/';
        try {
            const response = await fetch(customersUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                setCustomers(data.customers);
            }

        } catch(e) {
            console.log(e, "There was a problem fetching customers")
        }
    }

    useEffect( () => {
        fetchVin();
        fetchSalespeople();
        fetchCustomers();
    },[]);


    const handleFormChange = async event => {
        event.preventDefault();
        const value = event.target.value;
        const useStateVariable = event.target.name;
        setFormData({
            ...formData,
            [useStateVariable]: value
        })
    }

    const submitHandler = async event => {
        event.preventDefault();

        const saleUrl = 'http://localhost:8090/api/sales/'
        const updateAutomobileUrl = `http://localhost:8100/api/automobiles/${formData.automobile}/`

        const saleConfig = {
            method : "POST",
            body : JSON.stringify(formData),
            headers : {
                "Content-Type" : 'application/json',
            }
        }

        const automobileConfig = {
            method : "PUT",
            body: JSON.stringify({"sold": true}),
            headers : {
                "Content-Type" : 'application/json',
            }
        }
        const responses = await Promise.all([fetch(saleUrl, saleConfig),fetch(updateAutomobileUrl, automobileConfig)]);

        if (responses[0].ok && responses[1].ok){
            alert ("Sale successfully recorded!")
            setFormData({
                automobile: "",
                salesperson: "",
                customer: "",
                price: "",
            });
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Record a new Sale</h1>
                <form onSubmit={submitHandler} id="create-salesperson-form">
                    <div className="mb-3">
                        <label htmlFor="automobile">Automobile VIN</label>
                        <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                            <option value="">Choose an automobile VIN...</option>
                            {autos.map(auto => {
                                return (
                                    <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salesperson">Salesperson</label>
                        <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                            <option value="">Choose a salesperson...</option>
                            {salespeople.map(saleperson => {
                                return (
                                    <option key={saleperson.id} value={saleperson.id}>{saleperson.first_name} {saleperson.last_name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customer">Customer</label>
                        <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                            <option value="">Choose a customer...</option>
                            {customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price">Price</label>
                        <input onChange={handleFormChange} value={formData.price} placeholder="0" required type="number" name="price" id="price" className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
                </div>
            </div>
            </div>    );
}

export default SaleForm;
