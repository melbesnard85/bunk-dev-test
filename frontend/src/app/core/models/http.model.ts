export interface SearchResult<T> {
    draw: number;
    recordsTotal: number;
    results: T[];
}