//Imports express module
import express from 'express';

//Imports mysql2 module
//mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from 'mysql2';

//Imports .env
import dotenv from 'dotenv';
dotenv.config();

//Creates a connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Creates an instance of an express application
const app = express();

//Define a port number for our server to listen on
const PORT = 4000;

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

//Enables static file serving
app.use(express.static('public'));

//Sets view engine to EJS
app.set('view engine', 'ejs');

//Adds "middleware" to allow the app to parse form data
//Access form data through req.body
app.use(express.urlencoded({extended: true}));

//Define a default route ("/")
app.get('/', async(req,res) => {
    try{
        const [jobs] = await 
        pool.query('SELECT * FROM jobs WHERE dateexpires >= CURDATE() ORDER BY timestamp DESC, id DESC');
        console.log(jobs);
        res.render('home', { jobs, formatDate });
    } catch(err) {
        console.error("Database error: " + err);
        res.status(500).send("Database error occured.");
    } 
});

//Add a route to the page to for adding jobs
app.get('/add-job', (req,res) => {
    res.render('addjob');
});

//Add a route to process job postings
app.post('/submit-job', async(req, res) => {
    const job = req.body;
    job.timestamp = new Date();
    console.log(job);

    const sql = `INSERT INTO jobs (jobtitle, company, job, employment, trade, applink, location, dateposted, dateexpires, timestamp)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
        job.jobtitle,
        job.company,
        job.job,
        job.employment,
        job.trade,
        job.applink,
        job.location,
        job.dateposted,
        job.dateexpires,
        job.timestamp
    ];

    try{
        const [result] = await pool.execute(sql, params);    
        job.id = result.insertId;

        console.log("A new row was inserted with ID: " + job.id);
        res.render('confirm', { job });
    } catch (err) {
        console.error('Database error: ' + err);
        res.status(500).send("Database error occured");
    }
    
});

//Add a route for the confirmation page
app.get('/confirm', async(req,res) => {
    try{
        const [jobs] = await 
        pool.query('SELECT * FROM jobs');
        console.log(jobs);
        //gets the job that was last added to the datbase
        const job = jobs[jobs.length - 1];
        res.render('confirm', { job });
    } catch(err) {
        console.error("Database error: " + err);
        res.status(500).send("Database error occured.");
    } 
});

//Add a route for the jobs board page
app.get('/jobs', async(req,res) => {
    try {
        const [jobs] = await
        pool.query('SELECT * FROM jobs ORDER by timestamp DESC, id DESC');
        console.log(jobs);
        res.render('jobs', { jobs, formatDate });
    } catch (err) {
        console.error("Database error: " + err);
        res.status(500).send("Database error occured.");
    } 
});

// app.get('/announcements', (req,res) => {
//     res.render('announcement', { jobs, formatDate });
// });

//Start the server on the desginated port
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});