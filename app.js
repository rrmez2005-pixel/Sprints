import express from 'express';

const app = express();

const PORT = 4000;

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(`${import.meta.dirname}/home.html`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});


