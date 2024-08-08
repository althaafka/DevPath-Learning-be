module.exports = app => {
  require('./user')(app);
  require('./class')(app);
  require('./class_membership')(app);
  require('./comment')(app);
};
