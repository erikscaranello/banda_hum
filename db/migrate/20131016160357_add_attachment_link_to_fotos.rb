class AddAttachmentLinkToFotos < ActiveRecord::Migration
  def self.up
    change_table :fotos do |t|
      t.attachment :link
    end
  end

  def self.down
    drop_attached_file :fotos, :link
  end
end
