'use strict'

const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.0"
    })
});
module.exports = router;