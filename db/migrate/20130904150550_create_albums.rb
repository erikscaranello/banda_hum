class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :nome
      t.text :descricao
      t.date :data_evento

      t.timestamps
    end
  end
end
