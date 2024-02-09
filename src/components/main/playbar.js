// Playbar.js

import React, { useState, useEffect } from "react";

export default function Playbar({
	currentTrack,
	audioRef,
	tracks,
	setCurrentTrack,
}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);

	useEffect(() => {
		if (currentTrack) {
			setIsPlaying(true);
			audioRef.current.src = currentTrack.preview_url; // Set the audio source to the current track URL
			audioRef.current.play(); // Automatically play the current track
		}
	}, [currentTrack]);

	const playPause = () => {
		if (audioRef.current.paused) {
			setIsPlaying(true);
			audioRef.current.play();
		} else {
			setIsPlaying(false);
			audioRef.current.pause();
		}
	};

	const nextTrack = () => {
		// Get the index of the current track
		const currentIndex = tracks.findIndex(
			(track) => track.id === currentTrack.id
		);
		// Check if there's a next track
		if (currentIndex < tracks.length - 1) {
			const nextTrack = tracks[currentIndex + 1];
			// Update the current track state
			setCurrentTrack(nextTrack);
		}
	};

	const prevTrack = () => {
		// Get the index of the current track
		const currentIndex = tracks.findIndex(
			(track) => track.id === currentTrack.id
		);
		// Check if there's a previous track
		if (currentIndex > 0) {
			const prevTrack = tracks[currentIndex - 1];
			// Update the current track state
			setCurrentTrack(prevTrack);
		}
	};

	const toggleMute = () => {
		audioRef.current.muted = !audioRef.current.muted;
	};

	const changeVolume = (value) => {
		setVolume(value);
		audioRef.current.volume = value;
	};

	return (
		<div className="bg-gray-800 p-4 flex justify-between items-center">
			<audio
				ref={audioRef}
				controls></audio>

			<div className="flex items-center space-x-4">
				<button onClick={prevTrack}>
					<i className="fas fa-backward text-white"></i>
				</button>
				<button onClick={playPause}>
					<i
						className={`fas ${
							isPlaying ? "fa-pause" : "fa-play"
						} text-white`}></i>
				</button>
				<button onClick={nextTrack}>
					<i className="fas fa-forward text-white"></i>
				</button>
				<button onClick={toggleMute}>
					<i
						className={`fas ${
							audioRef.current && audioRef.current.muted
								? "fa-volume-mute"
								: "fa-volume-up"
						} text-white`}></i>
				</button>
				<input
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={volume}
					onChange={(e) => changeVolume(e.target.value)}
					className="w-20 h-3 appearance-none rounded-full bg-gray-600 outline-none"
				/>
			</div>
		</div>
	);
}
