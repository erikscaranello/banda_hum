$(document).ready(function(){
	var url = window.location;
	var urlString = url.toString();
	var stringCortada = urlString.split('/');
	var pagina = stringCortada[stringCortada.length - 1];
	
	botaoClicado(pagina);
});


$(document).ready(function(){
	$('.menu p').mouseover(function(){
		$(this).addClass('hover');
	});
});

$(document).ready(function(){
	$('.menu p').mouseout(function(){
		$(this).removeClass('hover');
	});
});

function botaoClicado(pagina)
{
	$('.menu p').each(function(){
		if($(this).children('a').attr('href') == pagina)
		{
			$(this).addClass('clicado');
		}
	});
}


function fechar()
{
	$('.infos-geral').animate({
		'width':0,
		'height': 0,
		'left': '50%',
		'top': '50%'
	}, 1000);
	$('.infos-geral .infos-de-musicos').remove();
	$('.infos-geral .infos-de-musicos-erro').remove();	
	$('.fechar').remove();
}
