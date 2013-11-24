class Admin::MusicosAdminController < ApplicationController
  	layout "admin"
	def index
		musico = Musico.new
		@musicos = musico.obterMusicosFotosInstrumentos(true)		
  	end
	
	def excluirMusico
		respond_to do |format|
			format.json{render :json => true}
		end
	end

	def new				
	end

	def envioMusico
		musico = Musico.new
		musico.inserirMusicoNovo(params[:musico])				
	end
end
