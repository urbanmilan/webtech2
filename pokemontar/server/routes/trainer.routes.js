const express = require('express');
const app = express();
const trainerRoute = express.Router();

let Models = require('../Models');
let Trainer = Models.trainer;

trainerRoute.route('/addTR').post((req, res, next) => {
    Trainer.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
        }
    });
});

trainerRoute.route('/getallTD').get((req, res) => {
    Trainer.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

trainerRoute.route('/getTRid').get((req, res) => {
    Trainer.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

trainerRoute.route('/updateTRid').put((req, res, next) => {
    Trainer.findByIdAndUpdate(req.params.id, {
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

trainerRoute.route('/deleteTRid').delete((req, res, next) => {
    Trainer.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = trainerRoute;