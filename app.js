import express from 'express';

const app = express();

const PORT = 4000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render(`home`);
});

app.get('/add-job', (req,res) => {

});

app.post('/submit-job', (req,res) => {

});

app.get('/confirm', (req,res) => {

});

app.get('/jobs', (req,res) => {

});

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});


