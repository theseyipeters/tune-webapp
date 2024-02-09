import React from "react";
import { loginEndPoint } from "../../spotify";
import "./login.css";
import tune from "../../assets/tunelogo.svg";
import "../../App.css";

export default function Login() {
	return (
		<div className="login-page">
			<img
				src={tune}
				alt="logo-spotify"
				className="logo"
			/>
			<h1 className="text-[#fcfcfc]">Sign in to your Spotify account</h1>
			<a href={loginEndPoint}>
				<button className="login-btn border border-[#fcfcfc] transition delay-150 hover:bg-white hover:ease-in hover:text-black ease-in-out">
					Login
				</button>
			</a>
		</div>
	);
}
