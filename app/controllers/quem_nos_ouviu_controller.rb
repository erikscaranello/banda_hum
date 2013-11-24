class QuemNosOuviuController < ApplicationController
	def index
 		mensagem = Mensagem.new
		@mensagens = mensagem.obterMensagemQuemNosOuviu
	end
	
	def enviarComentario
		mensagem = Mensagem.new
		mensagemRetorno = nil
		begin
			mensagem.inserirMensagemPrincipalQuemNosOuviu(params[:id], params[:nome], params[:email], params[:mensagem])
			mensagemRetorno = {"mensagem" => "ok"}
		rescue Exception => e
			mensagemRetorno = {"mensagem" => "nao_enviado"} 
		ensure
			respond_to do |format|
                                format.json { render :json => mensagemRetorno}
                        end
		end
	end
	
	def comentarios
		mensagem = Mensagem.new
		mensagemRetorno = nil
		begin
			mensagemRetorno = mensagem.obterComentarios(params[:id])	
		rescue
			mensagemRetorno = {"mensagem" => "sem_comentarios"}
		ensure
			respond_to do |format|
                                format.json { render :json => mensagemRetorno}
                        end
		end
	end
end
