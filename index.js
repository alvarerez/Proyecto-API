var numpag = 1;
var tipo = "";

$(document).ready(function(){
    $("#manga").click(function(){
        tipo = "manga";
        busca();
        sacaResultado(tipo);
    });
    $("#series").click(function(){
        tipo = "anime";
        busca();
        sacaResultado(tipo);
    });
  
    
$("#buscar").click(function(){
    tipo = "";
    busca();
    numpag++;
    let cosa = $("input").val();
    if(tipo=="anime"){
       $.getJSON("https://api.jikan.moe/v3/search/anime?q="+cosa+" &page="+ numpag, function(mangas){
        for (  manga of mangas.results){
            meteManga(manga);
        }
    });
    }  
    
    else{
  $.getJSON("https://api.jikan.moe/v3/search/manga?q="+cosa+" &page="+ numpag, function(mangas){
        for (  manga of mangas.results){
            meteManga(manga);
        }
    });
    }
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()-10) {
        sacaResultado();
    }
});
    
});


var peticionEnCurso = false;
function sacaResultado(){
    if (!peticionEnCurso){
        peticionEnCurso=true;
    numpag++;
    let cosa = $("input").val();
   if(tipo=="anime"){
       $.getJSON("https://api.jikan.moe/v3/search/anime?q="+cosa+" &page="+ numpag, function(mangas){
        for (  manga of mangas.results){
            meteManga(manga);
        }
         peticionEnCurso=false;  
           
    });
   }  
    
    else{
  $.getJSON("https://api.jikan.moe/v3/search/manga?q="+cosa+" &page="+ numpag, function(mangas){
        for (  manga of mangas.results){
            meteManga(manga);
        }
       peticionEnCurso=false;
    });
    }
    }
}
function busca(){
    numpag=0;
    $("#biblioteca").empty();
}

function meteManga(manga){
    imgvacia(manga);
    $("#biblioteca").append($("<div class='resu'><img src="+manga.image_url+"><p>"+manga.title+"</p></div>"));
}

function imgvacia(peli) {
    if (peli.image_url == "N/A") {
        peli.image_url = "imagenes/latest.png";
    }
}


//var  datosJson
//function myFunction(xml) {
//  var i;
//  var x = datosJson;
//  var table="";
// for (i = 0; i <datosJson.length; i++) {
//    table += "<img src='"+x.image_url
//  }
//    
//  }
//  document.getElementById("demo").innerHTML = table;
//}
//function loadDoc() {
//  var xhttp = new XMLHttpRequest(); 
//  xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//       datosJson=JSON.parse(this.responseText);
//    myFunction(this);
//    }
//  };
//   
//  xhttp.open("GET", "https://api.jikan.moe/v3/search/manga?q="+busqueda+"&page="+1, true);
//  xhttp.send();
//   
//}


//
//
//function inicio(){
// 
//    setInterval(loadDoc,5000);
//}
//window.onload=loadDoc();
////$(document).scrollTop($(document).height());
//
//var peticionCurso=false;
//if(!peticionCurso){
//    peticionCurso=true;
//}