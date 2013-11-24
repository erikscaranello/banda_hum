class Admin::HomeController < ApplicationController
  	layout "admin"
	def index
		mensagemModel = Mensagem.new
        	@mensagemIndex = mensagemModel.obterMensagemIndex
		
        	@quemSomos = mensagemModel.obterMensagemQuemSomos

		instrumento = Instrumento.new
                @fotosInstrumentos = instrumento.obterInstrumentos
		
		begin
			@mensagemContato = mensagemModel.obterUltimasMensagens("contato", "contato", 0, 4, 1)
		rescue 
			@mensagemContato = "sem_mensagens"
		end
		
		begin
			@quemJaViu = mensagemModel.obterUltimasMensagens("quem nos ouviu", "blog", 0, 4)
		rescue
			@quemJaViu = "sem_mensagens"
		end


		album = Album.new
                albuns = album.selectDesc(0, 10)
                albunsRetorno = album.retirarAlbumDaListaSeNaoTiverFotos(albuns)

                begin
                        @fotos = album.verificarSeExisteFotos( album.verificarSeExisteAlbum(albunsRetorno[0].id))
                rescue 
                        @fotos = "sem_fotos"
            	end
  	end
end
