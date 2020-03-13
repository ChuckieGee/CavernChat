function myfunction(){
    console.log('Hello World');

    var element = function(id){
        return document.getElementById(id);
    }

    var body = element('mainBody');
    var divContainer = document.createElement("div").className = "container";
    console.log('Container');
        var divRow = document.createElement("div").className = "row";
        console.log('Row');
            var divCol = document.createElement("div").className = "col-md-6 offset-md-3 col-sm-12";
    divContainer.appendChild(divRow);
    divRow.appendChild(divCol);
    var node = document.createTextNode("Hello World 2, Electric Boogaloo");
    para.appendChild(node);

    body.appendChild(para);
    console.log(body);
};