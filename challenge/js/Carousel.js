/*
    @Autor: Douglas Julião
    Carousel layout
*/
class Carousel{
    constructor(config){ 
        this.data = config.data;
        this.selector = config.selector;
        this.height = config.height;
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
        html+= '<div class="grid-2" style="position:relative;"> <h2 class="title interesting-sm">e talvez se interesse por:</h2> <div class="carousel-container">';
            
        for(let i = 0, len = dt.recommendation.length; i < len; i++){
            html+= productHtml(dt.recommendation[i]);
        }
        html+= `<div class="nav-carousel"></div>`;
        html+= '</div></div>';
        
        
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
        let carouselWidth = carousel.scrollWidth;
        products.forEach((item) => {
            productWidth = item.scrollWidth;

            item.style.width = productWidth+'px';
            totalWidthContainer += productWidth;
        });
        carousel.setAttribute('style', `width:${totalWidthContainer+'px'} !important; position: absolute; overflow:hidden; height: ${this.height}`);
        
        //navigation
        this.drawNavigation({ products: products, productWidth: productWidth, totalWidth: totalWidthContainer, carouselWidth: carouselWidth });
    }
    drawNavigation(itens){
        //selectors
        const nav = document.querySelector('.nav-carousel');
        const windowWidth = window.outerWidth;

        const creatNav = (division) => { // Create itens nav by division between producst width 
            return itens.carouselWidth + 120;
        };

        let totalItens = windowWidth > 800 ? 5 : itens.products.length;

        if(windowWidth > 800 && windowWidth < 1200){
            totalItens = 5;
        }else if(windowWidth > 1200){    
            totalItens = 3;
        }else{ 
            totalItens = itens.products.length;
        }

        let navMove = -1;
        let navHtml = '';

        for(var i = 0; i <= totalItens; i++){
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
            });
        });
    }
    init(){
        const callFunctions = () => {
            this.createHTML();
            this.drawCarousel();
        };
        callFunctions();
        
        window.onresize = () => { callFunctions() };
    }
}