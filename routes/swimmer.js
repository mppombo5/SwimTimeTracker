'use strict';

const express = require('express');
const router = express.Router();
const Swimmer = require("../models/swimmer");
const utils = require("../util/utils");
const swimmer_ctl = require("../controllers/swimmerController");

// Swimmer home page, maybe search
router.get('/', swimmer_ctl.index);

router.get("/:id", function id_get(req, res, next) {
  let swimmerId = req.params.id;
  Swimmer.findById(swimmerId, "lastname firstname times")
    .exec(function queryExec(err, swimmer_info) {
      if (err) {
        console.log(`Error on findById!\n${err}`);
        res.render('error', {
          message: "An error has occurred!",
          error: err
        });
        return next(err);
      }
      // Successful, render
      if (swimmer_info) {
        let title = "Swim Time Tracker - Swimmer Info";
        let swimmerName = swimmer_info.fullname;
        let eventsArr = utils.makeEventsArrForRender(swimmer_info);
        console.debug(`timesArr: ${JSON.stringify(eventsArr)}`);
        let meetNames = utils.getMeetNamesArray();
        res.render('swimmer', {
          title,
          swimmerName,
          eventsArr,
          meetNames,
        });
        //res.send(swimmer_info);
      }
      else {
        res.status(404).render('error404', {
          title: "404: No swimmer found",
          message: `No swimmer could be found with the ID ${swimmerId}.`,
        });
      }
    });
});

module.exports = router;
