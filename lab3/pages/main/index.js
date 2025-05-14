import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
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
        return [
            {
                id: 1,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
                title: "Python Logo",
                text: "Official Python programming language logo"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/736x/67/01/16/670116c84a423ad37e6662a00357a898.jpg",
                title: "Django Framework",
                text: "Django web framework for rapid Python development"
            },
            {
                id: 3,
                src: "https://avatars.mds.yandex.net/i?id=1f25317738d4d51f98eef0119ba4a6cd-5354397-images-thumbs&n=13",
                title: "Data Science",
                text: "Python leads in data analysis and machine learning"
            },
            {
                id: 4,
                src: "https://www.python.org/static/community_logos/python-powered-w-100x40.png",
                title: "Python Powered",
                text: "'Powered by Python' web applications logo"
            },
            {
                id: 5,
                src: "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
                title: "Scikit-learn",
                text: "Machine learning library for Python"
            },
            {
                id: 6,
                src: "https://numfocus.org/wp-content/uploads/2016/07/pandas-logo-300.png",
                title: "Pandas",
                text: "Data analysis and manipulation library"
            }
        ];
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        const selectedItem = this.data.find(item => item.id === cardId);
        
        if (selectedItem) {
            const productPage = new ProductPage(this.parent, selectedItem);
            productPage.render();
        }
    }

    deleteCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        this.data = this.data.filter(item => item.id !== cardId);
        this.displayCards(this.data);
    }

    addCardButton(){
        const newCard = {...this.data[0]}
        let maxId = 0;

        this.data.forEach(data => {
            if (data.id > maxId){
                maxId = data.id;
            }
        })

        newCard.id = maxId + 1;
        this.data.push(newCard);
        this.displayCards(this.data);
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById("search-input").addEventListener("input", (e) => this.filterCards(e.target.value));
        document.getElementById("add-card").addEventListener("click", () => this.addCardButton());
        
        //const data = this.getData()

        //data.forEach((item) => {
        //    const productCard = new ProductCardComponent(this.pageRoot)
        //    productCard.render(item, this.clickCard.bind(this))
        //})

        this.displayCards(this.data)
    }

    filterCards(query){
        const filteredData = this.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        this.displayCards(filteredData);
    }

    displayCards(data) {
        this.pageRoot.innerHTML = '';
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, 
                this.clickCard.bind(this), 
                this.deleteCard.bind(this)
            );
        });
    }
}