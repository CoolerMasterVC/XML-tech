export class BackButtonComponent {
    constructor(parent, idButton,text) {
        this.parent = parent;
        this.idButton = idButton;
        this.text = text;
    }

    addListeners(listener) {
        document
            .getElementById(this.idButton)
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id=${this.idButton} class="btn python-btn python-btn-primary" 
                style="margin-bottom: 10px;" 20px" type="button">${this.text}</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}