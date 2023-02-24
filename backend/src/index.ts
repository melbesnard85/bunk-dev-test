import express from 'express'
import cors from 'cors'
import { Expenses, PayoutsResuls } from './common/common'
import { mockExpensesData, mockPayoutsRes } from './common/mockData';

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/expenses", (req, res) => {
    const page = req?.query.page;
    if (page) {
        // TODO filter data for pagination

        res.send(mockExpensesData);
    }
});


app.post("/payouts", (req, res) => {
    const params = req?.body;
    if (params) {
        const expensesArr = JSON.parse(params.expenses);
        // TODO
        // const result = expenseCalc(expensesArr);
        // res.send(result)
        res.send(mockPayoutsRes)
    } else {
        res.send('Invalid request, please check the body of your request and retry!')
    }
});

const expenseCalc = (data: any) => {
    let result: PayoutsResuls;
    for (let i = 0; i < data.length; i++) {
        result.total += data.amount;
    }
    // TODO: calc payment

    return result;
}

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});