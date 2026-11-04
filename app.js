import express from 'express';

const app = express();

const PORT = 4000;

const jobs = [];

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home', { jobs });
});

app.get('/add-job', (req,res) => {
    res.render('addjob');
});

app.post('/submit-job', (req, res) => {
    const job = req.body;
    job.timestamp = new Date();

    console.log(job);

    jobs.push(job);
    console.log(jobs);

    res.render('confirm', { job });
});

app.get('/confirm', (req,res) => {
    res.render('confirm');
});

app.get('/jobs', (req,res) => {
    res.render('jobs', { jobs });
});

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});