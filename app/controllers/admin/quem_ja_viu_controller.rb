class Admin::QuemJaViuController < ApplicationController
  	
  	layout "admin"

  	def index
  		mensagemModel = Mensagem.new
		@mensagemContato = mensagemModel.obterUltimasMensagens("quem nos ouviu", "blog", 0, params[:limite], params[:page])  
		@total = mensagemModel.contagemTotal("quem nos ouviu", "blog", 0)
  	end
end
