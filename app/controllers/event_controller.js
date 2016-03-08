var mongoService = require('../services/mongo_event_service');
var EventModel = require('../models/event_model');

var controller = {};
var error = {};

controller.post = function(req, res) {

  console.log('i events/ post');

  var eventToAdd = createAndValidateEventModel(req);
  console.log('här');
  if (eventToAdd === null) {
    return res.status(400).send({message: 'The parameters for the event were wrong'});
  }
  mongoService.insertEvent(eventToAdd, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('Event added : ' + result.id);
    console.log(res);
    return res.status(200).send(result);
  });
};

controller.get = function(req, res) {
  var query = {};
  var queryParamsExists = Object.keys(req.query).length !== 0;

  if (queryParamsExists) {
    query = buildQuery(req);
  }
  mongoService.getEvents(query, function(err, resultFromDB) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    var response = {
      result: resultFromDB,
    };
    res.send(response);
  });
};

var buildQuery = function(req, res) {
  var query = {
    date: {},
  };
  if (req.query.dateFrom !== undefined) {
    query.date.$gte = new Date(req.query.dateFrom);
  }
  if (req.query.dateTo !== undefined) {
    query.date.$lt = new Date(req.query.dateTo);
    /* if (req.query.dateFrom !== undefined) {
      if (!dateToIsValid(req.query.dateFrom, req.query.dateTo)) {
        console.log('fel !! ');
        error = {message: 'The dateTo-parameter must be later in time than dateFrom'};
      }
    } */
  }
  return query;
};

var dateToIsValid = function(dateFrom, dateTo) {
  return new Date(dateTo).getDate() > new Date(dateFrom).getDate();
};

var createAndValidateEventModel = function(req) {

  console.log('i createAndValidateEventModel ' + req.body.title);
  var title = req.body.title;
  var text = req.body.text;
  var author = req.body.author;
  var date = req.body.date;

  var eventToAdd = new EventModel(title, text, author, date);
  console.log('skapat event : ' + JSON.stringify(eventToAdd, null, 4));
  if (eventToAdd.validate()) {
    console.log(JSON.stringify(eventToAdd, null, 4));
    return eventToAdd;
  }
  return null;
};

module.exports = controller;
