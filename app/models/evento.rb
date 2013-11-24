class Evento < ActiveRecord::Base
	has_one :musico
	#validates :nome, :presence => true
	validates :data_evento, :presence => true
	#validates :evento_liberado, :presence => true
	
	def dataVazia(data)
		if data.blank?
			throw Exception.message = "sem_eventos"
		end
	end

	def eventosPorData(data)
		eventos = Evento.find(:all,
		:select => "eventos.*, musicos.nome as musico_nome", 
		:joins => "left join musicos on musicos.id = eventos.musico_id",
		:conditions => ["MONTH(data_evento) = ? AND YEAR(data_evento) = ?", data.strftime("%m"), data.strftime("%Y")])
		if eventos.blank?
			return {"mensagem" => "sem_eventos"}
		else
			return eventos
		end
	end
	
	def insercaoDadosDoEvento(dataEvento, descricaoEvento, eventoLiberado, nomeEvento)
		if dataEvento.blank? || (eventoLiberado == true && nomeEvento.blank?)
			raise "dados_errados"
		else
			conversor = ConversaoDeData.new
			retornoCadastrados = Evento.where(:data_evento => conversor.conversaoPtBrEn(dataEvento)).all
							
			if retornoCadastrados.present? 
				for cadastrado in retornoCadastrados
					if cadastrado.evento_liberado == false
						raise "evento_nao_liberado"
					end
				end
				
				raise "evento_existente"
			end

			eventoRetorno = Evento.new
			eventoRetorno.data_evento = conversor.conversaoPtBrEn(dataEvento)
			eventoRetorno.evento_liberado = eventoLiberado
			eventoRetorno.nome = nomeEvento == "" ? nil : nomeEvento
			eventoRetorno.descricao = descricaoEvento == "" ? nil : descricaoEvento
			eventoRetorno.musico_id = 1
 			
			if eventoRetorno.save
				return true
			else
				raise "nao_salvo"
			end
		end
		
	end

	def uplodadDadosDoEvento(dataEvento, descricaoEvento, eventoLiberado, nomeEvento) 
		conversor = ConversaoDeData.new
		retornoEvento = Evento.where(:data_evento => conversor.conversaoPtBrEn(dataEvento)).first

		retornoEvento.descricao = descricaoEvento
		retornoEvento.nome = nomeEvento
		retornoEvento.evento_liberado = eventoLiberado
		
		if retornoEvento.save
			return true
		else
			raise "nao_salvo"
		end
	end
		
	def excluirEvento(idEvento)
		evento = Evento.find(idEvento)
		
		if evento.destroy
			return true
		else
			raise "nao_exluido"
		end
	end
end
