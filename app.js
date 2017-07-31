var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//APIs
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dwemi')
var Groups = require('./models/groups.js')
//----->>>> GET GROUPS <<<---------
app.get('/groups', function(req, res) {
  Groups.find(function(err, groups) {
    if (err) {
      throw err
    }
    res.json(groups)
  })

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
});
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
