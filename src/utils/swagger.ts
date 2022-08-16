import swaggerJsDoc from 'swagger-jsdoc';

//Extended: https://swagger.io/specification/#Info Object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'MonoPay API Documentation',
      description: 'AdSpace API Documentation Information',
      contact: {
        name: 'Lucignation Developer',
      },
      version: '1.0.0',
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['*/routes/*.route.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
