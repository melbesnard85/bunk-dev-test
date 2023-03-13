export interface PayoutsResuls<T> {
  total: number;
  equalShare: number;
  payouts: T[];
}

export interface PayoutsDetals {
  owes: string;
  owed: string;
  amount: number;
}

export interface Expenses {
  name: string;
  amount: number;
}
