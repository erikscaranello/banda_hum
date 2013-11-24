class RenameMusicoFotosToFotoMusicos < ActiveRecord::Migration
  def up
	rename_table :musico_fotos, :fotos_musicos
  end

  def down
	rename_table :musico_fotos, :fotos_musicos
  end
end
