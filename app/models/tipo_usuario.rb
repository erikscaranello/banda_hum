class TipoUsuario < ActiveRecord::Base
	validates :tipo, :presence => true 

	has_many :usuarios
end
