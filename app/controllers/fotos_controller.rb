class FotosController < ApplicationController
	def index
		album = Album.new
		albuns = album.selectDesc(0, 10)
		@albuns = album.retirarAlbumDaListaSeNaoTiverFotos(albuns)
		@idAlbumPrimeiro = @albuns[0].id		
	end
	
	def fotosPorAlbum
		album = Album.new
		retorno = nil
		begin
			retorno = album.verificarSeExisteFotos( album.verificarSeExisteAlbum(params[:id]) )
			
		rescue Exception => e
			puts e.message
			retorno = {"mensagem" => "sem_fotos"}
		ensure
                        respond_to do |format|
                                format.json { render :json => retorno }
                        end
		end
	end

	def procurarFotos
		foto = Foto.new
		retorno = nil
		
		conversaoDeData = ConversaoDeData.new
		dataConvertida = conversaoDeData.conversaoPtBrEn(params[:dataProcura])
		
		begin
			retorno = foto.verificarSelect(params[:busca], dataConvertida)
		rescue
			retorno = {"mensagem" => "sem_fotos"}
		ensure
			 respond_to do |format|
                                format.json { render :json => retorno }
                        end
		end	
	end
end
