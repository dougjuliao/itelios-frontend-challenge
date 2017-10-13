class Carousel{
    constructor(config){ 
        this.quantity = config.quantity; // Quantity of itens to show
        this.data = config.data;
        this.selector = config.selector;
    }
    createHTML(){
        let html = '';
        let dt = this.data;

        const productHtml = (dt,first) => {
            let productPayment = dt.productInfo.paymentConditions.match(/R\$.+[0-9]/); //Only Price
            let productTimes = dt.productInfo.paymentConditions.match(/\w.+x/); //Only Times

            return `<div class="item ${first ? 'grid-2' : 'grid'}">
                        <img class="responsive-img" src="${dt.imageName}" alt="Image desc">
                        <div class="description">
                            ${dt.name}
                        </div>
                        <div class="price">
                            <p>Por:<strong>${dt.price}</strong></p>
                            <p><strong>${productTimes}</strong> de <strong>${productPayment}</strong> sem juros</p>
                        </div>
                        <div class="btn-container">
                            <div class="btn add-cart">Adicionar ao carrinho<i class="material-icons">add_shopping_cart</i></div>
                        </div>
                    </div>`;
        };

        html+= productHtml(dt.item,true);
        html+= '<div class="carousel-container grid-2"><h2 class="title interesting-sm">e talvez se interesse por:</h2>';
            
        for(let i = 0, len = dt.recommendation.length; i < len; i++){
            html+= productHtml(dt.recommendation[i]);
        }
        html+= `<div class="nav-carousel"></div>`;
        html+= '</div>';
        
        
        this.selector.innerHTML = html;
    }
    drawCarousel(){
        //Const selectors
        const carousel = document.querySelector('.carousel-container'),
              products = document.querySelectorAll('.carousel-container .item');

        //First I set the width of all products to container carousel
        //And fix width of prosucts with px
        let totalWidthContainer = 0;
        let productWidth = 0;
        products.forEach((item) => {
            productWidth = item.scrollWidth;

            item.style.width = productWidth+'px';
            totalWidthContainer += productWidth;
        });
        carousel.setAttribute('style', `width:${totalWidthContainer+'px'} !important; position: absolute; left: 25.3%; overflow:hidden;`);
        
        //navigation
        this.drawNavigation({ products: products, productWidth: productWidth, totalWidth: totalWidthContainer });
    }
    drawNavigation(itens){
        //selectors
        const nav = document.querySelector('.nav-carousel');
        const windowWidth = window.outerWidth;

        const creatNav = (division) => { // Create itens nav by division between producst width 
            return itens.totalWidth / division;
        };

        let totalItens = windowWidth > 1200 ? 3 : itens.products.length;
        let navMove = 0.5;
        let navHtml = '';

        for(var i = 0; i < totalItens; i++){
            navHtml += `<div class="nav ${i === 0 ? 'active' : '' }" data-index="${i}" data-position="${navMove}"></div>`;
            navMove += (creatNav(totalItens) - 147);
        }

        nav.innerHTML = navHtml;
        
        const navItem = document.querySelectorAll('.nav-carousel .nav');
        navItem.forEach((item) => {
            item.addEventListener('click',function(){
                navItem.forEach((item2) => { item2.classList.remove('active') });//remove class active
                if(this.classList.value.match(/active/) == null){
                    this.classList.add('active');
                    
                    let clickedElement = this;
                    itens.products.forEach((item2) => { item2.style.left = -Number(clickedElement.dataset.position)+'px'; }); //Alter left of all products
                    
                }
                //this.classList.add('active');
            });
        });
    }
    init(){
        this.createHTML();
        this.drawCarousel();
    }
}