import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BrowseCategories() {
	const [categories, setCategories] = useState([]);
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"https://api.spotify.com/v1/browse/categories",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						params: {
							limit: 4, // Limiting to 10 trending tracks for demonstration
						},
					}
				);
				setCategories(response.data.categories.items);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		// Fetch categories when the component mounts
		fetchCategories();

		// Clean up function
		return () => {
			// Any cleanup code if needed
		};
	}, [token]);

	console.log(categories);

	return (
		<div>
			<div className="title">
				<h3>Browse Categories</h3>
				<p>More</p>
			</div>
			<ul className="category-grid">
				{categories.map((category) => (
					<li
						key={category.id}
						className="category-item">
						<img
							src={category.icons[0].url}
							alt={category.name}
							className="category-image"
						/>
						<p className="category-name">{category.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
