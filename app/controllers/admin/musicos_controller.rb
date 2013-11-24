class Admin::MusicosController < ApplicationController
  # GET /admin/musicos
  # GET /admin/musicos.json

	layout "admin"
  def index
    musico = Musico.new

    @admin_musicos = musico.obterMusicosFotosInstrumentos(true)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @admin_musicos }
    end
  end

  # GET /admin/musicos/1
  # GET /admin/musicos/1.json
  def show
    @admin_musico = Musico.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @admin_musico }
    end
  end

  # GET /admin/musicos/new
  # GET /admin/musicos/new.json
  def new
    @admin_musico = Musico.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @admin_musico }
    end
  end

  # GET /admin/musicos/1/edit
  def edit
    @admin_musico = Musico.find(params[:id])
  end

  # POST /admin/musicos
  # POST /admin/musicos.json
  def create
	
    #@admin_musico = Musico.new(params[:musico])

    respond_to do |format|
      #if @admin_musico.save
        #format.html { redirect_to @admin_musico, notice: 'Musico was successfully created.' }
        #format.json { render json: @admin_musico, status: :created, location: @admin_musico }
      #else
        #format.html { render action: "new" }
        format.json { render json: params[:link]} #@admin_musico.errors, status: :unprocessable_entity }
      #end
    end
  end

  # PUT /admin/musicos/1
  # PUT /admin/musicos/1.json
  def update
    @admin_musico = Musico.find(params[:id])

    respond_to do |format|
      if @admin_musico.update_attributes(params[:admin_musico])
        format.html { redirect_to @admin_musico, notice: 'Musico was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @admin_musico.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/musicos/1
  # DELETE /admin/musicos/1.json
  def destroy
    @admin_musico = Musico.find(params[:id])
    @admin_musico.destroy

    respond_to do |format|
      format.html { redirect_to admin_musicos_url }
      format.json { head :no_content }
    end
  end
end
