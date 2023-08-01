import React, { useState } from "react"
import Heart from "react-heart"

function App() {
	const [active, setActive] = useState(false)
	return (
		<div style={{ width: "2rem" }}>
			<Heart isActive={active} onClick={() => setActive(!active)} animationTrigger = "both" inactiveColor = "rgba(255,125,125,.75)" activeColor = "#e019ae" style = {{marginTop:'1rem'}} animationDuration = {0.1}/>
		</div>
	);
}
