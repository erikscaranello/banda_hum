class CreateMusicos < ActiveRecord::Migration
  def change
    create_table :musicos do |t|
      t.string :nome
      t.text :descricao
      t.text :estilos_musicais
      t.string :twitter
      t.string :facebook
      t.string :email

      t.timestamps
    end
  end
end
