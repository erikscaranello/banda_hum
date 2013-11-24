class CreateConversaoDeData < ActiveRecord::Migration
  def change
    create_table :conversao_de_data do |t|

      t.timestamps
    end
  end
end
