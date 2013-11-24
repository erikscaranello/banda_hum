class EventosController < ApplicationController
  	def index
  	end
		
	def eventoComData
		retorno = nil
		begin
			evento = Evento.new
			evento.dataVazia(params[:dataProcura])
			
			conversaoDeData = ConversaoDeData.new
			data = conversaoDeData.stringToDateEvento(params[:dataProcura])
			retorno = evento.eventosPorData(data)

		rescue 
			retorno = {"mensagem" => "sem_eventos"}
		ensure 
			respond_to do |format|
                                format.json { render :json => retorno }
                        end	
		end		
	end
end
