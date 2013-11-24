$(document).ready(function(){
	
	var data = new Date();
	var mesCorreto = data.getMonth() + 1;
	var mes = (mesCorreto <= 9) ? '0' + mesCorreto : mesCorreto;
	var ano = data.getFullYear();

	contagemMeses = 1;
	procurarEventos(mes + "/" + ano);
});



function procurarEventos(data)
{
	var mesAnoCorrente = numeroNomeMesAno(data);
	var html = '';
	$.getJSON("/eventos/eventoComData.json", {"dataProcura": data} , function(eventos){
		html = '<div id="mesCorrente" class="texto-centralizado titulo padding-um-por-cento radius-sete-por-cento-top fonte-verde-claro">' + mesAnoCorrente + '</div>';
		html += '<table class="cem-por-cento padding-um-por-cento fonte-branco">';
		if(eventos.mensagem == 'sem_eventos')
		{
			html += '<tr class="erro texto-centralizado"><td>&nbsp;</td><td class="padding-um-por-cento">N&atilde;o existem eventos</td><td>&nbsp;</td></tr>';
		}
		else
		{
			$(eventos).each(function(){
				var listaData = this.data_evento.split("-")
				var dataFinal = listaData[2] + "/" + listaData[1] + "/" + listaData[0];
				var nome = "";
				if(this.evento_liberado == false) {
					nome = '<p class="fonte-vermelho">Data não liberada</p>';
					dataFinal = '<p class="fonte-vermelho">' + dataFinal + '</p>';
				} else {
					nome = this.nome;
				}
					
				html += '<tr class="texto-centralizado"><td class="padding-1-por-cento linha-branca">' + dataFinal + '</td><td class="padding-1-por-cento-total linha-branca">' + nome + '</td>';
			});
		}
		html += '</table>';
		$('.calendario').append(html);

		if(contagemMeses < 6) {
                	var data = new Date();
                	data.setMonth(data.getMonth() + contagemMeses);
                	var mesCorreto = data.getMonth() + 1;
                	var mes = (mesCorreto <= 9) ? '0' + mesCorreto : mesCorreto;
                	var ano = data.getFullYear();
			
                	contagemMeses++;

                	procurarEventos(mes + "/" + ano);
        	}
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
			mes = 'Março';
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
 
