let express = require("express");
(path = require("path")),
	(mongoose = require("mongoose")),
	(cors = require("cors")),
	(bodyParser = require("body-parser"));

let dbConfig = require("./database/db");
let pokemonRoute = require("./routes/pokemon.routes");
let tournamentRoute = require("./routes/tournament.routes");
let trainerRoute = require("./routes/trainer.routes");
let userRoute = require("./routes/user.routes");

let now = new Date();
const port = process.env.PORT || 3003;

mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		() => {
			console.log("Database successfully connected");
		},
		(error) => {
			console.log("Database could not connected: " + error);
		}
	);

const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/pokemontar")));
app.use("/", express.static(path.join(__dirname, "dist/pokemontar")));
app.use("/serv", pokemonRoute);
app.use("/serv", tournamentRoute);
app.use("/serv", trainerRoute);
app.use("/serv", userRoute);

const server = app.listen(port, () => {
	console.log(
		"Listening on port: " +
			port +
			" Time: " +
			now.getHours() +
			":" +
			now.getMinutes() +
			":" +
			now.getSeconds()
	);
});
