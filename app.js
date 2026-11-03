import express from 'express';

const app = express();

const PORT = 4000;

const jobs = [];

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render(home);
});

app.get('/add-job', (req,res) => {
    res.render('addjob');
});

app.post('/submit-job', (req,res) => {
    const newJob = {
        jobtitle: req.body.jobtitle,
        employment: req.body.employment,
        trade: req.body.trade,
        location: req.body.location,
        dateposted: req.body.dateposted,
        dateexpires: req.body.dateexpires
    };

    jobs.push(newJob);

    res.redirect('/confirm');
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