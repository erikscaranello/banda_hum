function editarMusico(id) {
	alert(id);
}

function excluirMusico(id) {
	if(confirm("Você tem certeza que deseja excluir esse músico?") ) {
		$.getJSON("/admin/musicos/excluir_musico.json", { "idMusico": id } , function(){
			
			alert("Músico excluído com sucesso!");
                       	location.href = "/admin/musicos";			

		}).fail(function(){
			alert("Não foi possível exluir esse músico. Tente novamente mais tarde");	
		});
	}
}


function inserirNovoMusico() {
	
	$('#fileupload').uploadifive({
		'auto'             : false,
		'checkScript'      : 'check-exists.php',
		//'formData'         : {
			//'timestamp' : '<?php echo $timestamp;?>',
			//'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
		//},
		'queueID'          : 'queue',
		'uploadScript'     : '/admin/musicos/create',
		'onUploadComplete' : function(file, data) { console.log(data); }
	});
		
	/*
	$('#fileupload').uploadify({
		//'formData'     : {
		//	'timestamp' : '<?php echo $timestamp;?>',
		//	'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
		//},
		'swf': '/assets/images/uploadify.swf',
		'uploader' : '/admin/musicos/create'
	});	
	*/	
}

$(document).ready(function(){
	$('#fileupload').uploadifive({
		'auto'             : false,
		//'checkScript'      : 'check-exists.php',
		//'formData'         : {
			//'timestamp' : '<?php echo $timestamp;?>',
			//'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
		//},
		'queueID'          : 'queue',
		'uploadScript'     : '/admin/musicos/create',
		'onUpload'     : function(filesToUpload) {
            		alert(filesToUpload + ' files will be uploaded.');
        	}, 
		'onUploadComplete' : function(file, data) { console.log(data); },
		'onError'      : function(errorType) {
            		alert('The error was: ' + errorType);
        	} 
	});
});

