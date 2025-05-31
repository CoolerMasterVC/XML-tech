class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/pyFunc`;
    }

    getStockById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/pyFunc`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }
}

export const stockUrls = new StockUrls();