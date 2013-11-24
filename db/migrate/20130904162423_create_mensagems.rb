class CreateMensagems < ActiveRecord::Migration
  def change
    create_table :mensagems do |t|
      t.string :nome
      t.string :email
      t.text :mensagem
      t.date :data_envio
      t.boolean :ok_administrador

      t.timestamps
    end
  end
end
