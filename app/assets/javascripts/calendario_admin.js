$(document).ready(function(){			
	
        	procurarEventosCalendario(dataAtual());

        	$('#procura-eventos-data').datepicker({
                	changeMonth: true,
                	changeYear: true,
                	dateFormat: 'mm/yy',
                	dayNames: ['Domingo','Segunda','Ter&ccedil;a','Quarta','Quinta','Sexta','S&aacute;bado','Domingo'],
                	dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
                	dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                	monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                	monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                	nextText: 'Pr&oacute;ximo',
                	prevText: 'Anterior'
        	});

        	$('.botao-de-procura').click(function(){
                	if($(this).attr('id') == 'botao-procurar')
                	{
                        	if($('#procura-eventos-data').val() === '' || $('#procura-eventos-data').val() === null)
                        	{
                                	alert('Preencha o campo de data');
                        	}
                        	else
                        	{
                                	procurarEventosCalendario($('#procura-eventos-data').val());
                        	}
                	}
        	});
});


function dataAtual() {
	var data = new Date();
        var mesCorreto = data.getMonth() + 1;
        var mes = (mesCorreto <= 9) ? '0' + mesCorreto : mesCorreto;
        var ano = data.getFullYear();
	return mes + "/" + ano;
}


function procurarEventosCalendario(data)
{
        var mesAnoCorrente = numeroNomeMesAnoCalendario(data);
        var html = '';
        $.getJSON("/eventos/eventoComData.json", {"dataProcura": data} , function(eventos){
		                
		html = '<div id="mesCorrente" class="texto-centralizado titulo margin-top texto-vinte-quatro-pixels"><div class="seta-esquerda clicavel" onclick="voltarMes(\''+data+'\');"></div>' + mesAnoCorrente + '<div class="seta-direita clicavel" onclick="avancarMes(\''+data+'\');"></div></div>';
                html += '<table class="cem-por-cento margin-bottom-2-por-cento">';
                html += '<tr class="texto-centralizado"><td></td><td>&nbsp;</td><td>&nbsp;</td></tr>';
                if(eventos.mensagem == 'sem_eventos')
                {
                        html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total">N&atilde;o existem eventos</td><td>&nbsp;</td></tr>';
			
			html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total"><p>&nbsp;</p></td><td>&nbsp;</td></tr>';
			

			html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total"><p style="cursor:pointer; color:#FF0000;" onclick="javascript:criarEvento();">Clique aqui se você quiser criar um evento</p></td><td>&nbsp;</td></tr>';
                }
                else
                {
			$(eventos).each(function(){
				var listaData = this.data_evento.split("-");
				var dataFinal = listaData[2] + "/" + listaData[1] + "/" + listaData[0];
				
				if(this.evento_liberado == false) {
				html += '<tr class="titulo texto-centralizado fonte-vermelho-escuro"><td class="padding-1-por-cento-total linha-embaixo">' + dataFinal + '</td><td class="padding-1-por-cento-total linha-embaixo">Evento não liberado</td><td class="padding-1-por-cento-total linha-embaixo">' + (this.musico_nome == null ? "Sem músico cadastrado" : this.musico_nome) + '</td><td class="possivel-escrever" onclick="javascript:editarEvento('+ this.id +');">editar</td><td class="possivel-escrever" onclick="javascript:excluirEvento('+ this.id +');">excluir</td></tr>';						
				} else {
					html += '<tr class="titulo texto-centralizado"><td class="padding-1-por-cento-total linha-embaixo">' + dataFinal + '</td><td class="padding-1-por-cento-total linha-embaixo">' + this.nome + '</td><td class="padding-1-por-cento-total linha-embaixo">' + (this.descricao != null ? this.descricao : "" ) + '</td><td class="possivel-escrever" onclick="javascript:editarEvento('+ this.id +');">editar</td><td class="possivel-escrever" onclick="javascript:excluirEvento('+ this.id +');">excluir</td></tr>';
				}
			});
			html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total"><p>&nbsp;</p></td><td>&nbsp;</td></tr>';
			
			 html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total"><p style="cursor:pointer; color:#FF0000;" onclick="javascript:criarEvento();">Clique aqui se você quiser criar um evento</p></td><td>&nbsp;</td></tr>';
                }
	
                html += '</table>';
		
                $('.eventos').html(html).show("slow");
        });
}



function numeroNomeMesAnoCalendario(data)
{
        var dataCortada = data.split('/');
        var dataCorreta = '';
        var ano = '';
        var mes = '';
        if(dataCortada.length == 2)
        {
                if(dataCortada[0] != '10')
                {
                        var variavelRetirarZero = dataCortada[0].replace('0', '');
                        dataCorreta = variavelRetirarZero;
                        ano = dataCortada[1];
                }
                else
                {
                        dataCorreta = dataCortada[0];
                        ano = dataCortada[1];
                }
        }
        else
        {
                dataCorreta = dataCortada[1];
                ano = dataCortada[2];
        }

        var dataCorretaInt = parseInt(dataCorreta);
	
	switch (dataCorretaInt) {
                case 1:
                        mes = 'Janeiro';
                break;
                case 2:
                        mes = 'Fevereiro';
                break;
                case 3:
                        mes = 'Mar&ccedil;o';
                break;
                case 4:
                        mes = 'Abril';
                break;
                case 5:
                        mes = 'Maio';
                break;
                case 6:
                        mes = 'Junho';
                break;
                case 7:
                        mes = 'Julho';
                break;
                case 8:
                        mes = 'Agosto';
                break;
                case 9:
                        mes = 'Setembro';
                break;
                case 10:
                        mes = 'Outubro';
                break;
                case 11:
                        mes = 'Novembro';
                break;
                case 12:
                        mes = 'Dezembro';
                break;
        }

	return mes + '/' + ano;
}


function voltarMes(data)
{
        var dataCortada = data.split('/');

        var data = new Date(dataCortada[0]+ '/' + '01/' +dataCortada[1]);
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        if(mes == 1)
        {
                mes = 12;
                ano--;
        }
        else
        {
                mes--;
        }

        if(mes <= 9)
        {
                mes = '0' + mes;
        }

        procurarEventosCalendario(mes + '/' + ano);
}

function avancarMes(data)
{
        var dataCortada = data.split('/');

        var data = new Date(dataCortada[0]+ '/' + '01/' +dataCortada[1]);
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        if(mes == 12)
        {
                mes = 1;
                ano++;
        }
        else
        {
                mes++;
        }

        if(mes <= 9)
        {
                mes = '0' + mes;
        }

        procurarEventosCalendario(mes + '/' + ano);
}

function criarEvento() {
	if ( $('body').find('.criar-novo-evento').length == 0 ) {
		var html = '<div class="criar-novo-evento" style="position:absolute; width:80%; height:80%; left:10%; top:10%; z-index:100; background:#000;border:1px solid #FFF">';
		html += '<div class="cinquenta-por-cento lado-esquerdo">';
		
		html += '<p class="fonte-branco">Data *</p> ';
		html += '<p><input type="text" class="eventos-data" name="data" />';
		html += '<p class="fonte-branco margin-top"> Cancelar a data para eventos? *</p>';
		html += '<p class="fonte-branco">Sim <input type="radio" value="false" name="cancela_evento" onclick="javascript:cancelarEvento(false)" checked /> &nbsp; &nbsp; &nbsp; Não <input type="radio" value="true" name="cancela_evento" onclick="javascript:cancelarEvento(true)" /></p>';
		
		html += '<p class="margin-top"><input type="button" onclick="javascript:enviarEditarEvento(this);" value="Enviar evento" /></p>';			
		html += '<div id="fechar-janela" class="fonte-branco bottom-2-por-cento right-2-por-cento" onclick="javascript:fecharJanela();"></div>';	
		html += '</div>';			
		html += '</div>';

		$('body').append(html);
	}

	$('.eventos-data').datepicker({
       		changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy',
               	dayNames: ['Domingo','Segunda','Ter&ccedil;a','Quarta','Quinta','Sexta','S&aacute;bado','Domingo'],
                dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
                dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                nextText: 'Pr&oacute;ximo',
                prevText: 'Anterior'
  	});
}


function cancelarEvento(escolha) {
	if(escolha == true) {
		if($('.criar-novo-evento').find('#infos-pessoais').length == 0) {

			var html = '<div class="cinquenta-por-cento lado-esquerdo" id="infos-pessoais">';
			html += '<p class="fonte-branco">Nome do Evento</p>';
			html += '<p><input type="text" name="nome_do_evento" /></p>';
			html += '<p class="fonte-branco margin-top">Descrição do evento</p>';
			html += '<p><textarea name="descricao_do_evento" style="width:250px; height:160px"></textarea></p>';
			

			html += '</div>';
			$('.criar-novo-evento').append(html);
		}
	} else {
		$('#infos-pessoais').remove();
	}
}




function cancelarEventoComInfos(escolha, nome, descricao) {
        if(escolha == true) {
                if($('.criar-novo-evento').find('#infos-pessoais').length == 0) {

                        var html = '<div class="cinquenta-por-cento lado-esquerdo" id="infos-pessoais">';
                        html += '<p class="fonte-branco">Nome do Evento</p>';
			html += '<p><input type="text" name="nome_do_evento" value="'+ (nome == "null" ? "" : nome) +'" /></p>';
                        html += '<p class="fonte-branco margin-top">Descrição do evento</p>';
                        html += '<p><textarea name="descricao_do_evento" style="width:250px; height:160px">'+ (descricao == "null" ? "" : descricao) +'</textarea></p>';


                        html += '</div>';
                        $('.criar-novo-evento').append(html);
                }
        } else {
                $('#infos-pessoais').remove();
        }
}

function fecharJanela() {
	$('.criar-novo-evento').remove();
}

function enviarNovoEvento(dom) {
	var domPai = $(dom).parent().parent().parent();
	var dataEvento = $(domPai).find('input[name="data"]').val();
	var eventoLiberado = $(domPai).find('input[name="cancela_evento"]:checked').val() == 'true' ? true : false ;	 	

	if(dataEvento == "" || dataEvento == null) {
		alert("A data do evento é obrigatória!");		
	} else {
		var nome = '';
		var descricao = '';
		
		if(eventoLiberado == true) {
			nome = $(domPai).find('input[name="nome_do_evento"]').val();
			descricao = $(domPai).find('textarea[name="descricao_do_evento"]').val();
		}
		
		if(eventoLiberado == true && nome == '') {
			alert("Insira o nome do evento.");
		} else {
			 $.getJSON("/admin/eventos/inserirEvento.json", {"dataEvento":dataEvento, "eventoLiberado":eventoLiberado, "nome": nome, "descricao": descricao } , function(retorno) {				
				if(retorno == true) {
					mensagemDeOk();
				}
			}).fail(function(erro){
				if(erro.responseText == "evento_nao_liberado") {
                                        alert("Esta data não está liberada para tocar!");
                                }
				if(erro.responseText == "nao_salvo") {
					alert("O evento não pode ser salvo. Tente novamente mais tarde");
				}
                                if(erro.responseText == "evento_existente") {
                                        if (confirm('Já existe um evento para essa data. Você quer reescrevê-lo?')) {
                                        	$.getJSON("/admin/eventos/forcarEvento.json", {"dataEvento":dataEvento, "eventoLiberado":eventoLiberado, "nome": nome, "descricao": descricao } , function(retorno) {
							if(retorno == true) {
								mensagemDeOk();
							}
                                        	}).fail(function(){
                                        		alert("O evento não pode ser salvo. Tente novamente mais tarde");
						});
					}
                                }
			});		
		}
			
	}	
}






function mensagemDeOk() {
	alert("Atualizado com sucesso!");
        $('.criar-novo-evento').remove();
        procurarEventosCalendario(dataAtual())
}



function editarEvento(id) {
	
	if ( $('body').find('.criar-novo-evento').length == 0 ) {
		$.getJSON("/admin/eventos/editarEvento.json", {"id":id} , function(retorno) {			
				var listaData = retorno.data_evento.split("-")
				var dataFinal =listaData[2] + "/" + listaData[1] + "/" + listaData[0];
				
                	var html = '<div class="criar-novo-evento" style="position:absolute; width:80%; height:80%; left:10%; top:10%; z-index:100; background:#000;border:1px solid #FFF">';
                	html += '<div class="cinquenta-por-cento lado-esquerdo">';

                	html += '<p class="fonte-branco">Data *</p> ';
                	html += '<p><input type="text" class="eventos-data" name="data" value="'+ dataFinal +'" />';
                	html += '<p class="fonte-branco margin-top"> Cancelar a data para eventos? *</p>';
			html += '<p class="fonte-branco">Sim <input type="radio" value="false" name="cancela_evento" onclick="javascript:cancelarEventoComInfos(false, \'' + retorno.nome + '\', \'' + retorno.descricao + '\')" checked /> &nbsp; &nbsp; &nbsp; Não <input type="radio" value="true" name="cancela_evento" onclick="javascript:cancelarEventoComInfos(true, \'' + retorno.nome + '\', \'' + retorno.descricao + '\')" /></p>';

                	html += '<p class="margin-top"><input type="button" onclick="javascript:enviarEditarEvento(this);" value="Enviar evento" /></p>';  
                	html += '<div id="fechar-janela" class="fonte-branco bottom-2-por-cento right-2-por-cento" onclick="javascript:fecharJanela();"></div>';
                	html += '</div>';
                	html += '</div>';
			
			$('body').append(html);
		});
        }
}

function excluirEvento(id) {
	if (confirm('Você quer excluir este evento?')) {
		$.getJSON("/admin/eventos/excluirEvento.json", {"id":id} , function(retorno) {
			if(retorno == true) {
                        	mensagemDeOk();
                       	}
              	}).fail(function(){
              		alert("O evento não pode ser excluido. Tente novamente mais tarde");
                });	
	}	
}



function enviarEditarEvento(dom) {
	var domPai = $(dom).parent().parent().parent();
	var dataEvento = $(domPai).find('input[name="data"]').val();
	var eventoLiberado = $(domPai).find('input[name="cancela_evento"]:checked').val() == 'true' ? true : false ;	 	

	if(dataEvento == "" || dataEvento == null) {
		alert("A data do evento é obrigatória!");		
	} else {
		var nome = '';
		var descricao = '';
		
		if(eventoLiberado == true) {
			nome = $(domPai).find('input[name="nome_do_evento"]').val();
			descricao = $(domPai).find('textarea[name="descricao_do_evento"]').val();
		}
		
		if(eventoLiberado == true && nome == '') {
			alert("Insira o nome do evento.");
		} else {
			$.getJSON("/admin/eventos/forcarEvento.json", {"dataEvento":dataEvento, "eventoLiberado":eventoLiberado, "nome": nome, "descricao": descricao } , function(retorno) {
				if(retorno == true) {
					mensagemDeOk();
				}
                 	}).fail(function(){
                        	alert("O evento não pode ser salvo. Tente novamente mais tarde");
			}); 		
		}
			
	}	
}
