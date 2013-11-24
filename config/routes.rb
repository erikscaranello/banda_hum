BandaHum::Application.routes.draw do
  get "quem_ja_viu/index"

  get "contato_admin/index"

  get "quem_nos_ouviu/index"

  get "eventos/index"

  get "contato/index"

  get "quem_somos/index"

  get "home/index"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
     namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
      	#root :to => admin
	get "home", to: 'home#index' 
	get "index_quem_somos", to: 'index_quem_somos#index'
	get "eventos", to: 'eventos_admin#index'
	get "eventos/inserirEvento", to: 'eventos_admin#inserirEvento'
	get "eventos/forcarEvento", to: 'eventos_admin#forcarEvento'
	get "eventos/excluirEvento", to: 'eventos_admin#excluirEvento'
	get "eventos/editarEvento", to: 'eventos_admin#editarEvento'
	get "contato", to: 'contato_admin#index'
	#get "musicos", to: 'musicos_admin#index'
	#get "musicos/excluir_musico", to: 'musicos_admin#excluirMusico'
	#get "musicos/new", to: 'musicos_admin#new'
	#get "musicos/envio_musico", to: 'musicos_admin#envioMusico' 
	get "quem_ja_viu", to: 'quem_ja_viu#index'
	resources :musicos
     end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
   root :to => 'home#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
   match ':controller(/:action(/:id))(.:format)'
end
