require 'test_helper'

class Admin::MusicosControllerTest < ActionController::TestCase
  setup do
    @admin_musico = admin_musicos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_musicos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_musico" do
    assert_difference('Admin::Musico.count') do
      post :create, admin_musico: @admin_musico.attributes
    end

    assert_redirected_to admin_musico_path(assigns(:admin_musico))
  end

  test "should show admin_musico" do
    get :show, id: @admin_musico
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_musico
    assert_response :success
  end

  test "should update admin_musico" do
    put :update, id: @admin_musico, admin_musico: @admin_musico.attributes
    assert_redirected_to admin_musico_path(assigns(:admin_musico))
  end

  test "should destroy admin_musico" do
    assert_difference('Admin::Musico.count', -1) do
      delete :destroy, id: @admin_musico
    end

    assert_redirected_to admin_musicos_path
  end
end
