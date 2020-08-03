const express = require("express"); // CommonJs modules
const shortid = require("shortid");
const server = express();
server.use(express.json()); // teaches express how to read JSON from body

// data schema for users
// {
//   id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }

let users = [
	{
		id: shortid.generate(),
		name: "Brian",
		bio: "Lambda Student",
	},
	{
		id: shortid.generate(),
		name: "Bryan",
		bio: "Not a clone.",
	},
	{
		id: shortid.generate(),
		name: "Brion",
		bio: "Not a clone.",
	},
];

// GET REQUEST -- WORKING
server.get("/api/users", (req, res) => {
	res.status(200).json(users);
});
// GET REQUEST BY ID -- WORKING
server.get("/api/users/:id", (req, res) => {
	const id = req.params.id;

	let target = users.find((a) => a.id === id);

	if (!target) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	} else {
		let user = users.filter((a) => a.id === id);
		res.status(200).json(user);
	}
});
// POST REQUEST -- WORKING
server.post("/api/users", (req, res) => {
	const user = req.body;

	user.id = shortid.generate();

	if (!user.name || !user.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		users.push(user);
		res.status(201).json(users);
	}
});
// PUT REQUEST -- WORKING
server.put("/api/users/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	let target = users.find((a) => a.id === id);
	let found = users.find((a) => a.id === id);

	if (!target) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	} else if (!changes.name || !changes.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else if (found) {
		Object.assign(found, changes);

		res.status(200).json(users);
	}

	// if (found) {
	// 	Object.assign(found, changes);

	// 	res.status(200).json(users);
	// } else {
	// 	res
	// 		.status(404)
	// 		.json({ message: "The user with the specified ID does not exist." });
	// }
});
// DELETE REQUEST -- WORKING
server.delete("/api/users/:id", (req, res) => {
	const id = req.params.id;
	let deleteTarget = users.find((a) => a.id === id);

	if (!deleteTarget) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	} else {
		users = users.filter((u) => u.id !== id);
		res.status(204).end();
	}
});

const port = 8000;
server.listen(port, () => console.log("server running..."));
