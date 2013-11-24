class CreateTipoMensagems < ActiveRecord::Migration
  def change
    create_table :tipo_mensagems do |t|
      t.string :tipo

      t.timestamps
    end
  end
end
