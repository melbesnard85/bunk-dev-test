interface MResult<T> {
    "results": T[]
}

interface RData {
    "amount": number;
    "name": string;
}

export const mockSearchResponse: MResult<RData> =
{
    "results": [
        { amount: 5.75, name: 'Adriana' },
        { amount: 5.75, name: 'Adriana' },
        { amount: 12, name: 'Bao' },
    ]
}
