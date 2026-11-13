import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const app = express();

const PORT = 4000;

const jobs = [];

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {dateStyle:'short',timeZone: 'UTC'});
}

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', async(req,res) => {
    try{
        const [jobs] = await 
        pool.query('SELECT * FROM jobs');
        console.log(jobs);
        res.render('home', { jobs, formatDate });
    } catch(err) {
        console.error("Database error: " + err);
        res.status(500).send("Database error occured.");
    } 
});

app.get('/add-job', (req,res) => {
    res.render('addjob');
});

app.post('/submit-job', async(req, res) => {
    const job = req.body;
    job.timestamp = new Date();
    console.log(job);

    const sql = `INSERT INTO jobs (jobtitle, company, job, employment, trade, applink, location, dateposted, dateexpires)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
        job.jobtitle,
        job.company,
        job.job,
        job.employment,
        job.trade,
        job.applink,
        job.location,
        job.dateposted,
        job.dateexpires
    ];

    const [result] = await pool.execute(sql, params);    
    job.id = result.insertId;

    console.log("A new row was inserted with ID: " + result.id);
    res.render('confirm', { job });
});

app.get('/confirm', (req,res) => {
    res.render('confirm');
});

app.get('/jobs', async(req,res) => {
    try {
        const [jobs] = await
        pool.query('SELECT * FROM jobs');
        console.log(jobs);
        res.render('jobs', { jobs, formatDate });
    } catch (err) {
        console.error("Database error: " + err);
        res.status(500).send("Database error occured.");
    } 
});

app.get('/announcements', (req,res) => {
    res.render('announcement', { jobs, formatDate });
});

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});