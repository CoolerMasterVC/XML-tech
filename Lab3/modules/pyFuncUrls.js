class PyFuncUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getPyFuncs() {
        return `${this.baseUrl}/pyFunc`;
    }

    getPyFuncById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }

    createPyFunc() {
        return `${this.baseUrl}/pyFunc`;
    }

    removePyFuncById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }

    updatePyFuncById(id) {
        return `${this.baseUrl}/pyFunc/${id}`;
    }
}

export const pyFuncUrls = new PyFuncUrls();