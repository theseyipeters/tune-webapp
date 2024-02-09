import React, { useState } from "react";
import axios from "axios";
import "./results.css";
import "./main.css";

export default function Results(props) {
	const [currentTrack, setCurrentTrack] = useState(null);
	console.log("Received artists:", props.results.artists);
	console.log("Received tracks:", props.results.tracks);
	console.log("Recieved albums:", props.results.albums);

	const formatDuration = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const renderArtists = () => {
		if (!props.results.artists || !Array.isArray(props.results.artists)) {
			return <div>No artists available</div>; // Handle the case when artists data is missing or not an array
		}
		return props.results.artists.slice(0, 6).map((artist) => (
			<div
				className="result"
				key={artist.id}>
				{artist.images.length ? (
					<a href={artist.external_urls.spotify}>
						<img
							className="image"
							width={"105px"}
							height={"105px"}
							src={artist.images[0].url}
							alt={artist.name}
						/>
					</a>
				) : (
					<a href={artist.external_urls.spotify}>
						<div
							className="no-image flex"
							width={"105px"}
							height={"105px"}>
							<small className="flex items-center justify-content m-auto">
								No image
							</small>
						</div>
					</a>
				)}
				{/* <br /> */}
				<small className="artist-artist-name mt-2">
					{artist.name.length > 12
						? artist.name.substring(0, 12) + "..."
						: artist.name}
				</small>
			</div>
		));
	};

	const renderTracks = () => {
		if (!props.results.tracks || !Array.isArray(props.results.tracks)) {
			return <div>No tracks available</div>; // Handle the case when tracks data is missing or not an array
		}
		const audioRef = React.createRef(); // Create a ref for the audio element

		const playPreview = (previewUrl, trackId) => {
			const audio = audioRef.current;
			if (props.currentTrack === trackId) {
				audio.pause();
				props.setCurrentTrack(null);
			} else {
				audio.src = previewUrl;
				audio.play();
				props.setCurrentTrack(trackId);
			}
		};

		return props.results.tracks.slice(0, 10).map((track, index) => (
			<div
				className="track"
				onClick={() => playPreview(track.preview_url, track.id)}
				key={track.id}>
				<audio ref={audioRef}></audio>
				<div className="serial-number">{index + 1}.</div> {/* Serial number */}
				<div className="track-image">
					<img
						src={track.album.images[0].url}
						alt={track.album.name}
					/>
				</div>
				<div className="track-info">
					<p className="track-name">{track.name}</p>
				</div>
				<p className="track-artist-name">{track.artists[0].name}</p>
				<p className="track-album-name">{track.album.name}</p>
				<p className="track-duration">{formatDuration(track.duration_ms)}</p>
				<i
					className={
						currentTrack === track.id ? "fa-solid fa-pause" : "fa-solid fa-play"
					}
					onClick={() => playPreview(track.preview_url, track.id)}></i>
			</div>
		));
	};

	const renderAlbums = () => {
		if (!props.results.albums || !Array.isArray(props.results.albums)) {
			return <div>No albums available</div>; // Handle the case when albums data is missing or not an array
		}
		return props.results.albums.slice(0, 5).map((album) => (
			<div
				className="result"
				key={album.id}>
				{album.images.length ? (
					<a href={album.external_urls.spotify}>
						<img
							className="image"
							width={"105px"}
							height={"105px"}
							src={album.images[0].url}
							alt={album.name}
						/>
					</a>
				) : (
					<a href={album.external_urls.spotify}>
						<div
							className="no-image"
							width={"105px"}
							height={"105px"}>
							?
						</div>
					</a>
				)}
				{/* <br /> */}
				<small className="artist-artist-name mt-2">
					{album.name.length > 12
						? album.name.substring(0, 12) + "..."
						: album.name}
				</small>
			</div>
		));
	};

	return (
		<div className="results-container">
			<div className="title mt-2">
				<h3>Albums</h3>
			</div>
			<div className="art-results">{renderAlbums()}</div>
			<div className="title">
				<h3>Tracks</h3>
			</div>
			<div className="results">{renderTracks()}</div>

			<div className="title">
				<h3>Artists</h3>
			</div>
			<div className="art-results">{renderArtists()}</div>
		</div>
	);
}
