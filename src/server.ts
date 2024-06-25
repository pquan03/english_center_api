// Import the 'express' module
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import sequelize from './config/db';
import routes from './routes/index.routes';


// Create an Express application
const app = express();
dotenv.config();


app.use(express.json({
    limit: '1000mb'
}));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb'}))
app.use(bodyParser.json(
    { limit: '1000mb' }
));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', routes.authRoute);
app.use('/api/student', routes.studentRoute);
app.use('/api/class', routes.classRoute);
app.use('/api/teacher', routes.teacherRoute);



// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });