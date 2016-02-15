# Code Standards

## Table of contents

### Formatting
* [2 Spaces for indentation](#2-spaces-for-indentation)
* [Use Semicolons](#use-semicolons)
* [80 characters per line](#80-characters-per-line)
* [Use single quotes](#use-single-quotes)
* [Opening braces go on the same line](#opening-braces-go-on-the-same-line)
* [Always use braces](#always-use-braces)
* [Declare one variable per var statement](#declare-one-variable-per-var-statement)

### Naming Conventions
* [Use lowerCamelCase for variables, properties and function names](#use-lowercamelcase-for-variables-properties-and-function-names)
* [Use UpperCamelCase for class names](#use-uppercamelcase-for-class-names)
* [Use UPPERCASE for Constants](#use-uppercase-for-constants)

### Conditionals
* [Use the === operator](#use-the--operator)
* [Use descriptive conditions](#use-descriptive-conditions)

### Functions
* [Write small functions](#write-small-functions)
* [Return early from functions](#return-early-from-functions)
* [Name your closures](#name-your-closures)
* [No nested closures](#no-nested-closures)
* [Method chaining](#method-chaining)

### Comments
* [Use slashes for comments](#use-slashes-for-comments)

### Miscellaneous
* [](#)
* [Do not extend built-in prototypes](#do-not-extend-built-in-prototypes)

### Formatting

#### 2 Spaces for indentation
We use 2 spaces for indentation. Make sure that your text editors settings is set to use 2 spaces.

#### Use semicolons
We are using semicolons. Tips is to add this configuration to your .jshintrc file

#### 80 characters per line
Limit your lines to 80 characters. Make sure that your editor is displaying the line at 80 characters.

#### Use single quotes
Use single quotes, unless you are writing JSON.

*Right:*
```js
var foo = 'bar';
```

*Wrong:*
```js
var foo = "bar";
```

#### Opening braces go on the same line
Your opening braces go on the same line as the statement.

*Right:*
```js
if (true) {
  console.log('winning');
}
```

*Wrong:*
```js
if (true)
{
  console.log('losing');
}
```

#### Always use braces
This will help the future you if you want to add some code to a block.

*Right:*
```js
if (true) {
  console.log('winning');
}

while (true) {
  console.log('winning');
}
```

*Wrong:*
```js
if (true)
  console.log('losing');

while (true)
  console.log('losing');
```

#### Declare one variable per var statement
Declare one variable per var statement, it makes it easier to re-order the lines.

*Right:*
```js
var keys   = ['foo', 'bar'];
var values = [23, 42];

var object = {};
while (keys.length) {
  var key = keys.pop();
  object[key] = values.pop();
}
```

*Wrong:*
```js
var keys = ['foo', 'bar'],
    values = [23, 42],
    object = {},
    key;

while (keys.length) {
  key = keys.pop();
  object[key] = values.pop();
}
```

### Naming Conventions

#### Use lowerCamelCase for variables, properties and function names
Variables, properties and function names should use `lowerCamelCase`.  They should also be descriptive.

*Right:*
```js
var adminUser = db.query('SELECT * FROM users ...');
```

*Wrong:*
```js
var admin_user = db.query('SELECT * FROM users ...');
```

#### Use UpperCamelCase for class names
*Right:*
```js
function BankAccount() {

}
```

*Wrong:*
```js
function bank_Account() {

}
```

#### Use UPPERCASE for Constants
*Right:*
```js
var SECOND = 1 * 1000;

function File() {

}
File.FULL_PERMISSIONS = 0777;
```

*Wrong:*
```js
const SECOND = 1 * 1000;

function File() {

}
File.fullPermissions = 0777;
```

### Conditionals

#### Use the === operator

Use the triple equality operator as it will work just as expected.

*Right:*
```js
var a = 0;
if (a !== '') {
  console.log('winning');
}
```

*Wrong:*
```js
var a = 0;
if (a == '') {
  console.log('losing');
}
```

#### Use descriptive conditions
Any non-trivial conditions should be assigned to a descriptively named variable or function:

*Right:*
```js
var isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);

if (isValidPassword) {
  console.log('winning');
}
```

*Wrong:*
```js
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing');
}
```

### Functions

#### Write small functions
Keep your functions short. A good function fits on a slide that the people in the last row of a big room can comfortably read. So don't count on them having perfect vision and limit yourself to ~15 lines of code per function.

#### Return early from functions
To avoid deep nesting of if-statements, always return a function's value as early as possible.

*Right:*
```js
function isPercentage(val) {
  if (val < 0) {
    return false;
  }

  if (val > 100) {
    return false;
  }

  return true;
}
```

*Wrong:*
```js
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

#### Name your closures
Feel free to give your closures a name. It shows that you care about them, and will produce better stack traces, heap and cpu profiles.

*Right:*
```js
req.on('end', function onEnd() {
  console.log('winning');
});
```

*Wrong:*
```js
req.on('end', function() {
  console.log('losing');
});
```

#### No nested closures
Use closures, but don't nest them. Otherwise your code will become a mess.

*Right:*
```js
setTimeout(function() {
  client.connect(afterConnect);
}, 1000);

function afterConnect() {
  console.log('winning');
}
```

*Wrong:*
```js
setTimeout(function() {
  client.connect(function() {
    console.log('losing');
  });
}, 1000);
```

#### Method chaining
One method per line should be used if you want to chain methods.

You should also indent these methods so it's easier to tell they are part of the same chain.

*Right:*
```js
User
  .findOne({ name: 'foo' })
  .populate('bar')
  .exec(function(err, user) {
    return true;
  });
```

*Wrong:*
```js
User
.findOne({ name: 'foo' })
.populate('bar')
.exec(function(err, user) {
  return true;
});

User.findOne({ name: 'foo' })
  .populate('bar')
  .exec(function(err, user) {
    return true;
  });

User.findOne({ name: 'foo' }).populate('bar')
.exec(function(err, user) {
  return true;
});

User.findOne({ name: 'foo' }).populate('bar')
  .exec(function(err, user) {
    return true;
  });
```

### Comments

### Use slashes for comments
Use slashes for both single line and multi line comments. Try to write comments that explain higher level mechanisms or clarify difficult segments of your code. Don't use comments to restate trivial things.

*Right:*
```js
// 'ID_SOMETHING=VALUE' -> ['ID_SOMETHING=VALUE', 'SOMETHING', 'VALUE']
var matches = item.match(/ID_([^\n]+)=([^\n]+)/));

// This function has a nasty side effect where a failure to increment a
// redis counter used for statistics will cause an exception. This needs
// to be fixed in a later iteration.
function loadUser(id, cb) {
  // ...
}

var isSessionValid = (session.expires < Date.now());
if (isSessionValid) {
  // ...
}
```

*Wrong:*
```js
// Execute a regex
var matches = item.match(/ID_([^\n]+)=([^\n]+)/);

// Usage: loadUser(5, function() { ... })
function loadUser(id, cb) {
  // ...
}

// Check if the session is valid
var isSessionValid = (session.expires < Date.now());
// If the session is valid
if (isSessionValid) {
  // ...
}
```

### Miscellaneous

#### Requires At Top
Always put requires at top of file to clearly illustrate a file's dependencies. Besides giving an overview for others at a quick glance of dependencies and possible memory impact, it allows one to determine if they need a package.json file should they choose to use the file elsewhere.

#### Divide node/npm and project requires
Divide npm and core node packages from the project packages.

#### Do not extend built-in prototypes
Do not extend the prototype of native JavaScript objects. Your future self will be forever grateful.

*Right:*
```js
var a = [];
if (!a.length) {
  console.log('winning');
}
```

*Wrong:*
```js
Array.prototype.empty = function() {
  return !this.length;
}

var a = [];
if (a.empty()) {
  console.log('losing');
}
```
