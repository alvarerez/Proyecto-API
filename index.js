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

