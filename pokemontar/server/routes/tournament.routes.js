const express = require("express");
const app = express();
const tournamentRoute = express.Router();

let Models = require("../Models");
let Tournament = Models.tournament;

tournamentRoute.route("/addTO").post((req, res, next) => {
	Tournament.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

tournamentRoute.route("/getallTO").get((req, res) => {
	Tournament.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

tournamentRoute.route("/getTOid").get((req, res) => {
	Tournament.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

tournamentRoute.route("/updateTOid").put((req, res, next) => {
	Tournament.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log("Data updated successfully");
			}
		}
	);
});

tournamentRoute.route("/deleteTOid").delete((req, res, next) => {
	Tournament.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

module.exports = tournamentRoute;
