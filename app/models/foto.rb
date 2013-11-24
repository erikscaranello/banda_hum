class Foto < ActiveRecord::Base
	has_and_belongs_to_many :musicos
	#has_many :
	belongs_to :album
	validates :link, :presence => true
	validates :album_id, :presence => true
	
	attr_accessible :link

        #has_attached_file :link, styles:{
        #        thumb: '150x150>',
        #        square: '250x250#',
        #        medium: '350x350>'
        #}, :path => "/admin/musicos/new"	

	def obterFoto(primeiraFoto, limite)
		contagemFotos = Foto.count
		fotos = Foto.order("id DESC").limit(limite).where("id <= ?", (contagemFotos - primeiraFoto)).all
		if fotos.present?
			return fotos
		else
			throw Exception
		end
	end

	def verificarSelect(busca, data) 

		#arrayRetorno = Array.new

		if busca.blank? || busca == "Digite aqui sua procura"
			albuns = Album.where(:data_evento => data).all
			if albuns.present?
		
				for album in albuns
					if album.fotos.present?
						return album.fotos
					else
						throw Exception
					end
				end
			else
				throw Exception
			end

		elsif data.blank?
			arrayRetorno = Array.new

			albuns = Album.find(:all, :conditions => ["descricao like ?", "%#{busca}%"])
			if albuns.present?
				for album in albuns
					if album.fotos.present?
						for foto in album.fotos
							arrayRetorno << foto
						end
					end
				end
			end
			
			fotos = Foto.find(:all, :conditions => ["descricao like ?", "%#{busca}%"])
			if fotos.present?
				for foto in fotos
					arrayRetorno << foto
				end 
			end

			if arrayRetorno.blank?
				throw Exception
			else
				return arrayRetorno.uniq
			end	
		else
			return Foto.where(:descricao => busca)
		end
	end
end
