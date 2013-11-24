class FotoAdmin < ActiveRecord::Base
	attr_accessible :link

        has_attached_file :link, styles:{
                thumb: '150x150>',
                square: '250x250#',
                medium: '350x350>'
        }	
end
