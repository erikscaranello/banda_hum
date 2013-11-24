class Instrumento < ActiveRecord::Base
	has_and_belongs_to_many :musicos
	validates :instrumento, :presence => true
	validates :foto, :presence => true
	

	def obterInstrumentos
		return Instrumento.all
	end 
	
	def obterMusicosPorInstrumento idInstrumento
		musicos =  Instrumento.find(idInstrumento).musicos
		
		arrayRetorno = []
		for musico in musicos
			fotosMusico = FotosMusico.where(:musico_id => 1).where(:foto_principal => true).first
                        foto = Foto.find(fotosMusico.foto_id)

			obj = {}

			obj["id"] = musico.id
			obj["descricao"] = musico.descricao
			obj["email"] = musico.email
			obj["estilosMusicais"] = musico.estilos_musicais
			obj["facebook"] = musico.facebook
			obj["twitter"] = musico.twitter
			obj["nome"] = musico.nome			

			obj["foto"] = foto.link
			
			arrayRetorno << obj
		end
		
		if arrayRetorno.empty?
			obj = {}
			obj["mensagem"] = "sem_musicos"
			arrayRetorno << obj
			return arrayRetorno	
		else
			return arrayRetorno
		end	
	end
end
