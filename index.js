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
      $('img#slidecaption').show();
    numpag++;
    let cosa = $("input").val();
   if(tipo=="anime"){
       $.getJSON("https://api.jikan.moe/v3/search/anime?q="+cosa+" &page="+ numpag, function(mangas){
              
           for (  manga of mangas.results){
            meteManga(manga);
        }
         peticionEnCurso=false;  
            $('img#slidecaption').hide('2000'); 
    });
   }  
    
    else{
  $.getJSON("https://api.jikan.moe/v3/search/manga?q="+cosa+" &page="+ numpag, function(mangas){
              
      for (  manga of mangas.results){
            meteManga(manga);
        }
       peticionEnCurso=false;
      $('img#slidecaption').hide('2000'); 
    });
    }
    }else{
       $('img#slidecaption').hide(); 
        peticionEnCurso=false;
    }
}
function busca(){
    numpag=0;
    $("#biblioteca").empty();
}

function meteManga(manga){
    imgvacia(manga);
    $("#biblioteca").append($("<div class='resu' onmouseover='muestra(this)' onmouseout='esconde(this)' ><img   alt='"+manga.synopsis+"'  src="+manga.image_url+" ><p>"+manga.title+"</p>   <p hidden='true' >"+manga.synopsis+" </p></div>"));
}

function imgvacia(manga) {
    if (manga.image_url == "N/A") {
        manga.image_url = "imagenes/latest.png";
    }
}


function muestra(dilo){
    
   $(dilo.lastChild).show();
}

function esconde(dilo){
    
   $(dilo.lastChild).hide();
    
    
}
