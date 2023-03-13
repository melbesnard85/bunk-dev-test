import { getData } from './data-access';

export async function getExpenses(page: number, limit: number) {
  const collectionsRef = 'expenses';
  return new Promise((resolve, reject) => {
    getData(collectionsRef)
      .ref.limitToFirst(limit)
      .get()
      .then((data: any) => {
        resolve(data.toJSON());
      })
      .catch((error: any) => {
        console.error(error);
        reject(error);
      });
  });
}
