class AccountController < ApplicationController

  def login
    return unless @request.post?
    if params[:user_password]==User.passwd
      @session[:user]=true
      return redirect_to(:edit_url)
    end
    flash.now['bad'] = "Login unsuccessful, try again."
  end
  
  def logout
    @session[:user] = nil
    redirect_to :home_url unless request.xhr?
  end
  
end
