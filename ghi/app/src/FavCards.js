import React, {useEffect, useState} from "react";
import HeartIcon from "./heart"


function FavCard(props) {
  const[favorite, setFavorite] = useState([])

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
      body: JSON.stringify({ is_favortie: "True" }),
    })
    .then((response) => {

      const updateFavorite = favorite.map((technician) => {
        if (technician.id === technicianId) {
          return { ...technician, is_favortie: "True" };
        }
        return technician;
      });

      setFavorite(updateFavorite);
    })
  }

  return (
    <div className="col">
      {props.list.map(data => {
        const technician = data.technicians;
        return (
          <div key={technician.id} className="card mb-3 h-50" >
            <img src={technician.picture_url} className="card-img-top" alt="..." height="300" />

            <div className="card-body">
              <h5 className="card-title">{technician.first_name} {technician.last_name} </h5>
              <HeartIcon onClick={() => handleFavorite(technician.id)}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FavCard;
