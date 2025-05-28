export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button class="btn btn-success" id="add-card-btn">
                Добавить карточку
            </button>
        `;
    }

    addListeners(callback) {
        document.getElementById('add-card-btn').addEventListener('click', callback);
    }

    render(callback) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(callback);
    }
}