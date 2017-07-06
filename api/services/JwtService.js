module.exports = {

  issue: (payload, expiresIn) => {
    const jwt = require('jsonwebtoken');

    return jwt.sign({
        payload
      }, 'secret12323hgda',
      {expiresIn});
  }

};
