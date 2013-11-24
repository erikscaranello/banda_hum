class HomeController < ApplicationController
###	layout "layout_usuario"
  def index
	mensagemModel = Mensagem.new
	@mensagem = mensagemModel.obterMensagemIndex
  	
	foto = Foto.new
	begin
		@fotos = foto.obterFoto(0, 5)
	rescue
		@fotos = "sem_fotos"
	end	
  end
end
