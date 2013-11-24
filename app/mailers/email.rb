class Email < ActionMailer::Base
  	default :to => "erikscaranello@gmail.com"
	

	def envioMensagem(mensagem)
		mail(:from => mensagem.email, :subject => "Mensagem de #{mensagem.nome}", :message => mensagem.mensagem)
	end
end
