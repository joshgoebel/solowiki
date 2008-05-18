require File.dirname(__FILE__) + '/../test_helper'

class TiddlerTest < Test::Unit::TestCase
  fixtures :tiddlers
  fixtures :tiddler_versions

  def setup
  end

# tagging

  def test_should_be_private_when_tagged_private
		tiddler=Tiddler.new
		tiddler.title="Top Secret"
		tiddler.tags="private"
		assert tiddler.private?
		assert_equal true, tiddler.private
    assert tiddler.private?
	end

	def test_should_not_be_public_if_private
		# private should win
		assert ! @public_and_private.public?, "cannot be public if private"
	end
	
	def test_should_update_private_attr_immediately_when_tags_are_updates
		assert @private_tiddler.private?
		assert ! @private_tiddler.public?
		@private_tiddler.tags=""
		assert ! @private_tiddler.private?, "private field not in sync with tags"
	end

	def test_should_not_be_public_if_not_tagged_public
		assert ! @public_tiddler.private?
		assert @public_tiddler.public?
		@public_tiddler.tags=""
		assert ! @public_tiddler.public?
	end
	
	def test_should_correctly_indicated_what_is_tagged
		@another.tags="test dog cat"
		assert ! @another.tagged?("racoon")
		assert  @another.tagged?("dog")
		assert  @another.tagged?("test")
		assert  @another.tagged?("cat")
	end		

#misc
	def test_should_correctly_set_hash_title
		@another.title="Wow, Girl!"
		assert_equal @another.hash_title, "%5B%5BWow%2C%20Girl%21%5D%5D"
		@another.title="TestTiddler"
		assert_equal @another.hash_title, "TestTiddler"	
	end

	def test_should_correctly_set_modified_pseudo_field
		time=Time.now
		@another.updated_on=time
		assert_equal @another.modified, time.strftime("%Y%m%d%H%M")
	end	

#validation

	def test_should_save_nil_tags_just_fine
		@another.tags=nil
		assert @another.save, "should save save with nil tags"
	end

	def test_should_unescape_body_properly
		@another.body="&lt;test&gt;&amp;\\n"
		assert_equal @another.unescape, "<test>&\n"
		@another.body="&lt;&gt;test&lt;&gt;&amp;\\n&amp;\\n"
		assert_equal @another.unescape, "<>test<>&\n&\n"

	end

	def test_should_save_successfully
		assert @another.save
		assert @another.updated_on<Time.now
	end

	def test_should_require_title
		tiddler=Tiddler.new
		assert ! tiddler.valid?
		assert_not_nil tiddler.errors.on("title"), "no errors on title"
	end

# versioning

	def test_basic_versions
		t=Tiddler.new
		t.title="Test of versions"
		assert ! t.recently_revised?, "should not have a recent revision"
		assert t.save
		assert t.recently_revised?, "should have a recent revision"
		assert t.version==1, "version should be 1"
		assert t.versions.length==1, "version count should be 1"
		# saving so soon should not create a new version
		assert t.save
		assert t.version==1, "version should still be 1"
		assert t.versions.length==1, "version count should still be 1"
		# updated_on should have changed though		
		assert_not_equal t.updated_on, t.versions.first.updated_on
		assert t.find_version(1) === t.versions.first, "first_version(1) should return the first version"
	end

	def test_newer_version
    t=@tiddler_with_revs
    assert_equal t.versions.length, t.version
    assert_equal 2, t.version
    t.title="some new title"
    assert t.save
    #we should still be the same version, but not the same updated_on
    assert_equal 2, t.version
    assert_not_equal t.updated_on, t.versions.last.updated_on
    assert ! t.recently_revised?
    t.body="now change something that matters"
    assert t.save
    # now we should have a new version
    assert_equal 3, t.version
    assert_equal 3, t.versions(true).length
    assert_equal t.title, t.versions.last.title
    assert_equal t.body, t.versions.last.body
    assert t.recently_revised?
    
    # find_revision
    assert_equal 1, t.find_version(1).version
    assert_equal 2, t.find_version(2).version
    assert_equal 3, t.find_version(3).version
  end
  
  def test_first_version_is_saved
  	 assert_equal 0, @another.version
  	 @another.body="updateing the body"
  	 assert @another.save
  	 assert_equal 1, @another.version
  end

end
