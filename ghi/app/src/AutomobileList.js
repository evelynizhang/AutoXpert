import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import './index.css'
import AutomobileColumn from './AutomobileColumn';

const AutomobileList = () => {
    const[soldCars, setSoldCars] = useState([]);
    const[unsoldCars, setUnsoldCars] = useState([]);
    const[allUnsold, setAllUnsold] = useState([]);

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
                setAllUnsold(unsold)
            }
        } catch(e) {
            console.log(e, "There was a problem fetching automobiles")
        }
    }

    useEffect( () => {
        fetchAutomobiles();
    },[]);

    function handleFavoriteDisplay() {
        const favoriteCars = unsoldCars.filter(car => (car.is_favorite === true));
        setUnsoldCars(favoriteCars);
    }
    function handleAllDisplay() {
        setUnsoldCars(allUnsold);
    }

    return (
        <>
        <div className='vehicle-container'>
        <div className='container unsold-container'>
            <div className='button-container'>
                <h1>Available Automobiles</h1>
                <div>
                <button onClick={handleFavoriteDisplay}>Favorites</button>
                <button onClick={handleAllDisplay}>All Cars</button>
                </div>
            </div>
            <div className='row sold'>
                {groupUnsoldCars(unsoldCars).map((col, index) => (
                    <AutomobileColumn key={index} col={col} fetchAutomobiles={fetchAutomobiles} />
                ))}
            </div>
        </div>
        <div className='sold-container'>
            <h1>Sold Automobiles</h1>
            <div className='sold-vehicle-container'>
                {soldCars.map((automobile) => {
                    return (
                        <div key={automobile.vin}>
                            <button>SOLD</button>
                        <Card style={{ width: '20rem' }}>
                        <Card.Img className='sold-car-img' variant="top" src={automobile.model.picture_url} />
                        <Card.Body>
                            <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{automobile.vin}</Card.Subtitle>
                        </Card.Body>
                        </Card>
                        </div>
                    );
                })}

            </div>
        </div>
        </div>
        </>
    );
}

const groupUnsoldCars = (unsoldCars) => {
    const groups = [[], [], []];
    let col = 0;
    for (const car of unsoldCars) {
        if (col === 0) {
            groups[0].push(car);
            col += 1;
        }
        else if (col === 1) {
            groups[1].push(car);
            col += 1;
        }
        else {
            groups[2].push(car);
            col = 0;
        }
    }

    return groups;
}

export default AutomobileList;
