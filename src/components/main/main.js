import React, { useState, useEffect } from "react";
import Search from "./search";
import Trending from "./trending";
import Playbar from "./playbar";
import Results from "./results";
import BrowseCategories from "./browsecategories"; // Assuming you have a component for Browse Categories
import "./main.css";

export default function Main() {
	const [tracks, setTracks] = useState([]);
	const [artists, setArtists] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [currentTrack, setCurrentTrack] = useState(null);
	const [searchMade, setSearchMade] = useState(false); // State to track if search is made

	const audioRef = React.createRef(); // Create the audio ref

	useEffect(() => {
		console.log(tracks, "Logging tracks from Main Component");
	}, [tracks]);

	useEffect(() => {
		console.log(artists, "Logging artist from Main Component");
	}, [artists]);

	useEffect(() => {
		console.log(albums, "Logging artist from Main Component");
	}, [albums]);

	return (
		<div className="main">
			<Search
				setSearchArtists={setArtists}
				setSearchTracks={setTracks}
				setSearchAlbum={setAlbums}
				setSearchMade={setSearchMade} // Pass setSearchMade function to track search
			/>

			{/* Conditionally render BrowseCategories or Results based on searchMade state */}
			{searchMade ? (
				<Results
					results={{ artists, tracks, albums }}
					audioRef={audioRef}
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					tracks={tracks}
				/>
			) : (
				<>
					<BrowseCategories />
					<Trending />
				</>
			)}
			<div>
				<Playbar
					audioRef={audioRef}
					currentTrack={currentTrack}
					tracks={tracks}
					setCurrentTrack={setCurrentTrack}
				/>
			</div>
		</div>
	);
}
