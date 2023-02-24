import express from 'express'
import cors from 'cors'

const app = express();
const port = 3000; // default port to listen

// setting up the express
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

const mockData = [
    { name: 'Semon', amount: 100 },
    { name: 'Nagn', amount: 200 },
    { name: 'Sueir', amount: 150 },
    { name: 'Roman', amount: 50 },
    { name: 'Visk', amount: 300 },
]

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/expenses", (req, res) => {
    res.send(mockData);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});