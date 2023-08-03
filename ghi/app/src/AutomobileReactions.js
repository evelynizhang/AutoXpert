import React, {useEffect, useState} from 'react';
import Heart from "react-animated-heart";
import './index.css'

function HeartWrapper(props) {
	const [active, setActive] = useState(props.automobile.is_favorite);

    async function toggleFavorite (automobile) {
        const automobileUrl = `http://localhost:8100/api/automobiles/${automobile.vin}/`;
        let is_favorite;
        if (automobile.is_favorite === true) {
            is_favorite = false;
        } else {
            is_favorite = true
        }
        const fetchConfig = {
            method: "PUT",
            body : JSON.stringify({"is_favorite": is_favorite}),
            headers : {
                "Content-Type" : 'application/json',
            }
        }
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            console.log(response)
            setActive(!active)
            props.fetchAutomobiles()
        }
    }

    return (
        <Heart
            isClick={active}
            onClick={() => {
                toggleFavorite(props.automobile)
            }}
        />

    );

}

export default HeartWrapper;
