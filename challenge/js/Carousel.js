class Carousel{
    constructor(config){ 
        this.quantity = config.quantity; // Quantity of itens to show
        this.data = config.data;
        this.selector = config.selector;
    }
    createHTML(){
        let html = '';
        let dt = this.data;

        for(let i = 0, len = dt.length; i < len; i++){
            let productPayment = dt[i].productInfo.paymentConditions.match(/R\$.+[0-9]/); //Only Price
            let productTimes = dt[i].productInfo.paymentConditions.match(/\w.+x/); //Only Times

            html+= `<div class="item grid">
                    <img class="responsive-img" src="${dt[i].imageName}" alt="Image desc">
                    <div class="description">
                        ${dt[i].name}
                    </div>
                    <div class="price">
                        <p>Por:<strong>${dt[i].price}</strong></p>
                        <p><strong>${productTimes}</strong> de <strong>${productPayment}</strong> sem juros</p>
                    </div>
                    <div class="btn add-cart">Adicionar ao carrinho<i class="material-icons">add_shopping_cart</i></div>
                </div>`;
        }
        html+= `<div class="nav-carousel">
                <span></span>
                <span></span>
                <span></span>
            </div>`;
        return html;
    }
    init(){
        this.selector.innerHTML = this.createHTML();
    }
}