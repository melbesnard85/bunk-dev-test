// @ts-ignore
import request from "supertest";
import { getExpenses } from '../src/data-access/status-repository';
import { limitPage, page, payoutsReqMockData } from './constant';
import { expenseCalc } from '../src/internal/payout';

let server: any;
let expensesData: any;

beforeAll(async () => {
    const mod = await import('../src/index')
    server = (mod as any).default;
});

describe("GET /", () => {
    it("Hello API Request", async () => {
        const result = await request(server).get("/");
        expect(result.text).toEqual("Hello world!");
        expect(result.statusCode).toEqual(200);
    });
});

describe("GET /expenses", () => {
    try {
        beforeEach(async () => {
            const data = await getExpenses(page, limitPage);
            if (data) {
                const data_arr = Object.values(data);
                expensesData = {
                    "recordsTotal": data_arr.length,
                    results: data_arr
                }
            }
        })

        it("should return 200 & valid response", async () => {
            await request(server)
                .get(`/expenses?results=${limitPage}&page=${page}`)
                .expect(200)
                .expect(function (res: any, err: any) {
                    if (res.body?.recordsTotal > 0) {
                        expect(res.body?.recordsTotal).toBe(expensesData.recordsTotal);
                        expect(res.body?.results.length).toBe(expensesData.results.length);
                    }
                })
        })

    } catch (error) {
        it('should return 500 if error has occurred during getting expenses data , please try again!', () => {
            console.log(error)
        });
    }
})

describe("POST /payouts", () => {
    let result: any;
    try {
        beforeEach(async () => {
            result = expenseCalc(payoutsReqMockData);
        })

        it("should return 200 & valid response", async () => {
            await request(server)
                .post(`/payouts`)
                .set({ 'content-type': 'application/x-www-form-urlencoded' })
                .send({ expenses: JSON.stringify(payoutsReqMockData) })
                .expect(function (res: any, err: any) {
                    if (res.body?.total > 0) {
                        expect(res.body?.total).toBe(result.total);
                        expect(res.body?.equalShare).toBe(result.equalShare);
                        expect(res.body?.payouts.length).toBe(result.payouts.length);
                    }
                })
        })

    } catch (error) {
        it('should return 500 if error has occurred during getting payouts data , please try again!', () => {
            console.log(error)
        });
    }
})