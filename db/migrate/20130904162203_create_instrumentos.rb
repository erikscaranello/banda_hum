class CreateInstrumentos < ActiveRecord::Migration
  def change
    create_table :instrumentos do |t|
      t.string :instrumento
      t.string :foto

      t.timestamps
    end
  end
end
