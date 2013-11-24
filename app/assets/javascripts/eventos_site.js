$(document).ready(function(){
	
	var data = new Date();
	var mesCorreto = data.getMonth() + 1;
	var mes = (mesCorreto <= 9) ? '0' + mesCorreto : mesCorreto;
	var ano = data.getFullYear();	
	
	procurarEventos(mes + "/" + ano);
	
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
				procurarEventos($('#procura-eventos-data').val());
			}	
		}
	});
	
});



function procurarEventos(data)
{
	var mesAnoCorrente = numeroNomeMesAno(data);
	var html = '';
	
	$.getJSON("/eventos/eventoComData.json", {"dataProcura": data} , function(eventos){
		
		html = '<div id="mesCorrente" class="texto-centralizado titulo margin-top texto-vinte-quatro-pixels"><div class="seta-esquerda clicavel" onclick="voltarMes(\''+data+'\');"></div>' + mesAnoCorrente + '<div class="seta-direita clicavel" onclick="avancarMes(\''+data+'\');"></div></div>';
		html += '<table width="100" class="width-cem-por-cento margin-bottom-2-por-cento">';
		html += '<tr class="texto-centralizado"><td></td><td>&nbsp;</td><td>&nbsp;</td></tr>';
		if(eventos.mensagem == 'sem_eventos')
		{
			html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="margin-top padding-2-por-cento-total">N&atilde;o existem eventos</td><td>&nbsp;</td></tr>';
		}	
		else
		{
			 $(eventos).each(function(){
				
				if(this.evento_liberado == true) {
					var listaData = this.data_evento.split("-");
                                	var dataFinal = listaData[2] + "/" + listaData[1] + "/" + listaData[0];
					
					html += '<tr class="titulo texto-centralizado"><td class="padding-1-por-cento-total linha-embaixo">' + dataFinal + '</td><td class="padding-1-por-cento-total linha-embaixo">' + this.nome + '</td><td class="padding-1-por-cento-total linha-embaixo">' + (this.descricao != null ? this.descricao : "" ) + '</td></tr>';
				}
			});
		}	
		
		html += '</table>';
		
		$('.eventos').html(html).show("slow");
	});
}


function numeroNomeMesAno(data)
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
	
	procurarEventos(mes + '/' + ano);
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
	
	procurarEventos(mes + '/' + ano);
}
	
