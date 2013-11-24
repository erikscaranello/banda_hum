class Admin::IndexQuemSomosController < ApplicationController
  	def show
		mensagem = Mensagem.new
		retorno = mensagem.inserirIndexQuemSomosAdmin(params[:mensagem], params[:local])
		respond_to do |format|
                	format.json { render :json => retorno }
           	end  		
	end
end
