$(document).ready(function(){
	
	$('.album-link').each(function(key, value){
		if(key == 0)
		{
			$(value).addClass('album-escolhido');
		}	
	});	
	
	
	$('.album-link').mouseover(function(){
		$(this).addClass('album-hover');
	});
	
	$('.album-link').mouseout(function(){
		$(this).removeClass('album-hover');
	});
	
	
	$('.clique-abrir-thumbs').click(function(){
		var id = $(this).attr('id').split('_');
		
		$('.clique-abrir-thumbs').removeClass('album-escolhido');
		$(this).addClass('album-escolhido');
		
		printarFotos(id[1], null, null, '/fotos/fotosPorAlbum');	
	});
	
	
	$('#procura-fotos').click(function(){
		if($(this).val() == 'Digite aqui sua procura')
		{
			$(this).val('');
		}	
	});
	
	
	
	$('#procura-fotos-data').datepicker({
		dateFormat: 'dd/mm/yy',
	    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
	    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
	    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
	    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	    nextText: 'Próximo',
	    prevText: 'Anterior'
	});
	
	
	
	$('#botao-procurar').click(function(){
		if(($('#procura-fotos').val() == '' || $('#procura-fotos').val() == 'Digite aqui sua procura') && ($('#procura-fotos-data').val() == ''))
		{
			$('.info').html('Voc&ecirc; deve escolher inserir a data ou palavras para a pesquisa');
		}
		else
		{
			$('.album-link').removeClass('album-escolhido');
			$('.info').html('');
			printarFotos(null, $('#procura-fotos').val(), $('#procura-fotos-data').val(), '/fotos/procurarFotos');
		}	
	});
	
});



function printarFotos(id, busca, data, action)
{	
	arrayIdFotos = [];
	var contagem = 0;
	
	$('.fotos').html('').hide();
	$.getJSON(action, {"id": id, "busca": busca, "dataProcura": data} , function(fotos){
	
		var paraAlbum = '';
		if(fotos.mensagem == 'sem_fotos')
		{	
			if(busca == null)
			{
				paraAlbum = 'para esse &aacute;lbum';
			}	
			$('.fotos').append('<div class="erro texto-centralizado padding-2-por-cento-total">N&atilde;o existem fotos ' + paraAlbum + '</div>').show("slow");
		}
		else
		{
			$(fotos).each(function(){
		
				arrayIdFotos[contagem] = this.id;
				contagem++;
				
				$('.fotos').append('<div class="foto clicavel" onclick="javascript:deixarFotoGrande('+ id +', \''+ busca +'\', \''+ data +'\', \''+ action +'\', '+ this.id +');"><img src="/assets/fotos/thumb/' + this.link + '" id="foto_' + this.id + '" /></div>');					
				$('.fotos').show('slow');	
				
				$('#foto_' + this.id).attr('src', '/assets/fotos/thumb/' + this.link).load(function(){
					var largura = $(this).width();
					if(largura > 300)
					{
						largura = largura / 2.5;
						$(this).width(largura);
					}
				});
			});		
		}
		
		$('.fotos').append('<div class="clear"></div>');
		
	});
}


function deixarFotoGrande(idAlbum, busca, data, action, idFoto)
{
	$('.fotos-grande').remove();
	
	$('.fundo').append('<div class="fotos-grande">'+
			'<div class="seta-esquerda clicavel" onclick="javascript:voltarFoto();"></div>' +
			'<div class="seta-direita clicavel" onclick="javascript:avancarFoto();"></div>' +
			'<div class="fechar clicavel" onclick="javascript:fecharFotos()"></div></div>');
	
	$.getJSON(action, {"id": idAlbum, "busca": busca, "dataProcura": data} , function(fotos){
		$(fotos).each(function(){
			$('.fotos-grande').append('<img src="/assets/fotos/' + this.link + '" id="img_'+ this.id +'" class="fotos-grandes-caroussel" />');
			$('.fotos').css('display', 'none');
		});
		
		
		var tamanhofoto = $('.fotos-grande #img_'+ idFoto).height();
		
		if(tamanhofoto < window.innerHeight)
		{
			tamanhofoto = window.innerHeight;
		}
		
		$('.fotos-grande').animate({
			width: "100%",
			height: tamanhofoto,
			top:0,
			left:0
		}, 500);
		
		$('#img_'+ idFoto).css('display', 'block');
	});
}


function fecharFotos()
{
	$('.fotos').css('display', 'block');
	$('.fotos-grande').animate({
		'width':0,
		'height': 0,
		'left': '50%',
		'top': '50%'
	}, 500);
	$('.fotos-grande').remove();
	$('.fechar').remove();
}


function voltarFoto()
{
	var array = [];
	var idAberto = 0;
	var contagem = $('.fotos-grandes-caroussel').length - 1;
	
	$('.fotos-grandes-caroussel').each(function(key, value){
		var apenasNumerosId = $(value).attr('id').split('_');
		
		array[key] = parseInt(apenasNumerosId[1]);
		
		if($(value).css('display') == 'block')
		{
			idAberto = parseInt(apenasNumerosId[1]);
		}
		
		$(value).css('display','none');
	});
	
	var idAbertoSegundo = 0;
	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == idAberto)
		{
			if(i == 0)
			{
				idAbertoSegundo = array[contagem];
				$('#img_'+ idAbertoSegundo).css('display', 'block');
			}
			else
			{
				idAbertoSegundo = array[i - 1];
				$('#img_'+ idAbertoSegundo).css('display', 'block');
			}	
		}
	}

	
	var tamanhofoto = $('#img_' + idAbertoSegundo).height();
	
	if(tamanhofoto < window.innerHeight)
	{
		tamanhofoto = window.innerHeight;
	}
	
	$('.fotos-grande').animate({
		width: "100%",
		height: tamanhofoto,
		top:0,
		left:0
	}, 500);
}



function avancarFoto()
{
	var array = [];
	var idAberto = '';
	var contagem = $('.fotos-grandes-caroussel').length - 1;
	
	$('.fotos-grandes-caroussel').each(function(key, value){
		var apenasNumerosId = $(value).attr('id').split('_');
		
		array[key] = parseInt(apenasNumerosId[1]);
		
		if($(value).css('display') == 'block')
		{
			idAberto = parseInt(apenasNumerosId[1]);
		}
	});
	
	$('.fotos-grandes-caroussel').css('display','none');
	
	var idAbertoSegundo = 0;
	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == idAberto)
		{
			if(i == contagem)
			{
				idAbertoSegundo = array[0];
				$('#img_'+ idAbertoSegundo).css('display', 'block');
			}
			else
			{
				idAbertoSegundo = array[i + 1];
				$('#img_'+ idAbertoSegundo).css('display', 'block');
			}	
		}
	}
	
	var tamanhofoto = $('#img_' + idAbertoSegundo).height();
	
	if(tamanhofoto < window.innerHeight)
	{
		tamanhofoto = window.innerHeight;
	}
	
	$('.fotos-grande').animate({
		width: "100%",
		height: tamanhofoto,
		top:0,
		left:0
	}, 500);
}



