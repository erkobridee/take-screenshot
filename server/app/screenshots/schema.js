var Joi = require('joi');

module.exports = (function() {

  return {
    url: Joi.string().required(),
    screenshot: Joi.string(),
    resize: Joi.string(),
    delay: Joi.number()
  };

})();
