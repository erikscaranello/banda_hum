class Admin::ContatoAdminController < ApplicationController
  	layout "admin"
	def index
		mensagemModel = Mensagem.new
		@mensagemContato = mensagemModel.obterUltimasMensagens("contato", "contato", 0, params[:limite], params[:page])  
		@total = mensagemModel.contagemTotal("contato", "contato", 0)
	end
	
	
end
