const swaggerUI = require('swagger-ui-express');
const yaml = require('js.yaml');
const fs = require('fs');
const path = require('path');

//Loading via yml.safeLoad to avoid errors with special characters during processing
const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve(_dirname, '../swagger.yml'), 'utf-8'));

module.exports = (app) => {
    //Server Swagger API documentation to /docs.url
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}