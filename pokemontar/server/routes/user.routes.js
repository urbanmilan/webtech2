const express = require("express");
const app = express();
const userRoute = express.Router();

let Models = require("../Models");
let User = Models.user;

userRoute.route("/addU").post((req, res, next) => {
	User.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

userRoute.route("/getallU").get((req, res) => {
	User.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

userRoute.route("/getU/:id").get((req, res) => {
	User.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

module.exports = userRoute;
