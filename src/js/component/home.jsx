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

	const shuffleSong = () => {
		setCurrentSong(sounds[Math.floor(Math.random() * sounds.length)]);
	};

	return (
		<div className="bodyall container-fluid">
			<div className="text-effect">
				<h1 className="neon" data-text="Spot-IT-V">
					Spot-IT-V
				</h1>
				<div className="gradient"></div>
				<div className="spotlight"></div>
			</div>
			<div className="card">
				<div className="list">
					<ul>{soundsComponents}</ul>
					<audio
						controls
						autoPlay
						src={"https://assets.breatheco.de/apis/sound/".concat(
							currentSong.url
						)}
					/>
				</div>
			</div>
			<div className="botones">
				<a
					href="#"
					onClick={() => {
						previousSong();
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i className="fas fa-fast-backward"></i>
				</a>
				<a
					href="#"
					onClick={() => {
						AUDIO.play();
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i className="fas fa-play-circle"></i>
				</a>
				<a
					href="#"
					onClick={() => {
						shuffleSong();
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i className="fas fa-random"></i>
				</a>
				<a
					href="#"
					onClick={() => {
						AUDIO.pause();
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i className="fas fa-pause-circle"></i>
				</a>
				<a
					href="#"
					onClick={() => {
						nextSong();
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<i className="fas fa-fast-forward"></i>
				</a>
			</div>
		</div>
	);
};

export default Home;
