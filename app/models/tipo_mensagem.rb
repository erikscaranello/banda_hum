class TipoMensagem < ActiveRecord::Base
	validates :tipo, :presence => true
	has_many:mensagems
end
