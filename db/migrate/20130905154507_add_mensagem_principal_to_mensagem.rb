class AddMensagemPrincipalToMensagem < ActiveRecord::Migration
  def change
	change_table :mensagems do |t|
		t.integer :mensagem_principal_id
	end
  end
end
