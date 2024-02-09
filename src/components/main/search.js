import React, { useState } from "react";
import axios from "axios";
import "./main.css";

export default function Search({
	setSearchArtists,
	setSearchTracks,
	setSearchAlbum,
	setSearchMade,
}) {
	const [searchInput, setSearchInput] = useState("");
	const token = window.localStorage.getItem("token");

	const search = async (e) => {
		e.preventDefault();
		const { data } = await axios.get("https://api.spotify.com/v1/search", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: searchInput,
				type: "artist,track,album", // Include both artist and track types in the search
			},
		});

		console.log(data);

		setSearchArtists([...data.artists.items]);
		setSearchTracks([...data.tracks.items]);
		setSearchAlbum([...data.albums.items]);

		// Set searchMade to true after search is made
		setSearchMade(true);
	};

	return (
		<div className="search-pane">
			<div className="search-container">
				<i className="fas fa-search"></i>
				<form
					className="form-bar"
					onSubmit={search}>
					<input
						onChange={(event) => setSearchInput(event.target.value)}
						type="text"
						className="searchbar"
						placeholder="Search artist, albums and tracks..."
					/>
					<button
						type="submit"
						className="btn">
						Search
					</button>
				</form>
			</div>
		</div>
	);
}
