$(document).ready(function(){
	$('.comentarios-mensagem').click(function(){
		if($(this).hasClass('aparecer'))
		{
			$(this).removeClass('aparecer');
			
			var dom = $(this);
			var id = $(this).attr('id').split('_');
			var nome = '';
			
			dom.html('Clique aqui para apagar os coment&aacute;rios');
			$.getJSON("/quem_nos_ouviu/comentarios", {"id": id[1]} , function(comentarios){
					
				if(comentarios.mensagem == 'sem_comentarios')
				{
					dom.parent().parent('.mensagem-principal').append('<div class="conteudo comentario">'+
							'<div class="mask clear">'+
		    					'<div class="esquerda-mask">'+
		   						'<p>&nbsp;</p>'+
		    					'</div>'+
		    					'<div class="direita-mask">'+
		    						'<p class="mensagem">N&atilde;o existem coment&aacute;rios para esta mensagem</p>'+
		    					'</div>'+
	    					'</div><div class="clear"></div>');
				}
				else
				{	
					$(comentarios).each(function(){

						dom.parent().parent('.mensagem-principal').append('<div class="conteudo comentario">'+
								'<p class="infos-pessoa"><span class="nome titulo">' + this.nome + '</span></p>'+ 
								'<p class="mensagem texto">' + this.mensagem + '</p></div>');
					});
				}		
				
				dom.parent().parent('.mensagem-principal').append('<div class="conteudo comentario">'+
							'<div class="mask clear">'+
								'<div class="esquerda-mask">'+
									'<p>&nbsp;</p>'+
								'</div>'+
								'<div class="direita-mask">'+
									'<p class="bold margin-bottom-2-por-cento">O que voc&ecirc; achou desse post?</p>'+
								'</div>'+
							'</div> <div class="clear"></div>'+
							
							'<div class="mask clear">'+
								'<div class="esquerda-mask">'+
									'<p>Nome:</p>'+
								'</div>'+
								'<div class="direita-mask">'+
									'<p class="nome"><input type="text" class="tipografia texto" name="nome_'+ id[1] +'" size="37" /></p>'+
								'</div>'+
							'</div> <div class="clear"></div>'+
							
							'<div class="mask clear">'+
								'<div class="esquerda-mask">'+
									'<p>E-mail:</p>'+
								'</div>'+
								'<div class="direita-mask">'+
									'<p class="email"><input type="text" class="tipografia texto" name="email_'+ id[1] +'" size="37" /></p>'+
								'</div>'+
							'</div> <div class="clear"></div>'+
							
							'<div class="mask clear">'+
								'<div class="esquerda-mask">'+
									'<p>Mensagem:</p>'+
								'</div>'+
								'<div class="direita-mask">'+
									'<p class="mensagem"><textarea class="tipografia texto" name="mensagem_'+ id[1] +'" rows="6" cols="35" /></p>'+
								'</div>'+
							'</div> <div class="clear"></div>'+
							
							'<div class="mask clear">'+
								'<div class="esquerda-mask">'+
									'<p>&nbsp;</p>'+
								'</div>'+
								'<div class="direita-mask">'+
									'<p class="enviar"><input type="button" class="tipografia texto" value="Enviar" onclick="javascript:pegarValorDoInput('+ id[1] +');" /></p>'+
								'</div>'+
							'</div> <div class="clear"></div>'+
						'</div>');
			});
		}
		else
		{
			$(this).addClass('aparecer');
			$(this).parent().parent('.mensagem-principal').children('.comentario').remove();
			$(this).html('Clique aqui para ver os coment&aacute;rios');
		}	
	});	
});



function pegarValorDoInput(idMensagemPrincipal)
{
	var camposNome = '';
	var camposEmail = '';
	var camposMensagem = '';
	if($('input[name=nome_'+idMensagemPrincipal+']').val() == null || $('input[name=nome_'+idMensagemPrincipal+']').val() == '')
	{
		camposNome = 'nome, ';
	}
	if($('input[name=email_'+idMensagemPrincipal+']').val() == null || $('input[name=email_'+idMensagemPrincipal+']').val() == '')
	{
		camposEmail = 'email, ';
	}
	if($('textarea[name=mensagem_'+idMensagemPrincipal+']').val() == null || $('textarea[name=mensagem_'+idMensagemPrincipal+']').val() == '')
	{
		if(camposNome != '' || camposEmail != '')
		{
			camposMensagem = 'e mensagem';
		}
		else
		{
			camposMensagem = 'mensagem';
		}	
	}
	
	
	
	if(camposNome != '' || camposEmail != '' || camposMensagem != '')
	{
		alert('por favor, preencha os campos de ' + camposNome + camposEmail + camposMensagem);
	}	
	else
	{
		try
		{
                        notNull($('input[name=nome_'+idMensagemPrincipal+']'));
                        validarEmail($('input[name=email_'+idMensagemPrincipal+']').val());
                        notNull($('textarea[name=mensagem_'+idMensagemPrincipal+']'));

     			$.getJSON("/quem_nos_ouviu/enviarComentario", {"id": idMensagemPrincipal, "nome" : $('input[name=nome_'+idMensagemPrincipal+']').val(), "email" : $('input[name=email_'+idMensagemPrincipal+']').val(), "mensagem" : $('textarea[name=mensagem_'+idMensagemPrincipal+']').val()} , function(mensagemRetorno){
                        	if(mensagemRetorno.mensagem == "nao_enviado")
                        	{
                                	alert("Sua mensagem não foi enviada. Por favor tente novamente.");
                        	}
                        	else
                        	{
                                	$('input[name=nome_'+idMensagemPrincipal+']').val('');
                                	$('input[name=email_'+idMensagemPrincipal+']').val('');
                                	$('textarea[name=mensagem_'+idMensagemPrincipal+']').val('');

                                	alert("Comentário enviado com sucesso! A Banda Hum agradece.");
                        	}
                	});

                }
                catch (e) 
		{
                        alert(e.message);
                }	
	}	
	
}


function validarEmail(email){
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(email == "" || email == null)
    {
	throw new Error('Por favor, preencha o campo de e-mail');		
    }	
    if(! filter.test(email))
    {
        throw new Error('Por favor, coloque o e-mail corretamente');
    }
}

function notNull (dom){
        var string = dom.val();

        if(string.length == 0 || string === ''){
        	throw new Error('O campo de ' + dom.attr('name') + ' esta vazio');
    	}
}
