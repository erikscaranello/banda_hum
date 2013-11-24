class AddColumnToMusicoFoto < ActiveRecord::Migration
  def change
	change_table :musico_fotos do |t|
		t.references :foto
		t.references :musico
	end
  end
end
