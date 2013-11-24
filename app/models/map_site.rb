class MapSite < ActiveRecord::Base
	validates :lugar, :presence => true
	has_many :mensagems
end
