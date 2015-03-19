module.exports = (function() {

  var services = {
    take: take, // call phantomjs
    get: get, // mount file path
    check: check, // file exists
    sample: sample // post object
  };

  // TODO: define services
  //---

  function take( screenshotFor ) {}

  function check( id ) {}

  function get( id ) {}

  function sample() {
    return {
      schema: {
        url        : {
          type: 'String', required: true
        },
        screenshot : {
          type: 'String', required: false, default: '1024x768x0',
          comment: 'width x height x top'
        },
        resize     : {
          type: 'String', required: false, default: '250x200',
          comment: 'width x height'
        },
        delay      : {
          type: 'Number', required: false, default: 300,
          comment: 'time in ms'
        }
      },
      samples: [
        {
          url        : "https://github.com/erkobridee",
          screenshot : "1024x768x0",
          resize     : "250x200",
          delay      : 1000
        },
        {
          url        : "https://github.com/erkobridee",
          resize     : "350x300",
        }
      ]
    };
  }

  //---
  return services;

})();
