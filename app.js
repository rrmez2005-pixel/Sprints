import express from 'express';

const app = express();

const PORT = 4000;

const jobs = [];

function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {dateStyle:'short',timeZone: 'UTC'});
}

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home', { jobs, formatDate });
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

app.get('/announcements', (req,res) => {
    res.render('announcement', { jobs, formatDate });
});

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});