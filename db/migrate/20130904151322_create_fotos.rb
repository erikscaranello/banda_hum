class CreateFotos < ActiveRecord::Migration
  def change
    create_table :fotos do |t|
      t.string :descricao
      t.string :link

      t.timestamps
    end
  end
end
