class Admin::EventosAdminController < ApplicationController
	layout "admin"
	
	def index
	end
	
	def inserirEvento
		@evento = Evento.new
		begin
			retorno = @evento.insercaoDadosDoEvento(params[:dataEvento], params[:descricao], params[:eventoLiberado], params[:nome])
		rescue => e 
			retorno = e.message
		ensure
			respond_to do |format|
				format.json {render :json => retorno}
			end 
		end
	end
	
	def forcarEvento
		@evento = Evento.new	
		begin
			retorno = @evento.uplodadDadosDoEvento(params[:dataEvento], params[:descricao], params[:eventoLiberado], params[:nome])
		rescue => e
			retorno = e.message
		ensure
			respond_to do |format|
				format.json{render :json => retorno}
			end	
		end
	end
	
	def editarEvento
		respond_to do |format|
			format.json{render :json => Evento.find(params[:id])}
		end
	end

	def excluirEvento
		@evento = Evento.new
                begin
                        retorno = @evento.excluirEvento(params[:id])
                rescue => e
                        retorno = e.message
                ensure
                        respond_to do |format|
                                format.json{render :json => retorno}
                        end
                end
	end
end
