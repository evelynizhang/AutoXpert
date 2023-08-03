import React, {useEffect, useState} from "react";
// import Heart from "react-animated-heart";
import Heart from "react-animated-heart";
import './index.css'




function TechnicianCard(props) {
  // const[favorite, setFavorite] = useState([])
  // const[isClick, setClick] = useState(false);



  // const getData = async () => {
  //   const url = "http://localhost:8080/api/technicians/favorite/";
  //   const response = await fetch(url)

  //   if (response.ok) {
  //     const data = await response.json()
  //     const app = data.technicians.filter(technician => technician.is_favorite === true)
  //     setFavorite(app)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  const handleFavorite = (technicianId) => {
    fetch(`http://localhost:8080/api/technicians/${technicianId}/favorite/`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: "True" }),
    })
    .then((response) => {

      // const updateFavorite = favorite.map((technician) => {
      //   if (technician.id === technicianId) {
      //     return { ...technician, is_favorite: "True" };
      //   }
      //   return technician;
      // });

      // setFavorite(updateFavorite);
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

      // const updateFavorite = favorite.map((technician) => {
      //   if (technician.id === technicianId) {
      //     return { ...technician, is_favorite: "False" };
      //   }
      //   return technician;
      // });

      // setFavorite(updateFavorite);
    })
  }

  const toggleFavorite = (technicianId, currentFavStatus) => {
    if (currentFavStatus) {
      handleNotFavorite(technicianId);
    } else {
      handleFavorite(technicianId)
    }

    if (props.fetchData) {
      props.fetchData();
    }

    // console.log(technicianId)
    // if (favorite.some((technician) => technician.id === technicianId)) {
    //   // Technician is already in the favorite list, so remove it
    //   handleNotFavorite(technicianId);
    //   console.log("no")

    // } else {
    //   // Technician is not in the favorite list, so add it
    //   handleFavorite(technicianId);
    //   console.log("yes")
    // }

  };

console.log("PROPS LIST", props.list)
  return (
    <div className="col">
      {props.list.map(data => {
        const technician = data.technicians;
        console.log(technician)
        return (
          <div key={technician.id} className="card mb-3 h-50" >
            <img src={technician.picture_url} className="card-img-top" alt="..." height="300" />
            <div className="card-body">
              <h5 className="card-title">{technician.first_name} {technician.last_name} </h5>
              <Heart className="heart"
                isClick={technician.is_favorite}
                onClick={() => {
                  // setClick(!isClick);
                  toggleFavorite(technician.id, technician.is_favorite)
                }}
              />
          </div>
          </div>)
        })
      }
    </div>
  );
}

export default TechnicianCard;
