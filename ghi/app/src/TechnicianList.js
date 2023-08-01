import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";



function HeartIcon() {
  const [isClick, setClick] = useState(false);
  return (
    <div className="Hearticon">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
}


function TechnicianColumn(props) {

  return (
    <div className="col">
      {props.list.map(data => {
        const technician = data.technicians;
        return (
          <div key={technician.id} className="card mb-3 h-50" >
            <img src={technician.picture_url} className="card-img-top" alt="..." height="300" />

            <div className="card-body">
              <h5 className="card-title">{technician.first_name} {technician.last_name} </h5>
              <HeartIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
}


function TechnicianList(props) {
  const [technicianColumns, setTechnicianColumns] = useState([[], [], []]);


  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();
        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let technician of data.technicians) {
          const detailUrl = `http://localhost:8080/api/technicians/${technician.id}/`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const columns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const technicianResponse of responses) {
          if (technicianResponse.ok) {
            const details = await technicianResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(technicianResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        setTechnicianColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className="row">
          {technicianColumns.map((technicianList, index) => {
            return (
              <TechnicianColumn key={index} list={technicianList} />
            );
          })}
        </div>
    </>
  )
}

export default TechnicianList;
