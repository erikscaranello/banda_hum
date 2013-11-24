class CreateMusicoFotos < ActiveRecord::Migration
  def change
    create_table :musico_fotos do |t|
      t.boolean :foto_principal

      t.timestamps
    end
  end
end
