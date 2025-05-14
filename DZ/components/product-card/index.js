export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px; height: 450px">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <button class="btn python-btn python-btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn python-btn python-btn-danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, listener, deleteListener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", deleteListener);
    }
    
    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener);
    }
}