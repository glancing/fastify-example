const bruh = require('../../src/gens/bruh');
const Hawk = require('hawk');

const credentialsFunc = function () {

    const credentials = {
        key: process.env.HAWK_KEY,
        algorithm: 'sha256'
    };

    return credentials;
};


module.exports = function(fastify, options, done){
    
    const opts = {
        schema: {
            type: 'object',
            properties: {
              apiKey: { type: 'string' },
              site: { type: 'string' }
            }
        }
    };
    
    fastify.post('/', opts, async function (request, reply) {

        let authed;

        try {
            await Hawk.server.authenticate(request, credentialsFunc);
            authed = true;
        } catch (error) {
            authed = false;
        }

        if(authed){
            let reqBody = request.body;
            console.log(reqBody.apiKey, reqBody.site);
            let botCookie = bruh();
            reply.send({ cookie: botCookie });
        } else {
            reply.send({ error: "Unauthorized" });
        }

    });

    done();
}