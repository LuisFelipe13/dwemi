var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var expressValidator = require('express-validator')
var session = require('express-session')
var flash = require('connect-flash')
var passport = require('passport')
var LocalStratedy = require('passport-local').Strategy
var logger = require('morgan')

// var routes = require('./routes/index')
// var users = require('./routes/users')
var app = express()
//View Engine
// app.set('views', path.join(__dirname, 'views'))
// app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
// app.set('view engine', 'handlebars')
app.use(logger('dev'))
//bodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))
//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

//Passport init
app.use(passport.initialize())
app.use(passport.session())

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}))
//Connect Flash
app.use(flash())
//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// app.use('/', routes)
// app.use('/users', users)

//APIs
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dwemi')
var db = mongoose.connection
var Groups = require('./models/groups.js')
var Users = require('./models/users.js')
//----->>>> GET GROUPS <<<---------
app.get('/groups', function(req, res) {
  Groups.find(function(err, groups) {
    if (err) {
      throw err
    }
    res.json(groups)
  })

})
//----->>>> GET USERS <<<---------
app.get('/users', function(req, res) {
  Users.find(function(err, users) {
    if (err) {
      throw err
    }
    res.json(users)
  })
})
//----->>>> FIND USER <<<---------
app.get('/users/many', function(req, res) {
  let ids = req.params.ids
  var usersArray = []
  ids.map(id => {
    Users.findOne({_id: id},function(err, user) {
      if (err) {
        throw err
      }
      usersArray.push(user)
    })
  })
  res.json(usersArray)
})
//----->>>> GET USER <<<---------
app.get('/users/:email/:password', function(req, res) {
  // console.log(req.params.email.toString());
  Users.findOne({"email": req.params.email}, function(err, user) {
    if (err) {
      throw err
    }
    // console.log(user);
    Users.comparePassword(req.params.password, user.password, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        console.log(user);
        res.json(user)
      } else {
        console.log("Invalid password");
        res.json({msg: "Invalid password"})
      }
    })
  })
})
//-----POST USER----------
app.post('/users', function(req, res) {
  console.log(req.body);
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const emailConfirmation = req.body.emailConfirmation
  const password = req.body.password
  const passwordConfirmation = req.body.passwordConfirmation
  //Validation
  req.checkBody('firstName', "First name is required").notEmpty()
  req.checkBody('lastName', "Last name is required").notEmpty()
  req.checkBody('email', "Email is required").notEmpty()
  req.checkBody('email', "This is not a valid email").isEmail()
  req.checkBody('emailConfirmation', "Email confirmation is required").notEmpty()
  req.checkBody('emailConfirmation', "Emails do not match").equals(req.body.email)
  req.checkBody('password', "Password is required").notEmpty()
  req.checkBody('passwordConfirmation', "Password confirmation is required").notEmpty()
  req.checkBody('passwordConfirmation', "Passwords do not match").equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    res.json({errors: errors})
  } else {
    let name = `${firstName} ${lastName}`
    let user = {
      name: name,
      email: email,
      password: password
    }
    Users.create(user, function(err, user) {
      if (err) {
        res.json(err)
      }
      res.json(user)
    })
  }
})
//-----POST GROUP----------
app.post('/groups', function(req, res) {
  let group = req.body;
  Groups.create(group, function(err, groups) {
    if (err) {
      throw err
    }
    res.json(groups)
  })
})
//-----POST FUND----------
app.put('/groups/:groupId/funds/', function(req, res) {
  let groupId = req.params.groupId
  Groups.findOne({_id: groupId}, function(err, group) {
    if (err) {
      throw err
    }
    group.funds.push(req.body)
    group.save(Groups)
    res.json(group)
  })
})
//---->>> DELETE GROUP <<<------
app.delete('/groups/:groupId/', function(req, res) {
  var query = {
    _id: req.params.groupId
  };
  Groups.remove(query, function(err, groups) {
    if (err) {
      throw err
    }
    res.json(groups)
  })
})
//---->>> DELETE FUND <<<------
app.delete('/groups/:groupId/funds/:fundId', function(req, res) {
  Groups.findOneAndUpdate({'funds._id':req.params.fundId},
  {
    $pull: { funds: { _id: req.params.fundId }}
  }, {new: true},
  function(err, groups) {
    if (err) {
      throw err
    }
    res.json(groups)
  })
})
//---->>> UPDATE GROUP <<<------
app.put('/groups/:_id', function(req, res) {
  var group = req.body
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      "groupName" : group.groupName,
      "funds" : [{
        'fundsName': fund.fundName,
        'image': fund.image,
        'description': fund.description,
        'goal': fund.goal,
        'balance': fund.balance
      }]
    }
  }
  // When true returns the updated document
  var options = {
    new: true
  }
  Groups.findOneAndUpdate(query, upgroupsdate,
    options,
    function(err, groups) {
      if (err) {
        throw err
      }
      res.json(groups)
    })
})
//END APIs

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,
    'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
