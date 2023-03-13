import { initPayouts } from '../common/mockData';
import { PayoutsDetals, PayoutsResuls } from '../common/common';

export const expenseCalc = (data: any) => {
  let result: PayoutsResuls<PayoutsDetals> = initPayouts;
  let total = 0;
  // distinct array
  var distinct_arr: any = Object.values(
    data.reduce((hash: any, item: any) => {
      if (!hash[item.name]) {
        hash[item.name] = { name: item.name, amount: 0 };
      }
      hash[item.name].amount += item.amount;
      total += item.amount;
      return hash;
    }, {}),
  );
  const average: number = total / distinct_arr.length;
  result.total = total;
  result.equalShare = average;
  result.payouts[0].owes = distinct_arr[0].name;
  result.payouts[0].owed = distinct_arr[1].name;
  result.payouts[0].amount = average - distinct_arr[0].amount;
  return result;
};
