import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";

function HeartIcon () {
  const[isClick, setClick] = useState(false);
  const[favorite, setFavorite] = useState([])
  const[technicians, setTechnicians] = useState([])

  const getFav = async () => {
    const url = "http://localhost:8080/api/technicians/favorite/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const app = data.technicians.filter(technician => technician.is_favortie === "True")
      setFavorite(app)
    }
  }
  const getTechnicians = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const app = data.technicians
      setTechnicians(app)
    }
  }

  useEffect(() => {
    getFav()
    getTechnicians()
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
    <div className="App">
     <Heart isClick={isClick} onClick={() => {
        setClick(!isClick);
        handleFavorite()
        } } />
    </div>
  );
}

export default HeartIcon;
