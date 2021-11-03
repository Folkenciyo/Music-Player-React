import React, { useState, useEffect } from "react";
import Music from "./music.jsx";

const URL = "https://assets.breatheco.de/apis/sound/songs";

const Home = () => {
	const AUDIO = document.querySelector("audio");
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

	const previousSong = () => {
		let currentIndex = sounds.indexOf(currentSong);
		if (currentIndex === 0) {
			setCurrentSong(sounds[sounds.length - 1]);
		} else {
			setCurrentSong(sounds[currentIndex - 1]);
		}
	};

	const nextSong = () => {
		let currentIndex = sounds.indexOf(currentSong);
		if (currentIndex === sounds.length - 1) {
			setCurrentSong(sounds[0]);
		} else {
			setCurrentSong(sounds[currentIndex + 1]);
		}
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
			<button
				onClick={() => {
					previousSong();
				}}>
				Back{" "}
			</button>
			<button
				onClick={() => {
					AUDIO.play();
				}}>
				play
			</button>
			<button
				onClick={() => {
					AUDIO.pause();
				}}>
				pause
			</button>
			<button
				onClick={() => {
					nextSong();
				}}>
				next
			</button>
		</div>
	);
};

export default Home;
