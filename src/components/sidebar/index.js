// import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import logo from "../../assets/tunelogo.svg";
// import profile from "./sugarboy.png";
import apiClient from "../../spotify";
import "./sidebar.css";

export default function Sidebar() {
	const [userName, setUserName] = useState("");
	const [image, setImage] = useState("");
	const [followers, setFollowers] = useState("");

	useEffect(() => {
		apiClient.get("me").then((response) => {
			console.log(response);
			setUserName(response.data.display_name);
		});
	}, []);

	useEffect(() => {
		apiClient.get("me").then((response) => {
			setImage(response.data.images[0].url);
		});
	}, []);

	useEffect(() => {
		apiClient.get("me").then((response) => {
			setFollowers(response.data.followers.total);
		});
	}, []);

	const logout = () => {
		window.localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<div className="sidebar-container">
			<img
				className="logo"
				src={logo}
				alt=""
			/>

			<div className="nav-links">
				<div className="nav-link">
					<i className="fa-solid fa-house"></i> Home
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-arrow-trend-up"></i> Trends
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-square-rss"></i> Feed
				</div>
			</div>

			<small>Discover</small>
			<div className="nav-links">
				<div className="nav-link">
					<i className="fa-solid fa-file"></i> New and Notable
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-calendar-days"></i> Release Calendar
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-clapperboard"></i> Events
				</div>
			</div>

			<small>Your Collection</small>
			<div className="nav-links">
				<div className="nav-link">
					<i className="fa-solid fa-heart"></i> Favorite Songs
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-music"></i> Artist
				</div>
				<div className="nav-link">
					<i className="fa-solid fa-clapperboard"></i> Album
				</div>
			</div>

			<div className="profile">
				<img
					className="pic"
					src={image}
					alt=""
				/>
				<div className="info">
					<p className="name">{userName}</p>
					<small>{followers} followers</small>
				</div>

				<i
					onClick={logout}
					className="fa-solid fa-right-to-bracket"></i>
			</div>
		</div>
	);
}
