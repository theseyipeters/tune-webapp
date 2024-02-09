import React, { useState } from "react";
import axios from "axios";

export default function ArtistSearchResults() {
	const token = window.localStorage.getItem("token");
	const [artists, setArtists] = useState([]);
	const [tracks, setTracks] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	const performSearch = async (e) => {
		e.preventDefault();

		const { data } = await axios.get("https://api.spotify.com/v1/search", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: searchInput,
				type: "track,artist,albums", // Search for tracks, artists, and albums
			},
		});

		setArtists(data.artists.items);
		setTracks(data.tracks.items);
		setAlbums(data.albums.items);
	};

	return (
		<div>
			<form onSubmit={performSearch}>
				<input
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search artists, tracks, and albums"
				/>
				<button type="submit">Search</button>
			</form>

			<div>
				<h2>Artists</h2>
				{artists.map((artist) => (
					<div key={artist.id}>
						{artist.images.length ? (
							<img
								width={"200px"}
								height={"200px"}
								src={artist.images[0].url}
								alt={artist.name}
							/>
						) : (
							<div>No Image</div>
						)}
						{artist.name}
					</div>
				))}
			</div>

			<div>
				<h2>Tracks</h2>
				{tracks.map((track) => (
					<div key={track.id}>
						{track.album.images.length ? (
							<img
								width={"200px"}
								height={"200px"}
								src={track.album.images[0].url}
								alt={track.name}
							/>
						) : (
							<div>No Image</div>
						)}
						{track.name}
					</div>
				))}
			</div>

			<div>
				<h2>Albums</h2>
				{albums.map((album) => (
					<div key={album.id}>
						{album.images.length ? (
							<img
								width={"200px"}
								height={"200px"}
								src={album.images[0].url}
								alt={album.name}
							/>
						) : (
							<div>No Image</div>
						)}
						{album.name}
					</div>
				))}
			</div>
		</div>
	);
}
