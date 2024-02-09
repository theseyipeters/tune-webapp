import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

export default function Trending() {
	const [trendingTrackIds, setTrendingTrackIds] = useState([]);
	const [trendingTracks, setTrendingTracks] = useState([]);
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		const fetchTrendingTrackIds = async () => {
			try {
				const response = await axios.get(
					"https://api.spotify.com/v1/browse/new-releases",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						params: {
							limit: 11, // Limiting to 10 trending tracks for demonstration
						},
					}
				);
				const ids = response.data.albums.items.map((album) => album.id);
				setTrendingTrackIds(ids);
			} catch (error) {
				console.error("Error fetching trending track IDs:", error);
			}
		};

		// Fetch trending track IDs when the component mounts
		fetchTrendingTrackIds();
	}, [token]);

	useEffect(() => {
		const fetchTrendingTracks = async () => {
			try {
				const promises = trendingTrackIds.map((id) =>
					axios.get(`https://api.spotify.com/v1/albums/${id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				);
				const responses = await Promise.all(promises);
				const tracks = responses.map((response) => response.data);
				setTrendingTracks(tracks);
			} catch (error) {
				console.error("Error fetching trending tracks:", error);
			}
		};

		// Fetch additional information for trending tracks when the track IDs are available
		if (trendingTrackIds.length > 0) {
			fetchTrendingTracks();
		}
	}, [trendingTrackIds, token]);

	const playPreview = (previewURL) => {
		const audio = new Audio(previewURL);
		audio.play();
	};

	console.log(trendingTrackIds);
	console.log(trendingTracks);

	return (
		<div>
			<div className="title">
				<h3>Trending</h3>
				<p>More</p>
			</div>
			<ul className="category-grid">
				{trendingTracks.map((track) => (
					<li key={track.id}>
						<img
							className="rounded-sm"
							src={track.images[0].url}
							alt=""
						/>
						<small>
							{track.name.length > 20
								? track.name.substring(0, 20) + "..."
								: track.name}{" "}
							- {track.artists.map((artist) => artist.name).join(", ")}
						</small>
						<div
							className="play-button-overlay"
							onClick={() => playPreview(track.preview_url)}>
							<span className="play-icon">▶</span>
						</div>
					</li>
				))}
				<div className="bg-black text-center flex justify-center items-center hover:bg-[#100b01] hover:border border-[#fcfcfc] rounded-md">
					More
				</div>
			</ul>
		</div>
	);
}
