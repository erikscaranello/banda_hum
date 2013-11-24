$(document).ready(function(){
	$('.possivel-escrever').click(function(){
		if(! $(this).hasClass('clicado')) {
			var escritoAntes = $(this).html();
                        
			var input = $('<textarea>');
                        input.attr('placeholder', escritoAntes).attr('name', 'index_quemsomos');
                        $(this).html(input).addClass('clicado');

			var enviar = $('<input>');
			enviar.attr('type', 'button').attr('value', 'Enviar').attr('onclick', 'javascript:receberTextoNovo(this)');
			$(this).append(enviar);
		}
	});

	$('.calendario').click(function(){
		location.href = "/admin/eventos";
	});
		
	$('.contato').click(function(){
		location.href = "/admin/contato?limite=15";
	});
	
	$('.musicos').click(function(){
                location.href = "/admin/musicos";
        });

	$('.quem_ja_viu').click(function(){
			location.href = "/admin/quem_ja_viu?limite=15"
	});
});

function receberTextoNovo(domRecebido) {
	var dom = $(domRecebido);
	var texto = dom.parent().children('textarea').val();
	
	var local = "";

	if(dom.parent().hasClass('index')) {
		local = "index";
	} else if(dom.parent().hasClass('quem_somos_texto')) {
		local = "quem somos";
	}

	if(texto == '' || texto == null) {
		alert("Por favor, preencha um texto.");
	} else {
		$.getJSON("/admin/index_quem_somos/show.json", {"mensagem":texto, 'local':local} , function(retorno){
			if(retorno == true) {
				alert("Seu texto foi inserido com sucesso!");
				dom.parent().removeClass('clicado');
				dom.parent().html(texto);
			} else {
				alert("Não foi possível inserir o texto. Por favor, tente novamente");
			}
		});
	}
}
