class CreateEventos < ActiveRecord::Migration
  def change
    create_table :eventos do |t|
      t.date :data_evento
      t.string :nome
      t.text :descricao
      t.boolean :evento_liberado

      t.timestamps
    end
  end
end
