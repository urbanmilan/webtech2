const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pokemonSchema = new Schema(
	{
		name: String,
		dateofcatch: Date,
		poke_ID: {
			type: Number,
			unique: true,
			required: true,
		},
		state: {
			type: String,
			enum: ["AVAILABLE", "KNOCK_OUT"],
			default: "AVAILABLE",
		},
		type: {
			type: String,
			enum: ["NORMAL", "GROUND", "FIRE", "ICE", "ELECTRIC", "FIGHTING"],
			default: "NORMAL",
		},
	},
	{
		collection: "pokemons",
	}
);

let tournamentSchema = new Schema(
	{
		dateofRegistry: Date,
		Pokemons: [],
	},
	{
		collection: "tournaments",
	}
);

let userSchema = new Schema(
	{
		username: String,
		password: String,
	},
	{
		collection: "users",
	}
);

let trainerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
		},
		trainer_ID: {
			type: Number,
			unique: true,
			required: true,
		},
		address: {
			city: String,
			street: String,
			house: Number,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		Tournaments: [],
	},
	{
		collection: "trainers",
	}
);

module.exports = {
	pokemon: mongoose.model("Pokemon", pokemonSchema),
	tournament: mongoose.model("Tournament", tournamentSchema),
	trainer: mongoose.model("Trainer", trainerSchema),
	user: mongoose.model("User", userSchema),
};