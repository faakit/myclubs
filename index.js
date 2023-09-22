// this file is read when running inside a google cloud function

module.exports = {
  app: require('./dist/serverlessExport').default
};
