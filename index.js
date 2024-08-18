import express from "express";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { config } from 'dotenv'

import { initiateApp } from "./src/initiate-app.js";
config({path: './config/dev.config.env'})

const app = express()

// Swagger configuration options
const swaggerOptions = {
    swaggerDefinition: {
    openapi: '3.0.0',
    info: {
        title: 'Orange Bay API',
        version: '1.0.0',
        description: 'API documentation for Your Project',
        contact: {
        name: 'Ashraf Osama',
        url: 'https://github.com/ashrafosama',
        email: 'ashrafosama667@gmail.com'
        }
    },
    servers: [
        {
        url: 'http://localhost:3000',
        description: 'Development server'
        },
        {
        url: 'https://orange-bay.vercel.app',
        description: 'Production server'
        }
    ]
    },
    apis: [
        './swaggerDocs.js'
    ] // Path to the API docs
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Serve swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

initiateApp(app, express)
