class Tiddler < ActiveRecord::Base

  acts_as_versioned :limit => 10, :if => Proc.new { |t| !t.recently_revised? }, :if_changed => [ :body ]
  
  validates_presence_of :title

  def recently_revised?; 
    return false if new_record? or versions.length==0
    versions.last.updated_on + 15.minutes > Time.now
  end

#  def not_recently_revised?; ! recently_revised?; end

  def modified
    updated_on.strftime("%Y%m%d%H%M")
  end

  def tags=(new_tags)
    write_attribute 'tags', new_tags
    self.private = tagged?("private")
  end
  
  def public?
    # private by default cancels public
    tagged?("public") and not private?
  end
  
  def tagged?(tag)
    tags.to_s.split(" ").include?(tag)
  end
  
  def unescape
    patterns = { '\\n' => "\n", '\\s' => "\s",
      '&amp;' => "&", "&quot;" => '"', "&lt;" => "<",	"&gt;" => ">"
      }
    txt=body
    patterns.each { |p,r| txt.gsub!(p,r) }
    txt
  end
  
  # for links in RSS
  def hash_title
    title=self.title
    title="[[" + title + "]]" if title =~ /\s+/
    CGI.escape(title).gsub("+","%20");
  end
 
end
  
# add this needed routine for the versioned class as well
Tiddler.versioned_class.class_eval do

  def modified
    updated_on.strftime("%Y%m%d%H%M")
  end
  
end