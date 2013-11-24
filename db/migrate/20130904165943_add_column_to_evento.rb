class AddColumnToEvento < ActiveRecord::Migration
  def change
  	change_table :eventos do |t|
		t.references :musico
	end
  end
end
