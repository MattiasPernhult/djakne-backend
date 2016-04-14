var Calendar = function(id, status, htmlLink, created, summary, creator, start, end) {
  this.id = id;
  this.status = status;
  this.htmlLink = htmlLink;
  this.created = created;
  this.description = summary;
  this.creator = {
    email: creator.email,
    name: creator.displayName,
  };
  this.start = start;
  this.end = end;
};

module.exports = Calendar;
