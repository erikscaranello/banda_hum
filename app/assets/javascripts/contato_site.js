$(document).ready(function(){
	$('input[type=button]').click(function(){
		var nome = $("input[name=nome]");
		var email = $("input[name=email]");
		var mensagem = $("textarea[name=mensagem]");
		try{
			notNull(nome);
			validarEmail(email.val());
			notNull(mensagem);
			
			enviarMensagem(nome.val(), email.val(), mensagem.val());
			
		}
		catch (e) {
			alert(e.message);
		}
	});
});




function validarEmail(email){
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    
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



function enviarMensagem(nome, email, mensagem)
{
	$.getJSON("/contato/envioContato.json", {"nome": nome, "email" : email, "mensagem" : mensagem} , function(retorno){
		if(retorno == true)
		{
			$("input[name=nome]").val('');
			$("input[name=email]").val('');
			$("textarea[name=mensagem]").val('');
			$("input[name=email]").val('');
			
			alert('Obrigado por entrar em contato. Em breve responderemos sua mensagem');
		}
		else
		{
			alert('Ocorreu um erro, por favor tente de novo');
		}	
	});
}
