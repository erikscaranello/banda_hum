class AddColumnToFoto < ActiveRecord::Migration
  def change
  	change_table :fotos do |t|
		t.references :album
	end 
  end
end
