class MusicosController < ApplicationController
  	def index
		instrumento = Instrumento.new
		@fotosInstrumentos = instrumento.obterInstrumentos
  	end
	
	def infoMusico
		instrumento = Instrumento.new 
		musicos = instrumento.obterMusicosPorInstrumento(params[:id])

		respond_to do |format|
  			format.json { render :json => musicos }
		end
	end
end
