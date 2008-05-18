class WikiController < ApplicationController

  before_filter :login_required, :only => [ :destroy, :edit ]
  
	def view
		@tiddlers=Tiddler.find(:all, :conditions => ['private=?',false])
		render :action => "show", :layout => false
	end

	def edit
		@tiddlers=Tiddler.find(:all)
  	render :action => "show", :layout => false
  end

  def save
    @tiddler   = Tiddler.find_by_title(params[:tiddler][:id])
    @tiddler ||= Tiddler.new
    return access_denied unless @tiddler.public? or logged_in?
    previously_public=@tiddler.public?
    @tiddler.attributes = params[:tiddler]
    # if we're not logged in and we're trying to make a public page not public
    # then make it public again
    @tiddler.tags += " public" if previously_public and not @tiddler.public? and not logged_in?
    unless @tiddler.save
      logger.info '502: ERROR trying to save tiddler.'
      return render(:text => params[:tiddler][:id], :status => 502)
    end
    render :text => @tiddler.title
  end

  def destroy
  	@tiddler=Tiddler.find_by_title(params[:id]).destroy
    render :text => @tiddler.title
  rescue # in case we find no tiddler or some other error
  	render :text => params[:id], :status => 502
  end

# revision support

	def revisions(txt="")
  	@tiddler=Tiddler.find_by_title(params[:id])
		txt << @tiddler.modified + " current\n" if @tiddler.updated_on != @tiddler.versions.last.updated_on
		for tiddler in @tiddler.versions.reverse
			txt << tiddler.modified + " " + tiddler.version.to_s + "\n" 
		end
		render :text => txt
	end	
	
	def revision
  	@tiddler=Tiddler.find_by_title(params[:id])
		@tiddler=@tiddler.find_version(params[:revision]) unless params[:revision]=="current"
		render :text => @tiddler.instance_eval {	[title, body.to_s, modifier, modified, tags.to_s].join("\n") }
	end

end
