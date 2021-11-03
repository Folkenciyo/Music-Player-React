import React, { useState, useEffect } from "react";
import Music from "./music.jsx";

const URL = "https://assets.breatheco.de/apis/sound/songs";

const Home = () => {
	const [sounds, setSounds] = useState([]);
	const [soundsComponents, setSoundsComponents] = useState([]);
	const [currentSong, setCurrentSong] = useState({ name: "", url: "" });

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				setSounds(responseAsJSON);
			});
	}, []);

	useEffect(() => {
		if (sounds) {
			setSoundsComponents(
				sounds.map((sound, index) => {
					return (
						<Music
							song={sound}
							key={index.toString()}
							selectsong={setSong}
						/>
					);
				})
			);
		}
	}, [sounds]);

	//cambia de cancion
	const setSong = song => {
		setCurrentSong(song);
	};

	return (
		<div>
			<ul>{soundsComponents}</ul>
			<audio
				controls
				autoPlay
				src={"https://assets.breatheco.de/apis/sound/".concat(
					currentSong.url
				)}
			/>
		</div>
	);
};

export default Home;
