class AddColumnToUsuario < ActiveRecord::Migration
  def change
	change_table :usuarios do |t|
		t.references :tipo_usuario
	end
  end
end
