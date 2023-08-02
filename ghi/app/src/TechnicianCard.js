import React, {useEffect, useState} from "react";
// import HeartIcon from "./heart";
import Heart from "react-animated-heart";
import ReactSwitch from 'react-switch';






function TechnicianCard(props) {
  const[favorite, setFavorite] = useState([])
  const[isClick, setClick] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = val => {
    setChecked(val)
  }


  const getData = async () => {
    const url = "http://localhost:8080/api/technicians/favorite/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const app = data.technicians.filter(technician => technician.is_favortie === "True")
      setFavorite(app)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const handleFavorite = (technicianId) => {
    fetch(`http://localhost:8080/api/technicians/${technicianId}/favorite/`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: "True" }),
    })
    .then((response) => {

      const updateFavorite = favorite.map((technician) => {
        if (technician.id === technicianId) {
          return { ...technician, is_favorite: "True" };
        }
        return technician;
      });

      setFavorite(updateFavorite);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
    })
  }

  const handleNotFavorite = (technicianId) => {
    fetch(`http://localhost:8080/api/technicians/${technicianId}/nofavorite/`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: "False" }),
    })
    .then((response) => {

      setFavorite((prevFavorites) => prevFavorites.filter((technician) => technician.id !== technicianId));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
    });
  };

  const toggleFavorite = (technicianId) => {
    if (favorite.some((technician) => technician.id === technicianId)) {
      // Technician is already in the favorite list, so remove it
      handleNotFavorite(technicianId);
    } else {
      // Technician is not in the favorite list, so add it
      handleFavorite(technicianId);
    }
  };




  return (
    <div className="col">
      {props.list.map(data => {
        const technician = data.technicians;
        return (
          <div key={technician.id} className="card mb-3 h-50" >
            <img src={technician.picture_url} className="card-img-top" alt="..." height="300" />

            <div className="card-body">
              <h5 className="card-title">{technician.first_name} {technician.last_name} </h5>
              <Heart isClick={isClick}
              onClick={() => {
                setClick(!isClick);
                toggleFavorite(technician.id)
                }
                } />
              {/* <button onClick={() => {handleFavorite(technician.id)}} >Add to Favorite</button>
              {showMessage && <p>Added to Favorite!</p>}
              <button onClick={() => {handleNotFavorite(technician.id)}} >Delete from Favorite</button>
              {showMessage && <p>Delete from Favorite!</p>}
              <ReactSwitch
        checked={checked}
        onChange={handleChange}
      /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TechnicianCard;
