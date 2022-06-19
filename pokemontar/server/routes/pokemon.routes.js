const express = require('express');
const app = express();
const pokemonRoute = express.Router();

let Models = require('../Models');
let Pokemon = Models.pokemon;

pokemonRoute.route('/addP').post((req, res, next) => {
    Pokemon.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

pokemonRoute.route('/getallP').get((req, res) => {
    Pokemon.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

pokemonRoute.route('/getPid').get((req, res) => {
    Pokemon.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

pokemonRoute.route('/updatePid').put((req, res, next) => {
    Pokemon.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

pokemonRoute.route('/deletePid').delete((req, res, next) => {
    Pokemon.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = pokemonRoute;