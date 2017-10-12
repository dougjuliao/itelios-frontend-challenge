var json = new HttpRequest('GET','../json/products.json');

json.request(function(json){
    console.log(json);
})