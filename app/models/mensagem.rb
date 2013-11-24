class Mensagem < ActiveRecord::Base
	#validates :nome, :presence => true
	#validates :email, :presence => true
	validates :mensagem, :presence => true
	validates :data_envio, :presence => true	


	belongs_to :tipo_mensagem
	belongs_to :map_site


	 def obterMensagemIndex
                mapSite = MapSite.where(:lugar => "index").first
                tipoMensagem = TipoMensagem.where(:tipo => "site").first

                return Mensagem.where("tipo_mensagem_id = (?)", tipoMensagem.id).where("map_site_id = (?)", mapSite.id).where("ok_administrador = (?)", true).first

        end

	def obterMensagemQuemSomos
		mapSite = MapSite.where(:lugar => "quem somos").first
		tipoMensagem = TipoMensagem.where(:tipo => "site").first

		return Mensagem.where("tipo_mensagem_id = (?)", tipoMensagem.id).where("map_site_id = (?)", mapSite.id).where("ok_administrador = (?)", true).first
	end

	
	 def obterMensagemQuemNosOuviu
                mapSite = MapSite.where(:lugar => "quem nos ouviu").first
                tipoMensagem = TipoMensagem.where(:tipo => "blog").first

                return Mensagem.where("tipo_mensagem_id = ?", tipoMensagem.id).where("map_site_id = ?", mapSite.id).where("ok_administrador = ?", true).all
        end

	def obterComentarios(id)
		mapSite = MapSite.where(:lugar => "quem nos ouviu").first
                tipoMensagem = TipoMensagem.where(:tipo => "blog").first
		
		mensagens = Mensagem.where("tipo_mensagem_id = ?", tipoMensagem.id).where("map_site_id = ?", mapSite.id).where("ok_administrador = ?", true).where(:mensagem_principal_id => id).order("data_envio DESC").all

		if mensagens.blank?
			throw Exception
		else
			return mensagens
		end		
	end	
	
	def inserirContato(nome, email, mensagemRecebida)
		if nome.blank? || email.blank? || mensagemRecebida.blank?
			return false
		end
	
		mapSite = MapSite.where(:lugar => "contato").first
		tipoMensagem = TipoMensagem.where(:tipo => "contato").first

		mensagem = Mensagem.new

		mensagem.nome = nome
		mensagem.email = email
		mensagem.mensagem = mensagemRecebida
		mensagem.data_envio = Time.now
		mensagem.tipo_mensagem_id = tipoMensagem.id
		mensagem.map_site_id = mapSite.id
		mensagem.mensagem_principal_id = 0
		mensagem.ok_administrador = false		

		if Email.envioMensagem(mensagem).deliver
			mensagem.ok_administrador = true
			if mensagem.save	
				return true
			end
		else
			return false
		end		
	end
	
	def inserirMensagemPrincipalQuemNosOuviu(id, nome, email, mensagemRecebida)
		if id.blank? || nome.blank? || email.blank? || mensagemRecebida.blank? 
			throw Exception
		end
		
		mapSite = MapSite.where(:lugar => "quem nos ouviu").first
                tipoMensagem = TipoMensagem.where(:tipo => "blog").first
		
		mensagem = Mensagem.new
		
		mensagem.mensagem_principal_id = id
                mensagem.nome = nome
                mensagem.email = email
                mensagem.mensagem = mensagemRecebida
		mensagem.data_envio = Time.now
		mensagem.tipo_mensagem_id = tipoMensagem.id
		mensagem.map_site_id = mapSite.id		
		mensagem.ok_administrador = false

		if ! mensagem.save
			throw Exception	
		end
	end

	def obterUltimasMensagens(mapSite, tipoMensagem, mensagemPrincipal, limite, pagina)
		mapSiteRetorno = MapSite.where(:lugar => mapSite).first
		tipoMensagemRetorno = TipoMensagem.where(:tipo => tipoMensagem).first

		mensagens = Mensagem.where("tipo_mensagem_id = ?", tipoMensagemRetorno.id).where("map_site_id = ?", mapSiteRetorno.id).where(:mensagem_principal_id => mensagemPrincipal).order("data_envio DESC").page(pagina).per(limite)

		if mensagens.blank?
			throw Exception
		else
			return mensagens
		end
	end

	def inserirIndexQuemSomosAdmin(mensagemRecebida, mapSite)
		mapSiteRetorno = MapSite.where(:lugar => mapSite).first

		mensagem = Mensagem.new

		mensagensAntigas = Mensagem.where("tipo_mensagem_id = ?", 1).where("map_site_id = ?", mapSiteRetorno.id).where(:mensagem_principal_id => 0).where(:ok_administrador => true).all
		
		for mensagemAntiga in mensagensAntigas
			mensagemAntiga.ok_administrador = false
			mensagemAntiga.save
		end

		mensagem.mensagem = mensagemRecebida
		mensagem.data_envio = Time.now
		mensagem.ok_administrador = true
		mensagem.tipo_mensagem_id = 1
		mensagem.map_site_id = mapSiteRetorno.id
		mensagem.mensagem_principal_id = 0
		
		if mensagem.save
			return true
		else
			return false
		end
	end

	def contagemTotal(mapSite, tipoMensagem, mensagemPrincipal)

		mapSiteRetorno = MapSite.where(:lugar => mapSite).first
                tipoMensagemRetorno = TipoMensagem.where(:tipo => tipoMensagem).first

		return Mensagem.where("tipo_mensagem_id = ?", tipoMensagemRetorno.id).where("map_site_id = ?", mapSiteRetorno.id).where(:mensagem_principal_id => mensagemPrincipal).count	
	end
end
