class ContatoController < ApplicationController
  	def index
  	end

	def envioContato
		
		mensagem = Mensagem.new
		insertBoolean = mensagem.inserirContato(params[:nome], params[:email], params[:mensagem])
		
		respond_to do |format|
        		format.json { render :json => insertBoolean }
     		end	
	end
end	
