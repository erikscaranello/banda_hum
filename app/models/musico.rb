class Musico < ActiveRecord::Base
	validates :nome, :presence => true
	has_and_belongs_to_many :instrumentos
	has_and_belongs_to_many :fotos
	
	mount_uploader :link, LinkUploader, :mount_on => :link_file_name	


	def obterMusicosFotosInstrumentos(fotoPrincipal = false)
		arrayRetorno = Array.new
		
		for musico in Musico.all
			hashInfos = Hash.new
			hashInfos[:musico] = musico
			
			arrayFotos = Array.new
			for fotoMusico in FotosMusico.where(:foto_principal => fotoPrincipal).where(:musico_id => musico.id).all
				foto = Foto.find(fotoMusico.foto_id)
				arrayFotos << foto
			end
			hashInfos[:fotos] = arrayFotos	
			
			
			arrayInstrumentos = Array.new
                        for instrumentoMusico in InstrumentosMusico.where(:musico_id => musico.id).all
                                instrumento = Instrumento.find(instrumentoMusico.instrumento_id)
                                arrayInstrumentos << instrumento
                        end
                        hashInfos[:instrumentos] = arrayInstrumentos
			
			arrayRetorno << hashInfos	
		end
		
		return arrayRetorno
	end
		
	def inserirMusicoNovo(params)
		if Musico.create(params)
			return true
		else
			raise
		end

		#musico.nome = params[:nome]
		#musico.descricao = params[:descricao]
		#musico.estilos_musicais = params[:estilos_musicais]
		#musico.twitter = params[:twitter]
		#musico.facebook = params[:facebook]
		#musico.email = params[:email]

		#if musico.save
		#	return true
		#else
		#	raise	
		#end
	end
end
