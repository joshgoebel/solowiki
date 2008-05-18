class XmlController < ApplicationController

  def updated
    @headers["Content-Type"] = "text/xml; charset=utf-8" 
    @tiddlers=Tiddler.find(:all, :order => "updated_on DESC", :conditions => ["private=?",false], :limit => 15)

		title=Tiddler.find_by_title( "SiteTitle")
		@feed_title=title.body if title

		subtitle=Tiddler.find_by_title( "SiteSubtitle")
		@feed_desc=subtitle.body if subtitle

 	 render :layout => false
  end
end