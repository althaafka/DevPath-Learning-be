module.exports = app => {
  require('./user')(app);
  require('./class')(app);
};
