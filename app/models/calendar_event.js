
var CalendarEvent = function(summary, description, startTime, endTime) {
  this.summary = summary;
  this.location = 'Djäkne Kaffebar Konferensrum';
  this.description = description;
  this.start = {
    dateTime: startTime,
    timeZone: 'Europe/Stockholm',
  };
  this.end = {
    dateTime: endTime,
    timeZone: 'Europe/Stockholm',
  };
};

CalendarEvent.prototype.toJson = function() {
  return JSON.stringify(this);
};

CalendarEvent.prototype.toString = function() {
  return this;
};

module.exports = CalendarEvent;
