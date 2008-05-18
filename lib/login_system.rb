require_dependency "user"

module LoginSystem 
  
  protected
  
  def self.included(base)
    base.send :helper_method, :logged_in? 
  end

  def logged_in?
    session[:user]
  end
  
  def login_required
    return true if logged_in?
    access_denied
    return false 
  end

  def access_denied
    redirect_to :controller=>"/account", :action =>"login"
  end  
  
end