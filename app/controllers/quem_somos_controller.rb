class QuemSomosController < ApplicationController
  def index
	mensagem = Mensagem.new
	@quemSomos = mensagem.obterMensagemQuemSomos
	
	foto = Foto.new
        begin
                @fotos = foto.obterFoto(10, 5)
        rescue
                @fotos = "sem_fotos"
        end

  end
end
