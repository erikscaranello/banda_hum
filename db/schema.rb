# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131016160357) do

  create_table "albums", :force => true do |t|
    t.string   "nome"
    t.text     "descricao"
    t.date     "data_evento"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "conversao_de_data", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "eventos", :force => true do |t|
    t.date     "data_evento"
    t.string   "nome"
    t.text     "descricao"
    t.boolean  "evento_liberado"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "musico_id"
  end

  create_table "fotos", :force => true do |t|
    t.string   "descricao"
    t.string   "link"
    t.string   "link_file_name"
    t.string   "link_content_type"
    t.integer  "link_file_size"
    t.datetime "link_updated_at"
    t.integer  "album_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  create_table "fotos_musicos", :force => true do |t|
    t.integer  "foto_id"
    t.integer  "musico_id"
    t.boolean  "foto_principal"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "index_services", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "instrumentos", :force => true do |t|
    t.string   "instrumento"
    t.string   "foto"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "instrumentos_musicos", :force => true do |t|
    t.integer  "instrumento_id"
    t.integer  "musico_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "map_sites", :force => true do |t|
    t.string   "lugar"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "mensagems", :force => true do |t|
    t.string   "nome"
    t.string   "email"
    t.text     "mensagem"
    t.date     "data_envio"
    t.boolean  "ok_administrador"
    t.integer  "tipo_mensagem_id"
    t.integer  "map_site_id"
    t.integer  "mensagem_principal_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

  create_table "musicos", :force => true do |t|
    t.string   "nome"
    t.text     "descricao"
    t.text     "estilos_musicais"
    t.string   "twitter"
    t.string   "facebook"
    t.string   "email"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "tipo_mensagems", :force => true do |t|
    t.string   "tipo"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tipo_usuarios", :force => true do |t|
    t.string   "tipo"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "usuarios", :force => true do |t|
    t.string   "nome"
    t.string   "login"
    t.string   "senha"
    t.string   "email"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "tipo_usuario_id"
  end

end
