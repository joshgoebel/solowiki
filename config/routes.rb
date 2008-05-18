ActionController::Routing::Routes.draw do |map|
  map.home '', :controller => "wiki", :action => "view"
  map.login 'login', :controller => "account", :action => "login"

  map.connect 'xml/:action/feed.xml', :controller => "xml"

  map.edit 'edit', :controller => "wiki", :action => "edit"
  map.connect ':anything', :controller => "wiki", :action => "view"

  # Install the default route as the lowest priority.
  map.connect ':controller/:action/:id'
end
