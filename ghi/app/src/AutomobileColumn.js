import Card from 'react-bootstrap/Card';
import HeartWrapper from './AutomobileReactions';



const AutomobileColumn = (props) => {
    return (
        <div className='col '>
        {props.col.map(automobile => {
        return (
            <div key={automobile.vin}>
                <Card style={{ width: '25rem' }}>
                    <Card.Img className='card-img-top' variant="top" src={automobile.model.picture_url} />
                    < HeartWrapper automobile={automobile} fetchAutomobiles={props.fetchAutomobiles}/>
                    <Card.Body>
                        <Card.Title>{automobile.year} {automobile.model.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{automobile.model.manufacturer.name}</Card.Subtitle>
                        <div className='card-info'>
                            <div>
                            <button>
                                {automobile.type}
                            </button>
                            <button>
                                $ {automobile.dealer_price}
                            </button>
                            <button>
                                {automobile.mileage} miles
                            </button>
                            </div>
                            <p>
                            Extra information or short description regarding automobile.
                            </p>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted card-footer">{automobile.vin}</Card.Footer>
                </Card>
            </div>
        )
        })}
        </div>
    )
}

export default AutomobileColumn;
