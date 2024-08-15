const express = require('express');

module.exports = (app) => {
  require('./user')(app);
  require('./class')(app);
  require('./class_membership')(app);
  require('./comment')(app);
  require('./review')(app);

  app.use('/uploads', express.static('assets/uploads'));
};
