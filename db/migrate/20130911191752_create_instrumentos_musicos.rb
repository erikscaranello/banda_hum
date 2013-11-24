class CreateInstrumentosMusicos < ActiveRecord::Migration
  def change
    create_table :instrumentos_musicos do |t|

      t.timestamps
    end
  end
end
