var auth = require('../app/config/auth');
var slack = require('slack-notify')(auth.slack);
var Coffee = require('../app/schemas/coffee');

var request = require('request');
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var errorImageUrl = 'https://cdn2.iconfinder.com/data/icons/toolbar-signs-4/512/' +
  'fail_delete_agt_action_usb-512.png';
var successImageUrl = 'https://webservices.tranware.net/TA/relay/success.png';

var title = 'posttitle_value';
var date = 'posttext_value';
var image = 'attachment_image';
var description = 'post_contents';
var links = 'post_links';

mongoose.connect(auth.mongoConnection);

mongoose.connection.on('connected', function() {
  request(auth.coffeeBeanUrl, function(error, response, body) {
    if (error) {
      console.error('Couldn\'t get coffee beans');
      process.exit(1);
    }
    body = JSON.parse(body);
    var latestCoffeeBean = body.results[0];

    var coffeeBean = {
      title: getTitle(latestCoffeeBean),
      startDate: getDate(latestCoffeeBean),
      endDate: undefined,
      image: getImage(latestCoffeeBean),
      description: getDescription(latestCoffeeBean),
      webpages: getLinks(latestCoffeeBean),
      djakneID: uuid.v4(),
    };

    coffeeBean.endDate = new Date(coffeeBean.startDate.getFullYear(),
      coffeeBean.startDate.getMonth(), coffeeBean.startDate.getDate() + 4, '18');

    coffeeBean.startDate = coffeeBean.startDate.toISOString();
    coffeeBean.endDate = coffeeBean.endDate.toISOString();

    saveToMongo(coffeeBean);
  });
});

var saveToMongo = function(coffeeBean) {
  Coffee.findOne({startDate: coffeeBean.startDate}, function(err, coffee) {
    if (err) {
      handleMongoError(err);
    } else if (!coffee) {
      var newCoffee = new Coffee(coffeeBean);
      newCoffee.save(function(err, resp) {
        if (err) {
          handleMongoError(err);
        } else {
          handleMongoSuccess('Coffeebean was added successfully');
        }
      });
    } else {
      handleMongoSuccess('Coffeebean already exists');
    }
  });
};

var handleMongoSuccess = function(message) {
  slack.send({
    channel: '#coffee-bean-scraping',
    icon_url: successImageUrl,
    text: message,
    unfurl_links: 1,
    username: 'Coffeebean',
  });
};

var handleMongoError = function(errorMessage) {
  console.error(errorMessage);
  slack.send({
    channel: '#coffee-bean-scraping',
    icon_url: errorImageUrl,
    text: 'Problems with MongoDB:\n' + JSON.stringify(errorMessage),
    unfurl_links: 1,
    username: 'Coffeebean',
  });
};

var handleErrorWithParameters = function(errorMessage) {
  console.error(errorMessage);
  slack.send({
    channel: '#coffee-bean-scraping',
    icon_url: errorImageUrl,
    text: 'Some parameters where missing, couldn\'t add coffee bean information to MongoDB\n' +
      'Error:\n' + errorMessage,
    unfurl_links: 1,
    username: 'Coffeebean',
  });
};

var getLinks = function(coffeeBean) {
  if (!coffeeBean[links]) {
    handleErrorWithParameters('Coffee bean description is wrong, either undefined or string');
    process.exit(1);
  }
  if (typeof coffeeBean[links] === 'string') {
    return [coffeeBean[links]];
  }
  return coffeeBean[links];
};

var getDescription = function(coffeeBean) {
  if (!coffeeBean[description]) {
    handleErrorWithParameters('Coffee bean description is wrong, either undefined or string');
    process.exit(1);
  }
  var desc = '';
  for (var i = 0; i < coffeeBean[description].length; i++) {
    desc += coffeeBean[description][i];
    if (i < coffeeBean[description].length - 1) {
      desc += '\n';
    }
  }
  return desc;
};

var getImage = function(coffeeBean) {
  if (!coffeeBean[image] && typeof coffeeBean[image] !== 'string') {
    handleErrorWithParameters('Coffee bean image is wrong, either undefined or string');
    process.exit(1);
  }
  return coffeeBean[image];
};

var getDate = function(coffeeBean) {
  if (!coffeeBean[date] && typeof coffeeBean[date] !== 'string') {
    handleErrorWithParameters('Coffee bean date is wrong, either undefined or string');
    process.exit(1);
  }
  var dateSplitted = coffeeBean[date].split(' ');
  var year = dateSplitted[2].trim();
  var month = getMonth(dateSplitted[1].trim());
  var day = dateSplitted[0].trim();

  return new Date(year, month, day, '08');
};

var getTitle = function(coffeeBean) {
  if (!coffeeBean[title] && typeof coffeeBean[title] !== 'string') {
    handleErrorWithParameters('Coffee bean title is wrong, either undefined or string');
    process.exit(1);
  }
  return coffeeBean[title];
};

var getMonth = function(month) {
  month = month.substring(0, month.length - 1);
  switch (month) {
    case 'januari': {return 0;}
    case 'februari': {return 1;}
    case 'mars': {return 2;}
    case 'april': {return 3;}
    case 'maj': {return 4;}
    case 'juni': {return 5;}
    case 'juli': {return 6;}
    case 'augusti': {return 7;}
    case 'september': {return 8;}
    case 'oktober': {return 9;}
    case 'november': {return 10;}
    case 'december': {return 11;}
  }
};
