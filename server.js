const fastify = require('fastify')({
    logger: true
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

fastify.register(require('./routes/v1/api'), { prefix: '/api' });

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    let json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  }
});

/*const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})*/

fastify.listen(3000, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});