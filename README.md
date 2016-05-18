#Djäkne Kaffebar

#Endpoints

## POST
#### /coffee
Inserts a new coffeebean into the database

##### body
```json
{
     "title" : "text",
     "description" : "text",
     "startDate" : "2016-06-18 08:00:00",
     "endDate" : "2016-06-23 08:00:00",
     "image" : "http://www.test.com/test.jpg",
     "webpage" : "http://www.test.com/"
}
```

#### /calendar
Inserts a new calendar-event into Google Calendar

##### body
```json
{
     "summary": "text",
     "description": "text",
     "startTime": "2016-06-18 08:00:00",
     "endTime": "2016-06-18 10:00:00"
}
```

#### /events
Inserts a new event into the database

##### body
```json
{
     "title": "text",
     "text": "text",
     "author": "text",
     "date": "2016-06-18 10:00:00",
     "location": "text"
}
```

#### /events/register/:id
Registers a user to an existing event

##### body
```json
{
     "token": "linkedin_token"
}
```

#### /retrotv/request
Requests a giphy for the retrotv

##### body
```json
{
     "token":  "linkedin_token",
     "giphy": "text"
}
```

## GET
#### /coffee/history
Returns list of coffee from all previous weeks including current

##### response
```json
{
  "data":[
    {
      "description":"text",
      "djakneID":"id",
      "endDate":"2016-04-22T16:00:00.000Z",
      "image":"url",
      "startDate":"2016-04-18T06:00:00.000Z",
      "title":"text",
      "voted":["id","id"],
      "webpages":["url"],
      "five":0,
      "four":1,
      "three":0,
      "two":0,
      "one":0,
      "averageVotes":"4.0",
      "totalVotes":1
    },
    { ... }
  ]
}
```

#### /coffee/current
Returns only coffee from the current week

##### response
```json
{
  "data": {
    "description":"text",
    "djakneID":"id",
    "endDate":"2016-04-22T16:00:00.000Z",
    "image":"url",
    "startDate":"2016-04-18T06:00:00.000Z",
    "title":"text",
    "voted":["id","id"],
    "webpages":["url"],
    "five":0,
    "four":1,
    "three":0,
    "two":0,
    "one":0,
    "averageVotes":"4.0",
    "totalVotes":1
  }
}
```

#### /coffee/:id
Returns coffee from id

##### response
```json
{
  "data": {
    "description":"text",
    "djakneID":"id",
    "endDate":"2016-04-22T16:00:00.000Z",
    "image":"url",
    "startDate":"2016-04-18T06:00:00.000Z",
    "title":"text",
    "voted":["id","id"],
    "webpages":["url"],
    "five":0,
    "four":1,
    "three":0,
    "two":0,
    "one":0,
    "averageVotes":"4.0",
    "totalVotes":1
  }
}
```

#### /calendar
Returns list of events in calendar

##### Params
- **timeMin**: Days from today. Providing negative number will look for event before the day the request is sent. So if today
- is the 16 of May and you provide _-4_ then timeMin will be the 12 of May.
- **timeMax**: Days from today. Providing negative number will look for event before the day the request is sent. So if today
- is the 16 of May and you provide _-4_ then timeMin will be the 12 of May.
- **limit**: Max returned calendar events.

##### response
```json
{
  "data": [
    {
      "id":"id",
      "status":"confirmed",
      "htmlLink":"url",
      "created":"2016-05-09T09:03:27.000Z",
      "description":"text",
      "creator":{
        "email":"url"
      },
      "start":{
        "dateTime":"2016-05-10T10:40:07+02:00",
        "timeZone":"Europe/Stockholm"
      },
      "end":{
        "dateTime":"2016-05-10T20:40:07+02:00",
        "timeZone":"Europe/Stockholm"
      }
    },
    { ... }
  ]
}
```

#### /events
Returns list of events with list of all attendants

##### Params
- **dateFrom**: A start date in ISO standard, 2016-05-05T09:02:00.000Z
- **dateTo**: A start date in ISO standard, 2016-05-05T09:02:00.000Z

##### response
```json
{
  "data": [
    {
      "_id":"id",
      "author":"email",
      "date":"2016-05-05T09:02:00.000Z",
      "location":"text, text",
      "text":"text",
      "title":"text",
      "comments":[
        {
          "firstName":"text",
          "lastName":"text",
          "memberId":"id",
          "comment":"text",
          "_id":"id",
          "date":"2016-05-04T09:08:44.844Z"
        },
        { ... }
      ],
      "attendantsId":["id"],
      "attendants":[
        {
          "id":"id",
          "firstName":"text",
          "lastName":"text",
          "image":"text",
          "headline":"text",
          "linkedInProfile":"url",
          "_id":"id"
        },
        { ... }
      ]
    },
    { ... }
  ]
}
```

#### /wifi?token=[token]
Returns wifi-login, if user is premium, premium wifi is included.

##### response
``` json
{
  "data": {
    "group":"text",
    "wifiName":"text",
    "wifiPassword":"text"
  }
}
```

#### /member?ids=[id],[id]
Returns member from input id

##### response
``` json
{
  "data": [
    {
      "id": "id",
      "firstName":"text",
      "lastName":"text",
      "linkedInProfile":"url",
      "headline":"text",
      "interests":"text",
      "image":"text"
    },
    { ... }
  ]
}
```

#### /member/today

Returns list of members that placed orders today

##### response
``` json
{
  "data": [
    {
      "id":"id",
      "firstName":"text",
      "lastName":"text",
      "linkedInProfile":"url",
      "headline":"text",
      "interests":"text",
      "image":"text"
    },
    { ... }
  ]
}


#### /menu/categories

Returns lists of products sorted into correct categories

##### response
``` json
{
  "data":{
    "Coffee":[
      {
        "name":"Espresso",
        "id":1,
        "price":18,
        "category":"Kaffe"
      },
      { ... }
    ],
    "Cold drink": [
      { ... }
    ]
  }
}
```
/retrotv

Returns a self-updating webpage

## PUT

#### /coffee/vote

##### body
``` json
{      
  "vote": 1-5,      
  "token": "token"
}
```

## DELETE

#### /events/:id
Removes an event from id.

#### /calendar/:id
Removes a calendar event from id


# Setup
## MongoDB
Djäkne backend API requires MongoDB to store data.

For installation see: <https://docs.mongodb.org/manual/installation/>
## Auth
The API stores sensitive data in /app/config/auth.js.
Data:
```javascript
auth.calendar = {
 calendarId: 'id',
 type: 'type',
 projectId: 'id',
 privateKeyId: 'id',
 privateKey: 'key',
 clientEmail: 'url',
 clientId: 'id',
 authUri: 'url',
 tokenUri: 'url',
 authProviderX509CertUrl: 'url',
 clientX509CertUrl: 'url',
}

auth.mongoUrl = 'your_host:port';
auth.mongoConnection = 'mongodb://' + auth.mongoUrl + '/djakne';

auth.mysql = {
  host: 'host',
  port: 'port',
  user: 'user',
  password: 'password',
  database: 'database',
};

auth.wifiPassword = {
 premium: 'password',
 member: 'password',
};
```
## Node Package Manager
To install dependencies run: npm install

To start API server run: npm start
