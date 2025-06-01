// add-edit-page/index.js
import { ajax } from "../../modules/ajax.js";
import { pyFuncUrls } from "../../modules/pyFuncUrls.js";
import { MainPage } from "../main/index.js";

export class AddEditPage {
    constructor(parent, item = null) {
        this.parent = parent;
        this.item = item;
        this.isEditMode = !!item;
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h2>${this.isEditMode ? 'Редактирование' : 'Добавление'} карточки</h2>
                <form id="edit-form">
                    <div class="mb-3">
                        <label for="title" class="form-label">Название</label>
                        <input type="text" class="form-control" id="title" 
                               value="${this.item?.title || ''}" required>
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Описание</label>
                        <textarea class="form-control" id="text" rows="3" required>${this.item?.text || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="img" class="form-label">Ссылка на изображение</label>
                        <input type="url" class="form-control" id="img" 
                               value="${this.item?.src || ''}" required>
                    </div>
                    <button type="submit" class="btn python-btn python-btn-primary">
                        ${this.isEditMode ? 'Сохранить' : 'Добавить'}
                    </button>
                    <button type="button" id="cancel-btn" class="btn python-btn python-btn-secondary">Отмена</button>
                </form>
            </div>
        `;
    }

    handleFormSubmit() {
        const form = document.getElementById('edit-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                title: document.getElementById('title').value,
                text: document.getElementById('text').value,
                src: document.getElementById('img').value
            };

            if (this.isEditMode) {
                this.updateItem(formData);
            } else {
                this.createItem(formData);
            }
        });
    }

    createItem(data) {
        ajax.post(pyFuncUrls.createPyFunc(), data, (response) => {
            this.returnToMain();
        });
    }

    updateItem(data) {
        ajax.patch(
        pyFuncUrls.updatePyFuncById(this.item.id),
        data,
        (response) => {
            console.log("Успешное обновление:", response);
            this.returnToMain(); // Проверьте, что `this` — это экземпляр AddEditPage
        },
        (error) => {
            console.error("Ошибка при обновлении:", error);
            alert("Не удалось сохранить изменения!");
        }
    );
    }

    handleCancel() {
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.returnToMain();
        });
    }

    returnToMain() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.handleFormSubmit();
        this.handleCancel();
    }
}