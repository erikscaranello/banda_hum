class AddColumnToMensagem < ActiveRecord::Migration
  def change
	change_table :mensagems do |t|
		add_column :mensagem_prncipal_id, :integer
		t.references :tipo_mensagem
		t.references :map_site
	end
  end
end
