class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/cards`;
    }

    getStockById(id) {
        return `${this.baseUrl}/cards/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/cards`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/cards/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/cards/${id}`;
    }
}

export const stockUrls = new StockUrls();