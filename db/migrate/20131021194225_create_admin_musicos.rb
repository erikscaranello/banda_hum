class CreateAdminMusicos < ActiveRecord::Migration
  def change
    create_table :admin_musicos do |t|

      t.timestamps
    end
  end
end
