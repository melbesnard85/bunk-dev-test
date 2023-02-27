import express from 'express'
import cors from 'cors'
import { Expenses, PayoutsResuls } from './common/common'
import { mockPayoutsRes } from './common/mockData';
import * as firebaseAdmin from "firebase-admin"
import serviceAccount from './common/bunk-dev-test-firebase-adminsdk-vfeaa-48519ad9f5.json'
import { getExpenses } from './data-access/status-repository'

const app = express();
const port = 3000;

const _serviceAccount: object = serviceAccount;

// initializing firebase app
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(_serviceAccount),
    databaseURL: "https://bunk-dev-test-default-rtdb.firebaseio.com"
})

app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/expenses", async (req, res) => {
    const page = req?.query.page;
    if (page) {
        const lim_result = req?.query.results;
        // TODO filter data for pagination
        const data: any = await getExpenses(Number(page), Number(lim_result));
        if (data) {
            const data_arr = Object.values(data);
            const rsult = {
                "recordsTotal": data_arr.length,
                results: data_arr
            }
            res.send(rsult);
        }
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