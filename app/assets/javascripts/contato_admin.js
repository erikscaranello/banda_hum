$(document).ready(function(){
	var urlTotal = location.href;
	var urlSemInterrogacao = urlTotal.split("?");
	var urlSemIgual = urlSemInterrogacao[1].split("=");
	
	$('select[name="quantidade_registros"]').val("_" + urlSemIgual[1]).checked
	
	$('select[name="quantidade_registros"]').click(function(){
		var valor = $(this).val().split("_");
		location.href = "/admin/contato?limite=" + valor[1];
	});
});
