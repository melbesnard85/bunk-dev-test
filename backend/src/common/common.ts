export interface PayoutsResuls {
    "total": number,
    "equalShare": number,
    "payouts": [
        {
            "owes": string,
            "owed": string,
            "amount": number
        }
    ]
};

export interface Expenses {
    name: string;
    amount : number;
}