class AddColumnsToInstrumentosMusicos < ActiveRecord::Migration
  	def change
  		change_table :instrumentos_musicos do |t|
			t.integer :instrumento_id
			t.integer :musico_id
		end
	end
end
