let jsonRequest = new HttpRequest('GET','../json/products.json');

jsonRequest.request(function(data){
    if(!data){
        return false;
    }

    //CAROUSEL CONF
    const config = {
        selector: document.querySelector('#carousel_shelf'),
        quantity: 4,
        data: data[0].data.recommendation
    };

    let carousel = new Carousel(config);
    carousel.init();


    console.log('DATA: ',data);
    console.log('SELECTOR: ',carousel);
})