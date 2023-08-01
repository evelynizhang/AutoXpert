import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './index.css'


const AutomobileList = () => {
    const[soldCars, setSoldCars] = useState([]);
    const[unsoldCars, setUnsoldCars] = useState([]);

    const fetchAutomobiles = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        try {
            const response = await fetch(automobilesUrl)
            if (!response.ok) {
                throw new Error
            } else {
                const data = await response.json();
                const sold = data.autos.filter(auto => (auto.sold === true));
                const unsold = data.autos.filter(auto => (auto.sold === false));
                setSoldCars(sold);
                setUnsoldCars(unsold);
            }
        } catch(e) {
            console.log(e, "There was a problem fetching automobiles")
        }
    }

    useEffect( () => {
        fetchAutomobiles();
    },[]);

    const col1 = []
    const col2 = []
    const col3 = []
    const col4 = []
    let col = 0;
    for (const car of unsoldCars) {
        if (col === 0) {
            col1.push(car);
            col += 1;
        }
        else if (col === 1) {
            col2.push(car);
            col += 1;
        }
        else {
            col3.push(car);
            col = 0;
        }
    }
    console.log("SOLD", soldCars);

    return (
        <>
        <div className='vehicle-container'>
        <div className='container'>
            <h1>Unsold Automobiles</h1>
            <div className='row sold'>
            <div className='col '>
            {col1.map(automobile => {
            return (
                <Card style={{ width: '25rem' }}>
                    <Card.Img className='card-img-top' variant="top" src={automobile.model.picture_url} />
                    <Card.Body>
                        <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{automobile.model.manufacturer.name}</Card.Subtitle>
                        <Card.Text>
                        Extra information or short description regarding automobile.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted card-footer">{automobile.vin}</Card.Footer>
                </Card>
            )
            })}
            </div>
            <div className='col'>

            {col2.map(automobile => {
            return (
                <Card style={{ width: '25rem' }}>
                    <Card.Img className='card-img-top' variant="top" src={automobile.model.picture_url} />
                    <Card.Body>
                        <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{automobile.model.manufacturer.name}</Card.Subtitle>
                        <Card.Text>
                        Extra information or short description regarding automobile.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted card-footer">{automobile.vin}</Card.Footer>
                </Card>
            )
            })}
            </div>
            <div className='col'>
            {col3.map(automobile => {
            return (
                <Card style={{ width: '25rem' }}>
                    <Card.Img className='card-img-top' variant="top" src={automobile.model.picture_url} />
                    <Card.Body>
                        <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{automobile.model.manufacturer.name}</Card.Subtitle>
                        <Card.Text>
                        Extra information or short description regarding automobile.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted card-footer">{automobile.vin}</Card.Footer>
                </Card>
            )
            })}
            </div>
            </div>
        </div>
        <div className='sold-container'>
            <h1>Sold Vehicles</h1>
            <div className='sold-vehicle-container'>
                {soldCars.map((automobile) => {
                    return (
                        <Card style={{ width: '20rem' }}>
                    <Card.Img className='sold-car-img' variant="top" src={automobile.model.picture_url} />
                    <Card.Body>
                        <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{automobile.vin}</Card.Subtitle>
                    </Card.Body>
                </Card>
                    );
                })}

            </div>
        </div>
        </div>
        </>
    );
}

export default AutomobileList;
