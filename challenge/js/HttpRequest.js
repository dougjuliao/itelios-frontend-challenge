class HttpRequest {
    constructor(method,url){
        this.url = url;
        this.method = method;
    };
    request(callback){
        let xhr = new XMLHttpRequest();
        xhr.open(this.method, this.url);
        xhr.send(null);

        xhr.onreadystatechange = function () {
            const DONE = 4,
                OK = 200;

            if (xhr.readyState === DONE) {
                if (xhr.status === OK){
                    let data = JSON.parse(xhr.responseText);
                    callback(data);
                }else{
                    callback(xhr);
                }
            }
        };
    };

}