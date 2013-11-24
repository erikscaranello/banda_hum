$(document).ready(function(){
	
	tamanhoFinalDaTela = 0;
	
	$('.foto_instrumento').css('float', 'left');
	$('.infos-de-musicos').css('float', 'left');
	$('.foto').css('float', 'left');
	$('.infos').css('float', 'left');
	
	
	$('.foto').click(function(){
		
		if($(this).parent('.link_foto').parent('.infos_musicos').children('.infos-musico').children('.escondido').is(":visible"))
		{
			$(this).parent('.link_foto').parent('.infos_musicos').children('.infos-musico').children('.escondido').hide();
		}
		else
		{
			$(this).parent('.link_foto').parent('.infos_musicos').children('.infos-musico').children('.escondido').show();
		}	
	});
});


function verificarMusicosComInstrumento(idInstrumento)
{
	$.getJSON("/musicos/infoMusico.json", {"id": idInstrumento} , function(musico){	
		
		$('.infos-geral .infos-de-musicos').remove();
		
		var tamanhoFinalDaTela = 0;
		$(musico).each(function() {
			
			if(this.mensagem == 'sem_musicos')
			{
				$('.infos-geral').append('<div class="infos-de-musicos-erro"><p class="titulo texto-centralizado margin-top-vinte-porcento tipografia-vermelha">N&atilde;o existem m&uacute;sicos neste instrumento</p><div class="fechar clicavel" onclick="javascript:fechar()"></div></div>');
			}
			else
			{
				var facebookTwitter = verificarFacebookTwitter(this.facebook, this.twitter);
					
				var foto = '';
				if(this.foto == 'sem_foto')
				{
					foto = 'Sem Foto';
				}
				else
				{
					foto = '<img src="/assets/fotos/thumb/' + this.foto + '" id="musico_' + this.id + '" />';
				}	
				
				$('.infos-geral').append('<div class="infos-de-musicos">' +
							'<div class="foto">' + foto +'</div>' +
							'<div class="infos">' +
								'<div class="nome">' + 
									'<p class="titulo tipografia-branca">' + this.nome + '</p>' +
								'</div>' +
								'<div class="descricao">' + 
									'<p class="texto tipografia-cinza">' + this.descricao + '</p>' +
								'</div>' +
								'<div class="estilos-musicais">' + 
									'<p class="titulo tipografia-branca">Estilos musicais que mais gosta:</p>' +
									'<p class="texto tipografia-cinza">' + this.estilosMusicais + '</p>' +
								'</div>' + 
								'<div class="email">' + 
								'<p class="titulo tipografia-branca">E-mail:</p>' +
								'<a href="mailto:' + this.email + '">' + this.email + '</a>' +
								'</div>' +
								facebookTwitter + 
							'</div>' +  
						'</div>');
				
				while($('#musico_' + this.id).width() > 300)
				{
					$('#musico_' + this.id).width($('#musico_' + this.id).width() - 1 );
				}	
				
//				var tamanhoFoto = $('#musico_' + this.id).width() + (($('#musico_' + this.id).width() * 10) / 100);
//				var tamanhoInfos = $('.infos').width() + (($('.infos').width()  * 10) / 100);
				
				$('.infos-de-musicos').each(function(){
					tamanhoFinalDaTela += $(this).height();
				});
				
				if(tamanhoFinalDaTela < window.innerHeight)
				{
					tamanhoFinalDaTela = window.innerHeight;
				}	
				
				
//				$('#info-musico_'+this.id).css('width', tamanhoFoto + tamanhoInfos + 20);
			}
		});
		
		$('.infos-geral').append('<div class="fechar clicavel" onclick="javascript:fechar()"></div><div class="clear"></div>');
		
		$('.infos-geral').css('display','block');
		
		if(tamanhoFinalDaTela == 0) {
			tamanhoFinalDaTela = window.innerHeight;
			console.log(tamanhoFinalDaTela);
		}
		
		
		$('.infos-geral').animate({
			'width':'100%',
			'height': tamanhoFinalDaTela + 20,
			'left': 0,
			'top': 0
		}, 1000);
	});
}

function verificarFacebookTwitter(facebook, twitter)
{
	var retorno = '';
	if(facebook != "nao_tem")
	{
		retorno += '<a href="http://www.facebook.com/' + facebook + '" target="_blank"><img src="/assets/facebook.fw.png" /></a>'; 
	}
	
	if(twitter != "nao_tem")
	{
		retorno += '<a href="http://www.twitter.com/' + twitter + '" target="_blank"><img src="/assets/twitter.fw.png" /></a>'; 
	}
	
	return retorno;
}
