class Album < ActiveRecord::Base
	validates :nome, :presence => true
	validates :data_evento, :presence => true
	
	has_many :fotos


	def selectDesc(comeco, limite)
		return Album.where("id > ?", comeco).order("id DESC").limit(limite)
	end

	def retirarAlbumDaListaSeNaoTiverFotos(albuns)
		retornoAlbuns = Array.new

		for i in 0..(albuns.size - 1) do
			if albuns[i].fotos.present?
				retornoAlbuns << albuns[i]
			end
		end
	
		return retornoAlbuns
	end

	def verificarSeExisteAlbum(idAlbum)
		album = Album.find(idAlbum)
		if album.blank?
			throw Exception
		else
			return album
		end		
	end

	def verificarSeExisteFotos(album)
		if album.fotos.blank?
			throw Exception
		else
			return album.fotos
		end	
	end
end
