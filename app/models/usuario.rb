class Usuario < ActiveRecord::Base
	validates :nome, :presence => true
	validates :login, :presence => true
	validates :senha, :presence => true
	validates :email, :presence => true
	validates :tipo_usuario_id, :presence => true

	belongs_to :tipo_mensagem
end
