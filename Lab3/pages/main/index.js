// main-page/index.js
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { 
    countIdentic, 
    calculateAverage, 
    mergeAndSortArrays, 
    isPalindrome1 
} from "../../components/utils/utils.js";
import {ajax} from "../../modules/ajax.js";
import {pyFuncUrls} from "../../modules/pyFuncUrls.js";
import { AddCardButtonComponent } from "../../components/add-card-button/index.js";
import { AddEditPage } from "../add-edit-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = []; // Инициализируем пустым массивом
        this.getData();
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <img class="python-logo" src="https://www.python.org/static/img/python-logo.png" alt="python™">
                    <div>
                        <input type="text" id="search-input" class="form-control me-2" placeholder="Поиск" style="margin-bottom: 10px;">
                        <button id="add-card" class="btn python-btn python-btn-primary">Добавить</button>
                        <button id="go-home" class="btn python-btn python-btn-secondary">Домой</button>
                        <button id="show-stats" class="btn python-btn python-btn-info">Показать статистику</button>
                    </div>
                </div>
                <div id="stats-container" class="mb-3" style="display: none;">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Статистика карточек</h5>
                            <p id="identic-count" class="card-text"></p>
                            <p id="average-id" class="card-text"></p>
                            <p id="merged-ids" class="card-text"></p>
                            <p id="palindrome-check" class="card-text"></p>
                        </div>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap gap-3"></div>
            </div>
        `;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getData() {
    ajax.get(pyFuncUrls.getPyFuncs(), (data) => {
            this.data = data; // Сохраняем данные в this.data
            this.renderData(this.data); // Обновляем отображение после получения данных
    });
}

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        const selectedItem = this.data.find(item => item.id === cardId);
        
        if (selectedItem) {
            const productPage = new ProductPage(this.parent, selectedItem);
            productPage.render();
        }
    }

    editCard(e) {
    const cardId = parseInt(e.target.dataset.id);
    const selectedItem = this.data.find(item => item.id === cardId);
    
    if (selectedItem) {
        const editPage = new AddEditPage(this.parent, selectedItem);
        editPage.render();
        }
    }   

    deleteCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            ajax.delete(pyFuncUrls.removePyFuncById(cardId), () => {
                this.data = this.data.filter(item => item.id !== cardId);
                this.renderData(this.data);
            });
        }
    }

    addCardButton() {
        const addPage = new AddEditPage(this.parent);
        addPage.render();
    }

    countPythonInDescriptions() {
        let count = 0;
        this.data.forEach(card => {
            const words = card.text.toLowerCase().split(/\s+/);
            count += words.filter(word => word === 'python').length;
        });
        return count;
    }

    checkForPalindromeDescriptions() {
        return this.data.some(card => {
            return isPalindrome1(card.text);
        });
    }

    showStatistics() {
        const statsContainer = document.getElementById('stats-container');
        const ids = this.data.map(item => item.id);
        
        const pythonCount = this.countPythonInDescriptions();
        document.getElementById('identic-count').textContent = 
            `Количество упоминаний "Python": ${pythonCount}`;
        
        document.getElementById('average-id').textContent = 
            `Среднее арифметическое карточек: ${calculateAverage(ids).toFixed(2)}`;
        
        const first = [1, 2, 3];
        const second = [-1, -10, 20];
        document.getElementById('merged-ids').textContent = 
            `Объединенные и отсортированные ID: ${mergeAndSortArrays(first, second, ids)}`;
        
        const hasPalindrome = this.checkForPalindromeDescriptions();
        document.getElementById('palindrome-check').textContent = 
            `Есть описания-палиндромы: ${hasPalindrome ? 'Да' : 'Нет'}`;
        
        statsContainer.style.display = 'block';
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById("search-input").addEventListener("input", (e) => this.filterCards(e.target.value));
        document.getElementById("add-card").addEventListener("click", () => this.addCardButton());
        document.getElementById("show-stats").addEventListener("click", () => this.showStatistics());
        
        if (this.data.length > 0) {
            this.renderData(this.data);
        }
    }

    filterCards(query) {
        const filteredData = this.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        this.displayCards(filteredData);
    }

    renderData(data) {
        if (!this.pageRoot) return;
        this.pageRoot.innerHTML = '';
        
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(
                item, 
                this.clickCard.bind(this), 
                this.editCard.bind(this),
                this.deleteCard.bind(this)
            );
        });
    }

    displayCards(data) {
        this.renderData(data);
    }
}