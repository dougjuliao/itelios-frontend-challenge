let jsonRequest = new HttpRequest('GET','/challenge/json/products.json');

jsonRequest.request(function(data){
    if(!data){
        return false;
    }

    //CAROUSEL CONF
    const config = {
        selector: document.querySelector('#carousel_shelf'),
        height: '753px',
        data: data[0].data
    };

    let carousel = new Carousel(config);
    carousel.init();

});
