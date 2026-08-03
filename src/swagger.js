import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routesGlob = path.resolve(__dirname, 'routes', '*.js').replace(/\\/g, '/');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST JWT Swagger',
      version: '0.1.0',
      description: 'API de reservas de restaurante con autenticación JWT y documentación Swagger.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [routesGlob],
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  app.use('/api-docs', (req, res, next) => {
    if (req.originalUrl === '/api-docs') {
      return res.redirect(302, '/api-docs/');
    }

    return next();
  });

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};

export default swaggerSetup;
