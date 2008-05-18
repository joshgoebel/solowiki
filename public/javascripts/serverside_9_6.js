/* custom config */

//var PAGE="tiddler";
//var PAGES="tiddlers";
var PAGE="page";
var PAGES="pages";

config.readonlytitle = {
	SiteTitle: { helptext: "Enter your sites title here.", rows: 1 },
	SiteSubtitle: {helptext: "Enter your site subtitle here.", rows: 1 },
	MainMenu: {helptext: "Enter pages to display on your wiki's main menu below.  Separate page titles by hitting enter." },
	DefaultPages: {helptext: "Enter pages to display by default when someone opens your wiki.  Separate page titles by hitting enter." },
	DefaultTiddlers: {helptext: "<span style='color:green;'>DefaultTiddlers is named DefaultPages in SoloWiki.</span>  You're probably about to edit the wrong thing. <img src='/images/smilies/msn_smiley.gif' />" },
	StyleSheet: { helptext: "Enter custom <acronym title='Cascading Style Sheet'>CSS</acronym> styles below to customize the look and feel of your wiki." }

}

config.macros.list.missing.prompt="The following pages have links to them but have not yet been created.";
config.macros.list.orphans.prompt="The following pages have been created but have no pages that link to them. (currently this doesn't take tagged pages into account)";

config.views.wikified.toolbarSource={text:"view source",tooltip:"View the source of this page"};

config.shadowTiddlers.SideBarTabs= "<<tabs txtMainTab Recent 'Recently modified tiddlers' TabTimeline All 'All tiddlers' TabMoreAll Tags 'Show all tags' TabTags>>",
//config.shadowTiddlers.SideBarTabs= "<<tabs txtMainTab Recent 'Recently modified tiddlers' TabTimeline All 'All tiddlers' TabMoreAll Tags 'Show all tags' TabTags 'Backpack' 'Show your Backpack pages' TabBackpack>>",

//config.shadowTiddlers.TabBackpack="!!!!Backpack Pages\n*...\n\n \nWould'nt a list of [[Backpack pages]] here that are clickable and load into tiddlers be cool?  Yeah, sorry, I know this was a tease for some of you.\n\nIf you're interested in this kind of feature write [[support@serversidewiki.com|mailto:support@serversidewiki.com]] and let me know.\n\nIdeas on how you might see such a feature working and if it would be worth a small fee would also be appreciated.";

config.views.wikified.tag={tooltip: "Show tiddlers tagged with ", openAllText: "Open all tagged ", openAllTooltip: "Open all of these tiddlers", popupNone: "No other tiddlers tagged with "};
config.views.editor.toolbarDone= {text: "save changes", tooltip: "Save changes to this tiddler"};
config.views.editor.tagPrompt="Separate tags with spaces, [[use double brackets]] if necessary, or add existing";

//config.macros.list.all.prompt="All pages alphabetically...";
config.macros.list.all.prompt=null;

//config.shadowTiddlers.SideBarOptions="<<search>><<newTiddler>><<newTodolist>><<closeAll>><<permaview>><<slider chkSliderOptionsPanel OptionsPanel '_' 'Change TiddlyWiki advanced options' optionsPanel>>";
config.shadowTiddlers.SideBarOptions="<<search>><<newTiddler>><<newTodolist>><<closeAll>><<permaview>><<wikicontrolpanel>>";

config.shadowTiddlers.MainMenu="[[Home]]\nGettingStarted\n----\nDefaultPages\nMainMenu";
config.shadowTiddlers.DefaultPages="GettingStarted";
config.shadowTiddlers.TiddlerFooter="\n<<incomingTags>>";

//config.shadowTiddlers.OptionsPanel="These InterfaceOptions for customising TiddlyWiki are saved in your browser\n\nYour username for signing your edits. Write it as a WikiWord(eg JoeBloggs)\n\n<<option txtUserName>>\n\n<<option chkCaseSensitiveSearch>> CaseSensitiveSearch\n<<option chkAnimate>> EnableAnimations\n\nSee also AdvancedOptions\n\n";
//config.shadowTiddlers.OptionsPanel="!!Signing edits\nYour username for signing your edits. Write it as a WikiWord. (eg JohnDoe)\n<<option txtUserName>>\n\n<<option chkAnimate>> Enable animations\n\n";

config.shadowTiddlers.SiteTitle="SiteTitle";
config.shadowTiddlers.SiteSubtitle="SiteSubtitle";

//config.shadowTiddlers.AdvancedOptions="!!Miscellaneous\n<<option chkOpenInNewWindow>> Open external links in a new window\n!!Search\n<<option chkCaseSensitiveSearch>> Case sensitive search\n<<option chkRegExpSearch>> Allow regular expressions in search\n\n----\nThese settings are all saved via your browser in a cookie."

config.views.wikified.tag.labelNoTags="";
config.views.wikified.tag.labelTags="tagged: ";
config.macros.search.prompt="Search all tiddlers for certain text";

/* if user is not logged in */
if (!user_can_add_content())
{
anonymous_restrictions()
}

function user_can_add_content(title)
{
	if (title!=null)
	{
		tiddler=store.tiddlers[title];
		// if this is a public page, it's editable
		if (tiddler && tiddler.tags.find("public") != null)
			return true;
	}
	return (user_logged_in || public_wiki);
}

function onClickCantDelete()
{
alert("Currently it's not possible to delete items from a public wiki.");
}

//config.shadowTiddlers.OptionsPanel="!!User Interface\n<<option chkAnimate>> Animate the opening of pages\n\n!!Editor\nSign edits as: <<option txtUserName>> (write as a WikiWord, eg JohnDoe)\n\n!!Search\n<<option chkCaseSensitiveSearch>> Case sensitive search\n<<option chkRegExpSearch>> Allow regular expressions in search\n\n----\nThese settings are all saved via your browser in a cookie.";
config.shadowTiddlers.OptionsPanel="!!User Interface\n<<option chkAnimate>> Animate the opening of each page\n\n!!Editing Pages\nSign edits as:\n <<option txtUserName>> (write as a WikiWord, eg JohnDoe)\n\n----\nThese settings are saved locally via a cookie.";

config.shadowTiddlers.AdvancedOptions="!!User Interface\n<<option chkOpenInNewWindow>> Open external links in a new window (@@color(red):be sure you know what you're doing@@)\n\n!!Search\n<<option chkCaseSensitiveSearch>> Case sensitive search\n<<option chkRegExpSearch>> Allow regular expressions in search\n\n----\nThese settings are saved locally via a cookie.";


function anonymous_restrictions()
{
//config.shadowTiddlers.OptionsPanel="!!User Interface\n<<option chkAnimate>> Animate pages opening\n<<option chkOpenInNewWindow>> Open external links in a new window\n\n!!Search\n<<option chkCaseSensitiveSearch>> Case sensitive search\n<<option chkRegExpSearch>> Allow regular expressions in search\n\n----\nThese settings are all saved via your browser in a cookie.";
config.shadowTiddlers.OptionsPanel="!!User Interface\n<<option chkAnimate>> Animate the opening of each page\n!!Search\n<<option chkCaseSensitiveSearch>> Case sensitive search\n----\nThese settings are all saved via your browser in a cookie.";

//config.shadowTiddlers.SideBarOptions="<<search>><<closeAll>><<permaview>><<slider chkSliderOptionsPanel OptionsPanel '_' 'Change TiddlyWiki advanced options' optionsPanel>>";
config.shadowTiddlers.SideBarOptions="<<search>><<closeAll>><<permaview>><<wikicontrolpanel>>";

//config.macros.newTiddler={};

config.views.wikified.defaultText="The tiddler '%0' doesn't yet exist. You must be logged in to create it."
}

/* end if user is not logged in */

//config.shadowTiddlers.WikiControlPanel="Welcome to your WikiControlPanel.  Here you can find interesting stats about your wiki, advanced options, and also view MissingTiddlers and OrphanTiddlers.\n\n<<tabs txtWikiControlPanel  'Wiki Statistics' 'View interesting statistics about this wiki' WikiStats 'Options' 'View your options' OptionsPanel 'Missing' 'View tiddlers that you need to add' TabMoreMissing 'Orphans' 'View tiddlers that no longer have links to them' TabMoreOrphans >>";
config.shadowTiddlers.WikiControlPanel="\n<<tabs txtWikiControlPanel 'Statistics' 'View interesting statistics about this wiki' WikiStats 'Options' 'View your options' OptionsPanel 'Missing' 'View tiddlers that you need to add' TabMoreMissing 'Orphans' 'View tiddlers that no longer have links to them' TabMoreOrphans 'Advanced' 'Advanced Options' AdvancedOptions >>";

config.shadowTiddlers.WikiStats="<<wikistats>>";
config.macros.wikistats = {};
config.macros.wikistats.handler = function(place,macroName,params)
{
var txt="";
txt+="!!!Pages\n";
txt+="* " + store.getTiddlers().length + " total pages\n";
txt+="* " + store.getMissingLinks().length + " missing\n";
txt+="* " + store.getOrphans().length + " orphans\n";
txt+="\n!!!Tags\n";
txt+="* " + store.getTags().length + " unique tags\n";
txt+="* " + store.getTaggedTiddlers("private").length + " pages tagged private\n";

txt+="\n!!!Storage\n";
usage=storageUsed();
if (usage<1024)
	txt+="* " + usage + " bytes of storage used\n";
else if (usage<(1024*1024))
	txt+="* " + Math.round(usage/1024) + " kilobytes used\n";
else
	txt+="* " + Math.round(usage/1024/1024) + " megabytes of storage used\n";

wikify(txt, place, "", false);
}

function makeTiddlersSortable()
{
	Sortable.create('tiddlerDisplay',{ tag:"div", handle:"handle" } );
}

function storageUsed()
{
var total=0;
for(var t in store.tiddlers)
	{
	if (t=="extend") continue;
	t=store.tiddlers[t];
	total+=t.title.length;
	total+=t.tags.length;
	total+=t.text.length;
	}
return total;
}

config.macros.incomingTags = {};
config.macros.incomingTags.handler = function(place,macroName,params)
{
	title=place.id.substr(6);
	tiddler=store.tiddlers[title];
	if (store.getTaggedTiddlers(title).length>0)
	{
		var theTaggedTiddlers = createTiddlyElement(place, "div", "taggedTiddlers" + title, "taggedTiddlers",null);
		if (user_can_add_content())
		{
			var newTagged=createTiddlyButton(theTaggedTiddlers,"new page","Create a new page pre-tagged " + title,onClickToolbarNewHere)
			// setAttribute to work with IE6
			newTagged.setAttribute("onClick","onClickToolbarNewHere(event);");
			newTagged.onclick=onClickToolbarNewHere;
			newTagged.className="newTagged";
		}
		var tags=store.getTaggedTiddlers(title);
		if (tags.length>1)
			var theLegend=createTiddlyElement(theTaggedTiddlers, "div", null, "legend","related by tag");
		wikify(getTaggedTiddlersText(title,params[0]), theTaggedTiddlers, "", false);
	}
}

function updateTaggedTiddlers()
{
for (var t in store.tiddlers)
	{
	if (t=="extend") break;
		var theTaggedTiddlers=$("taggedTiddlers" + store.tiddlers[t].title);
		if (theTaggedTiddlers)
			refreshTiddler(t);
	}
}

function getTaggedTiddlersText(title, sortby)
{
if (!sortby) sortby="modified DESC";
var tags=store.getTaggedTiddlers(title,sortby);
str="";
for (i=0; i<tags.length; i++)
	str+="* [[" + tags[i].title + "]]\n";
return str;
}

TiddlyWiki.prototype.reverseLookup = function(lookupField,lookupValue,lookupMatch,sortField)
{
	var results = [];
	for(var t in this.tiddlers)
		{
		if (t == "extend") continue; // prototype FIX
		var tiddler = this.tiddlers[t];
		var f = !lookupMatch;
		for(var lookup=0; lookup<tiddler[lookupField].length; lookup++)
			{
			if(tiddler[lookupField][lookup] == lookupValue)
				f = lookupMatch;
			}

		if(f)
			results.push(tiddler);
		}

	if(!sortField)
		sortField = "title";
	if (sortField.right(5)==" DESC") // Josh
		{
		sortField=sortField.substr(0,sortField.length-5);
		results.sort(function (a,b) {if(a[sortField] == b[sortField]) return(0); else return (a[sortField] > b[sortField]) ? -1 : +1; });
		}
		else
		{
		results.sort(function (a,b) {if(a[sortField] == b[sortField]) return(0); else return (a[sortField] < b[sortField]) ? -1 : +1; });

		}
	return results;

}

window.onClickToolbarNewHere = function(e)
{
	if (!e) var e = window.event;
	clearMessage();
	obj=resolveTarget(e);
	if(obj.parentNode.id) 
	{
		if (store.overQuota())
			return;
		displayTiddler(obj.parentNode,"New Page",2,null,null,false,false);
		var e = document.getElementById("editorTitleNew Page");
		e.focus();
		e.select();
		tagBox = document.getElementById("editorTagsNew Page");
		tagBox.value = obj.parentNode.id.substring(14);
	}
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	return(false);
}


TiddlyWiki.prototype.removeTiddler = function(title)
{
	var tiddler = this.tiddlers[title];
	if(tiddler)
		{
		/* set text and tags empty so changed is called and
		   tagged lists will be updated */
		tiddler.set(title,null,null,null,null);
		delete this.tiddlers[title];
		this.notify(title,true);
		this.dirty = true;
		}
}


config.macros.wikicontrolpanel= {label: "wiki control panel", prompt: "Show this wiki's control panel"};
config.macros.wikicontrolpanel.handler=function(place,macroName,params) {
createTiddlyButton(place,this.label,this.prompt, function() {
	displayTiddler(this,"WikiControlPanel",1,null,null,true,false)
	// change this to not use animation if it becomes a problem
//	displayTiddlers(src,titles,state,highlightText,highlightCaseSensitive,animate,slowly)
	});

}

config.macros.newTodolist= {label: "new todolist", prompt: "Create a new todo list"};
config.macros.newTodolist.handler = function(place,macroName,params) 
{
createTiddlyButton(place,this.label,this.prompt, function() {
	if (store.overQuota())
		return;
	var txt="This is a new todo list.\n\n!ToDo\n<<addnewtodo>>";
	title="New Todo List";
	displayTiddler(null,title,2,null,null,false,false);
	var e = document.getElementById("editorTitle" + title);
	e.focus();
	e.select();
	theTags=document.getElementById("editorTags" + title);
	theTags.value="todo";
	theEditor=document.getElementById("editorBody" + title);
	theEditor.value=txt;
	
	});
}

config.macros.addnewtodo = {label: "add todo item" };
config.macros.addnewtodo.handler = function(place,macroName,params)
{
	if (user_can_add_content(place.id.substr(6)))
	{
		createTiddlyButton(place,this.label,this.prompt, function() {
			task=window.prompt("New todo item:","");
			if (!task) return;
			title=place.id.substr(6);
			addToDoItem(title,task);
			});
	}
}

function addDoneItem(title,item)
{
tiddler=store.tiddlers[title];
text=tiddler.text;

if ((first=text.indexOf("[x]"))!=-1)
	text=text.insertAt(first, "[x] " + item +"\n");
else
	text=text.replace("<<addnewtodo>>","<<addnewtodo>>\n\n[x] " + item +"\n");

store.tiddlers[title].text=text;
refreshTiddler(title);
saveTiddlerText(title);
}

function addToDoItem(title,item)
{
tiddler=store.tiddlers[title];
text=tiddler.text;

/*
if (text.indexOf("!ToDo")!=-1)
	text=text.replace("!ToDo\n","!ToDo\n[ ] " + item +"\n");
else if (text.indexOf("!Complete")!=-1)
	text=text.replace("!Complete\n","!ToDo\n[ ] " + item + "\n----\n");
else
	text=text.replace("<<addnewtodo>>","[ ] " + item + "\n----\n<<addnewtodo>>");
*/
if ((last=text.lastIndexOf("[ ]"))!=-1)
// find the least unchecked item and add beneath
	{
	end=text.indexOf("\n",last);
	text=text.insertAt(end,"\n[ ] " + item );
	}
else
	text=text.replace("<<addnewtodo>>","[ ] " + item + "\n\n<<addnewtodo>>");

/*
else if (text.indexOf("!ToDo")!=-1)
	text=text.replace("!ToDo\n","!ToDo\n[ ] " + item +"\n");
else if (text.indexOf("!Complete")!=-1)
	text=text.replace("!Complete\n","!ToDo\n[ ] " + item + "\n");
*/
store.tiddlers[title].text=text;
refreshTiddler(title);
 saveTiddlerText(title);
}

String.prototype.insertAt= function (pos, text)
{
return this.substring(0,pos) + text + this.substring(pos,this.length);
}

Zoomer.prototype.tick = function()
{
	var f = Animator.slowInSlowOut(this.progress);
	this.element.style.left = this.startLeft + (this.targetLeft-this.startLeft) * f + "px";
	this.element.style.top = this.startTop + (this.targetTop-this.startTop) * f + "px";
	this.element.style.width = this.startWidth + (this.targetWidth-this.startWidth) * f + "px";
	this.element.style.height = this.startHeight + (this.targetHeight-this.startHeight) * f + "px";
	this.element.style.display = "block";
//	this.targetElement.style.opacity = this.progress;
//	this.targetElement.style.filter = "alpha(opacity:" + this.progress * 100 + ")";
//	window.scrollTo(0,this.startScroll + (this.targetScroll-this.startScroll) * f);
}

// shorten names in tabs

//window.createTiddlyLink_orig = window.createTiddlyLink;
window.xcreateTiddlyLink = function(place,title,includeText,maxlen) {

var btn = createTiddlyLink_orig(place,title,includeText,maxlen);

// check if we are in a sidebar
//if (btn.parentNode.tagName=="LI")
if (hasParentClass(btn, "tabContents")) 
{
	var trimAt = 25 - title.count(/[A-Zmw]/g); 

	if (title.length > trimAt) {
	
//		alert(trimAt);
	
		var tiddler = store.tiddlers[title];
		subTitle = title + " - " + tiddler.getSubtitle();
	
		shortTitle = title.substring(0,trimAt).trim(); 
		removeChildren(btn); // btn is an a element and only has one child, the text node
		btn.appendChild(document.createTextNode(shortTitle+"...")); // cool.
		btn.title=subTitle;
	}
}
return btn;
}

// trim leading and trailing whitespaces of string | Jody
function trim(string) {
  if (string != null) {
		  string = string.replace( /^\s+/g, "" );// strip leading
		  return string.replace( /\s+$/g, "" );// strip trailing
  }
  else {
  	return null;
  }
}

function hasParentClass(o, className)
{
while (o.parentNode)
	{
	if (o.parentNode.className==className)
		return true;
	o=o.parentNode;
	}

return false;
}

// for shorter names
function createTiddlyLinkShort(place,title,includeText)
{
	var text = includeText ? title : null;
	var subTitle;
	var tiddler = store.tiddlers[title];
	if(tiddler)
		if (text!=shortenName(text))
			subTitle = title + " - " + tiddler.getSubtitle();
		else
			subTitle = tiddler.getSubtitle();
	else
		subTitle = title + config.messages.undefinedTiddlerToolTip;
	var theClass = tiddler ? "tiddlyLinkExisting tiddlyLink" : "tiddlyLinkNonExisting tiddlyLink";
	var btn = createTiddlyButton(place,shortenName(text),subTitle,onClickTiddlerLink);
	btn.className = theClass;
	btn.setAttribute("tiddlyLink",title);
	return(btn);
}

// Event handler for clicking on the toolbar references button
function onClickToolbarReferences(e)
{
	if (!e) var e = window.event;
	var theTarget = resolveTarget(e);
	var popup = createTiddlerPopup(this);
	if(popup && this.parentNode.id)
		{
		ul=createTiddlyElement(popup,"ul",null,null,null);
		var title = this.parentNode.id.substr(7);
		var references = store.getReferringTiddlers(title);
		var c = false;
		for(var r=0; r<references.length; r++)
			if(references[r].title != title)
				{
				li=createTiddlyElement(ul,"li",null,null,null);
				createTiddlyLink(li,references[r].title,true);
				c = true;
				}
		if(!c)
			popup.appendChild(document.createTextNode(config.views.wikified.toolbarReferences.popupNone));
		}
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	return(false);
}

function createTiddlerPopup(srcElement)
{
	var popup = document.getElementById("popup");
	if(popup && popup.nextSibling == srcElement)
		{
		hideTiddlerPopup();
		return null;
		}
	if(popup)
		popup.parentNode.removeChild(popup);
	popup = createTiddlyElement(null,"div","popup",null,null);
	popup.style.left = srcElement.offsetLeft + "px";
	popup.style.top = srcElement.offsetTop + srcElement.offsetHeight + "px";
	popup.style.display = "block";
	srcElement.onmouseout = onMouseOutTiddlerPopup;
	srcElement.appendChild(popup);
	return popup;
}

// Event handler for clicking on toolbar close others
config.views.wikified.toolbarCloseOthers= {text: "close others", tooltip: "Close all tiddlers except this one"};

function onClickToolbarCloseOthers(e)
{
    if (!e) var e = window.event;
    if(this.parentNode.id)
        closeAllTiddlersButThisOne(this.parentNode.id.substr(7))
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return(false);
}

function closeAllTiddlersButThisOne(thisTitle)
{
    var place = document.getElementById("tiddlerDisplay");
    var tiddler = place.firstChild;
    var nextTiddler;
    while(tiddler)
        {
        nextTiddler = tiddler.nextSibling;
        if(tiddler.id)
            if(tiddler.id.substr(0,7) == "tiddler")
                {
                var title = tiddler.id.substr(7);
                if(!document.getElementById("editorWrapper" + title)&&!(title == thisTitle))
                    place.removeChild(tiddler);
                }
		tiddler = nextTiddler;
        }
    window.scrollTo(0,0);
}

var start_time;
var stop_time;

var timers=new Array();
var elapsed_time=new Array();

function start_timer(text)
{
d=new Date();
if (text!=undefined)
{
	timers[text]=d.getTime();
	elapsed_time[text]=0;
}
else
	start_time=d.getTime();
}

function add_timer(text)
{
d=new Date();
now=d.getTime();
elapsed=now-timers[text];
//if (elapsed_time[text]!=undefined)
	elapsed_time[text]+=elapsed;
//else
//	elapsed_time[text]=0;
}

function total_timer(str, extra)
{
elapsed=elapsed_time[str];

t=elapsed + " ms - "
t+=str;
if (extra!=null)
	t+="  - " + extra;
t+="<br />";
//loggy=$("logger");
//loggy.innerHTML+=t;

}

function stop_timer(str, extra)
{
d=new Date();
if (timers[str]!=undefined)
{
now=d.getTime();
elapsed=now-timers[str];
}
else
{
stop_time=d.getTime();
elapsed=stop_time-start_time;
}

t=elapsed + " ms - "
t+=str;
if (extra!=null)
	t+="  - " + extra;
t+="<br />";
//loggy=$("logger");
//loggy.innerHTML+=t;
}

/*
window.old_wikify=wikify;
window.wikify = function (text,parent,highlightText,highlightCaseSensitive)
{
start_timer();
old_wikify(text,parent,highlightText,highlightCaseSensitive)
stop_timer("wikify", "\"" + text.htmlEncode().shortdots(50) + "\"");
}
*/

String.prototype.count = function (regex)
{
n=this.replace(regex, "");
return this.length-n.length;
}

String.prototype.shortdots = function (len)
{
if (this.length>(len-8))
	{
	caps=this.count(/[ABCDEFGHJKLMNOPQRSTUVWXYZmw]/g);
	cap=this.count(/[ABCDEFGHJKLMNOPQRSTUVXYZ]/g);
	w=this.count(/[W]/g);
	r=Math.floor(caps/1.5+w);
	if (caps>2 && caps<7)
		return this.substring(0,len-3-caps) + "...";
	else if (caps>=7)
		{
		return this.substring(0,len-(14+w*0.17)) + "...";
		}
	else
		return this.substring(0,len-3) + "...";
	}
else
	return this;
}

String.prototype.shorten = function (len)
{
return this.substring(0,len);
}

// working on speeding things up
// performance
config.macros.list.handler = function(place,macroName,params)
{
	var type = params[0] ? params[0] : "all";
//	var theList = document.createElement("ul");
	var theList = document.createElement("div");
	var html="";

	place.appendChild(theList);
	if(this[type].prompt)
	{
//		createTiddlyElement(theList,"li",null,"listTitle",this[type].prompt);
//		html+="<h4 class='listTitle'>" + this[type].prompt + "</h4>";
		html+="<p class='listTitle'>" + this[type].prompt + "</p>";
	}
	html+="<ul>";
	var results;
	if(this[type].handler)
		results = this[type].handler(params);
/*
	start_timer();	
	for (t = 0; t < results.length; t++)
		{
		theListItem = document.createElement("li")
		theList.appendChild(theListItem);

		if(typeof results[t] == "string")
			createTiddlyLink(theListItem,results[t],true);
		else
			createTiddlyLink(theListItem,results[t].title,true);
		}
	stop_timer("old list " + type);
*/

	start_timer();
	for (t = 0; t < results.length; t++)
		{
		if(typeof results[t] == "string")
			html+="<li>" + createTiddlyLink("html",results[t],true) + "</li>";
		else
			html+="<li>" + createTiddlyLink("html",results[t].title,true) + "</li>";
		}
	html+="</ul>";
	theList.innerHTML=html;
	stop_timer("new list " + type);

}

function createTiddlyLink(place,title,includeText,maxlen)
{
	var text = includeText ? title : null;
	if (maxlen==undefined)
		maxlen=2000;
//	stop_timer(maxlen);
	if (includeText!=true && includeText!=false)
		text=includeText;
	var subTitle;
	var tiddler = store.tiddlers[title];
	if(tiddler)
		subTitle = tiddler.getSubtitle();
	else
		subTitle = config.messages.undefinedTiddlerToolTip.format([title]);
	var theClass = tiddler ? "tiddlyLinkExisting tiddlyLink" : "tiddlyLinkNonExisting tiddlyLink";
	if (place=="html")
	{
		// to fix tiddlers with quotes in the title (how likely is this)
		title=title.replace(/"/g,"&quot;");
		out="<a href='JavaScript:;' onclick='onClickTiddlerLink(event);' class='" + theClass+ "' tiddlyLink=\"" + title + "\" title=\"" + subTitle + "\">" + text.shortdots(maxlen) + "</a>";
		return out;
	}
	else
	{
		var btn = createTiddlyButton(place,text,subTitle,onClickTiddlerLink,theClass);
		// moved first to fix IE6
		btn.setAttribute("onClick","onClickTiddlerLink(event);");
		btn.onclick=onClickTiddlerLink;
		btn.setAttribute("tiddlyLink",title);
		return(btn);
	}
}

config.macros.timeline.handler = function(place,macroName,params)
{
	var tiddlers = store.reverseLookup("tags","excludeLists",false,"modified");
	var lastDay = "";
	/*
	start_timer();
	for (t=tiddlers.length-1; t>=0; t--)
		{
		var tiddler = tiddlers[t];
		var theDay = tiddler.modified.convertToYYYYMMDDHHMM().substr(0,8);
		if(theDay != lastDay)
			{
			var theDateList = document.createElement("ul");
			place.appendChild(theDateList);
			createTiddlyElement(theDateList,"li",null,"listTitle",tiddler.modified.formatString(this.dateFormat));
			lastDay = theDay;
			}
		var theDateListItem = createTiddlyElement(theDateList,"li",null,"listLink",null);
		theDateListItem.appendChild(createTiddlyLink(place,tiddler.title,true));
		}
	stop_timer("old timeline handler");
	*/
	
	/* new performance routine */
	start_timer();
	now=new Date();
	yesterday=new Date(now-(24*60*60*1000));
	var html = "";
	if (place.className=="tabContents")
		maxlen=37;
	else
		maxlen=2000;
	for (t=tiddlers.length-1; t>=0; t--)
		{
		var tiddler = tiddlers[t];
		var theDay = tiddler.modified.convertToYYYYMMDDHHMM().substr(0,8);
		if(theDay != lastDay)
			{
			if (html!="")
				html+="</ul>";
			if (now.formatString("YYYYMMDD") == tiddler.modified.formatString("YYYYMMDD"))
				html+="<h4 class='named'>Today</h4><ul>";
			else if (yesterday.formatString("YYYYMMDD") == tiddler.modified.formatString("YYYYMMDD"))
				html+="<h4 class='named'>Yesterday</h4><ul>";
			else if ((now.days() - tiddler.modified.days()) < 5)
				html+="<h4>" + tiddler.modified.formatString("DDD") + "</h4><ul>";
			else
				html+="<h4>" + tiddler.modified.formatString(this.dateFormat) + "</h4><ul>";
			lastDay = theDay;
			}
		html+="<li>" + createTiddlyLink("html",tiddler.title,true,maxlen) + "</li>";
		}
	place.innerHTML+=html;
	stop_timer("new timeline handler");
}

Date.prototype.days = function()
{
return Math.floor(this/1000/60/60/24);
}

/*******************
sweet AJAX
*******************/

// save

function AJAX_saveTiddlerError(request)
{
	var title=null;
	//title=request.responseText;
	// because if disconnect with server we won't have trusted responseText
	// IE doesn't support attributes on XHMLHTTPrequest
	if (navigator.userAgent.indexOf("MSIE")==-1)
	{ 
		title=request.TiddlerTitle;
		displayTiddler(null,title,2,null,null,false);
	}
	//alert("Error communicating with server.\n\n" + title + " not saved!  Re-opening in edit mode.");
	alert("There was an error communicating with the server.  Your tiddler has not been saved.  Please try saving it again shortly. Hopefully this is only a temporary problem.");
	spinnerSaveTiddler(title,false);
}

function AJAX_saveTiddlerSuccess(request)
{
title=request.responseText;
spinnerSaveTiddler(title,false);
//stdisplayTiddler(null,title,1,null,null,null,false,false);
}

function spinnerSaveTiddler(title, show)
{
	spinnerTiddler(title,show,"Saving...");
}

function spinnerTiddler(title, show, text)
{
	var theStatus = document.getElementById("status" + title);
	var theSpinner = document.getElementById("spinner" + title);

	if (show)
	{	
		var theTiddler = document.getElementById("tiddler" + title);
		if (!theSpinner)
			var theSpinner = createTiddlyElement(theTiddler,"img","spinner" + title,"spinner",null);
		if (!theStatus)
			var theStatus = createTiddlyElement(theTiddler,"div","status" + title,"status",text);
		else
			theStatus.innerHTML=text;
		theSpinner.src="/images/indicator.gif";
	}
	else
	{	
		theSpinner.parentNode.removeChild(theSpinner);
		theStatus.parentNode.removeChild(theStatus);
	}
}

function saveTiddlerText(title)
{
	tiddler=store.tiddlers[title];
	var params="tiddler[id]=" + encodeURIComponent(title);
	params+="&tiddler[body]=" + encodeURIComponent(tiddler.escapeLineBreaks().htmlEncode());
	params+="&tiddler[modifier]=" + encodeURIComponent(config.options.txtUserName);
	req=new Ajax.Request('/wiki/save', {asynchronous:true, parameters:params, onFailure:function(request){AJAX_saveTiddlerError(request)}, onSuccess:function(request){AJAX_saveTiddlerSuccess(request)}});
	// IE doesn't support attributes on XHMLHTTPrequest
	if (navigator.userAgent.indexOf("MSIE")==-1) 
		req.transport.TiddlerTitle=title
	spinnerSaveTiddler(title,true); // Josh
}

function saveTiddler(title)
{
//	spinnerSaveTiddler(title,true); // Josh
/*
	window.setTimeout("real_saveTiddler('" +title+ "');",100);
}

function real_saveTiddler(title)
{
*/
	var titleBox = document.getElementById("editorTitle" + title);
	var newTitle = titleBox.value;
	if (newTitle=="" || newTitle==null)
	{
		alert("You cannot save a page with a blank title, sorry.");
		return false;
	}
	if(store.tiddlers[newTitle])
		{
		if(newTitle != title && !confirm(config.messages.overwriteWarning.format([newTitle.toString()])))
			{
			titleBox.focus();
			titleBox.select();
			return;
			}
		}
	var body = document.getElementById("editorBody" + title);
	var newBody = body.value.replace(/\r\n/g,"\n"); /* fix for IE so todo lists don't break */
	var newTags = document.getElementById("editorTags" + title).value;
	body.focus();
	body.blur();

	store.saveTiddler(title,newTitle,newBody,config.options.txtUserName,new Date(),newTags);
	displayTiddler(null,newTitle,1,null,null,null,false,false);

	spinnerSaveTiddler(newTitle,true); // Josh

	tiddler=store.tiddlers[newTitle];
	var params="tiddler[id]=" + encodeURIComponent(title);
	params+="&tiddler[title]=" + encodeURIComponent(tiddler.title);
	params+="&tiddler[body]=" + encodeURIComponent(tiddler.escapeLineBreaks().htmlEncode());
	params+="&tiddler[tags]=" + encodeURIComponent(newTags);
	params+="&tiddler[modifier]=" + encodeURIComponent(config.options.txtUserName);
	req=new Ajax.Request('/wiki/save', {asynchronous:true, parameters:params, onFailure:function(request){AJAX_saveTiddlerError(request)}, onSuccess:function(request){AJAX_saveTiddlerSuccess(request)}});
	// IE doesn't support attributes on XHMLHTTPrequest
	if (navigator.userAgent.indexOf("MSIE")==-1) 
		req.transport.TiddlerTitle=title

	// Close the old tiddler if this is a rename
	if(title != newTitle)
		{
		var oldTiddler = document.getElementById("tiddler" + title);
		var newTiddler = document.getElementById("tiddler" + newTitle);
		oldTiddler.parentNode.replaceChild(newTiddler,oldTiddler);
		}

	if(config.options.chkAutoSave)
		saveChanges();
}

/***********
*  DELETE  *
***********/

// Event handler for clicking on toolbar close
function onClickToolbarDelete(e)
{
	sure=confirm("Are you sure you wish to delete this " + PAGE + "?")
	if (!sure)
		return;
	clearMessage();
	if(this.parentNode.id)
		deleteTiddler(this.parentNode.id.substr(7));
}

function deleteTiddler(title)
{
	 // don't call AJAX jazz if this never existing on the server
	if (!store.tiddlers[title])
	  	return closeTiddler(title,false);

	req= 	new Ajax.Request('/wiki/destroy', {asynchronous:true, parameters:"id=" +title, onSuccess:function(request){AJAX_DeleteTiddlerSuccess(request)}, onFailure:function(request){AJAX_DeleteTiddlerError(request)}});
	// IE doesn't support attributes on XHMLHTTPrequest
	if (navigator.userAgent.indexOf("MSIE")==-1) 
		req.transport.TiddlerTitle=title
	spinnerDeleteTiddler(title, true);
}

function AJAX_DeleteTiddlerError(request)
{
//	alert("rails_DeleteTiddlerError: " +  request);
//	title=request.responseText;
// because in the case of a disconnect we won't have the responseText from server
	title=request.TiddlerTitle; 
	alert("Error communicating with server!  " + title+ " not deleted.");
	displayTiddler(null,title,0,null,null,false);
}

function AJAX_DeleteTiddlerSuccess(request)
{
//	alert("rails_DeleteTiddlerSuccess");
  	title=request.responseText;
  	closeTiddler(title,false);
  	store.removeTiddler(title);
}

function spinnerDeleteTiddler(title)
{
	var theTiddler = document.getElementById("tiddler" + title);
	var theToolbar = document.getElementById("toolbar" + title);
	var theBody = document.getElementById("body" + title);
	var theIcon = document.getElementById("icon" + title);
//	var theTags = document.getElementById("tags" + title);
	var theTitle = document.getElementById("title" + title);
	var theTaggedTiddlers = document.getElementById("taggedTiddlers" + title);
	theToolbar.parentNode.removeChild(theToolbar);
	theBody.parentNode.removeChild(theBody);
	theIcon.parentNode.removeChild(theIcon);
//	theTags.parentNode.removeChild(theTags);
//	if (theTaggedTiddlers)
//		theTaggedTiddlers.parentNode.removeChild(theTaggedTiddlers);
	theTiddler.style.paddingTop="3px";

	theTitle.style.fontSize="1.2em";
	theTitle.style.paddingLeft="6.5em";
	theTiddler.style.opacity=0.70;
	theTiddler.style.filter = "alpha(opacity:70)"; // Josh - for IE
	
	var theSpinner = createTiddlyElement(theTiddler,"img","spinner" + title,"spinner",null);
	var theStatus = createTiddlyElement(theTiddler,"div","status" + title,"status","Deleting...");
	theSpinner.src="/images/indicator.gif";
}

/* return of jody style taggings */

function createTagButton(place,tag,excludeTiddler)
{
return createTiddlyLink(place,tag,tag);
}

config.macros.allTags.handler = function(place,macroName,params)
{
var tags = store.getTags();
if(tags.length == 0)
createTiddlyElement(place,"div",null,null,this.noTags);
for (t=0; t<tags.length; t++)
{
var theTag = createTiddlyLink(place,tags[t][0],tags[t][0] + " (" + tags[t][1] + ")"); // MonkeyPirateTiddlyWiki
//var theTag = createTiddlyButton(place,tags[t][0] + " (" + tags[t][1] + ")",this.tooltip + tags[t][0],onClickTag);
theTag.setAttribute("tag",tags[t][0]);
place.appendChild(document.createElement("br"));
}
}

function collapseExpandTiddlers()
{
	var place = document.getElementById("tiddlerDisplay");
	var tiddler = place.firstChild;
	var nextTiddler;
	while(tiddler)
		{
		nextTiddler = tiddler.nextSibling;
		if(tiddler.id)
			if(tiddler.id.substr(0,7) == "tiddler")
				{
				var title = tiddler.id.substr(7);
				theTiddler=document.getElementById("tiddler" + title);
				theToolbar=document.getElementById("toolbar" + title);
				theFooter=document.getElementById("footer" + title);
				theBody=document.getElementById("body" + title);
				if (theBody.style.display=="none")
				{
					theBody.style.display="block";
					theToolbar.style.display="block";
					theFooter.style.display="block";
					theTiddler.style.paddingTop="0";
					theTiddler.style.paddingBottom="0";
				}
				else
				{
					theBody.style.display="none";
					theToolbar.style.display="none";
					theFooter.style.display="none";
					theTiddler.style.paddingTop="7px";
					theTiddler.style.paddingBottom="7px";
				}
				createTiddlerHandle(null,title);
				}
		tiddler = nextTiddler;
		}
}


function onMoveDoubleClick(e)
{
	if (!e) var e = window.event;
	var theTarget = resolveTarget(e);
	
	collapseExpandTiddlers();
	
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	return(false);
}

function createTiddlerHandle(place,title)
{
	theHandle=$("handle" + title);
	if (!theHandle)
	{
	var theHandle=createTiddlyElement(place,"img","handle" + title,"handle", null);
	theHandle.src="/images/move.gif";
//	theHandle.src="/images/icons/mini/briefcase.gif";
	theHandle.title="Drag and drop using this handle.  Double click to collapse/expand pages.";
	theHandle.ondblclick=onMoveDoubleClick;
	}
	else
	{
	// fix issue where firefox will not move the handle automatically
	theHandle.style.position="relative";
	theHandle.style.position="absolute";
	}
}

// Close Unsaved On Cancel Plugin - Simon

window.onClickToolbarUndo = function(e) {
	var tiddlerName = null;
	if(this.parentNode.id) 
	{
		tiddlerName = this.parentNode.id.substr(7);
		displayTiddler(null,tiddlerName,1,null,null,false,false);
	}

	// I want to close it if it hasn't been saved yet and it's not a "tag" with out pages pointing to it
	if(typeof(store.tiddlers[tiddlerName]) == 'undefined' && 
		(store.getTaggedTiddlers(tiddlerName).length==0)) 
	{
		closeTiddler(tiddlerName,false);
	}
}

/* speed up tabs */

config.macros.tabs.switchTab = function(tabset,tab)
{
	var cookie = tabset.getAttribute("cookie");
	var theTab = null
	var nodes = tabset.childNodes;
	for(var t=0; t<nodes.length; t++)
		if(nodes[t].getAttribute && nodes[t].getAttribute("tab") == tab)
			{
			theTab = nodes[t];
			theTab.className = "tab tabSelected " + nodes[t].getAttribute("tab");
			}
		else
			nodes[t].className = "tab tabUnselected " + nodes[t].getAttribute("tab");

	if (openTab=$("tabbed" + config.options[cookie]))
		openTab.style.display="none";
		
	if(theTab)
		{
//		if(tabset.nextSibling && tabset.nextSibling.className == "tabContents")
//			tabset.parentNode.removeChild(tabset.nextSibling);
//			tabset.nextSibling.style.display="none";
		existingTag=$("tabbed" + tab)
		if (existingTag)
			existingTag.style.display="block";
		else
		{
		var tabContent = createTiddlyElement(null,"div","tabbed" + tab,"tabContents",null);
//		var tabContent = createTiddlyElement(null,"div",null,"tabContents",null);
		tabset.parentNode.insertBefore(tabContent,tabset.nextSibling);
		wikify(store.getTiddlerText(theTab.getAttribute("content")),tabContent,null,null);
		}

		if(cookie)
			{
			config.options[cookie] = tab;
			saveOptionCookie(cookie);
			}
		}
}

function renameTiddler2Page()
{
	for (macro in config.macros)
	{
	if (config.macros[macro].label)
		{
		config.macros[macro].label=config.macros[macro].label.replace("tiddler",PAGE);
		}
	if (config.macros[macro].prompt)
		config.macros[macro].prompt=config.macros[macro].prompt.replace("tiddler",PAGE);
	}
	for (wikified in config.views.wikified)
	{
	if (config.views.wikified[wikified].tooltip)
		config.views.wikified[wikified].tooltip=config.views.wikified[wikified].tooltip.replace("tiddler",PAGE);
	}
	for (s in config.views.editor)
	{
	if (config.views.editor[s].tooltip)
		config.views.editor[s].tooltip=config.views.editor[s].tooltip.replace("tiddler",PAGE);
	}
	for (s in config.shadowTiddlers)
	{
		if (s=="extend") continue;
		str=config.shadowTiddlers[s];
		config.shadowTiddlers[s]=str.replace(/tiddler/g,PAGE);
	}
}

config.macros.newTiddler.onClick = function()
{
	if (store.overQuota())
		return;
	var title = "New Page";
	displayTiddler(null,title,2,null,null,false,false);
	var e = document.getElementById("editorTitle" + title);
	e.focus();
	e.select();
}

// Event handler for double click on a tiddler
function onDblClickTiddler(e)
{
	clearMessage();
	if(document.selection)
		document.selection.empty();
	var tiddler;
	if(this.id.substr(0,7) == "tiddler")
		title = this.id.substr(7);
	if(title)
		{
		tiddler=store.tiddlers[title];
		if (user_can_add_content() || 
			(tiddler && tiddler.tags.find("public") !=null)
			)
			{
				if (!tiddler && store.overQuota())
					return;
				displayTiddler(null,title,2,null,null,false,false);
			}
		}
}

function onClickToolbarEdit(e)
{
	clearMessage();
	title=this.parentNode.id.substr(7);
	if (!store.tiddlers[title] && store.overQuota())
		return;
	if(this.parentNode.id)
		displayTiddler(null,this.parentNode.id.substr(7),2,null,null,false,false);
}

TiddlyWiki.prototype.overQuota=function()
{
return false;
upgrade_or_delete="\n\nPlease visit your Account page to upgrade your account or delete existing pages to make room for new pages.";
tiddlers=store.getTiddlers().length
if (tiddlers>=max_tiddlers)
	{
	if (tiddlers==max_tiddlers)
		alert("You have " + tiddlers + " pages, which is the maximum allowed for your " + account_type + " account. " + upgrade_or_delete);
	else
		alert("You have " + tiddlers + " pages, which is more than the maximum of " + max_tiddlers + " allowed for your " + account_type + " account type. " + upgrade_or_delete);
	return true;
	}
else
	return false;
}

function createTiddlyIconButton(place,icon,tooltip,action)
{
	img=createTiddlyElement(place,"img",null,null,null);
	img.src=icon;
	img.onclick=action;
	img.className="clickable";
	img.title=tooltip;
	return img;
}

/*
function clearMessage()
{
	var msgArea = document.getElementById("messageArea");
	removeChildren(msgArea);
	msgArea.style.display = "none";
	AccountSettings(null,false);
}
*/

function AccountSettings(e,state)
{
settings=$("account_settings_dialog");
if (state)
	{
	if (!e) var e = window.event;
	clearMessage();
	src=resolveTarget(e);

	settings.style.display="block";
	settings.style.opacity = 0;
	settings.style.filter = "alpha(opacity:0)"; // Josh - for IE
	anim.startAnimating(new Zoomer("Settings",src,settings,false));
	}
else
	settings.style.display="none";

}

function updateAccountStyle()
{
f=$("account_settings_form");
account_style="account[style]";
for (var i=0; i < f[account_style].length; i++)
   if (f[account_style][i].checked)
      style = f[account_style][i].value;
//alert(style);
var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("Stylesheet") != -1 && a.getAttribute("title")) {
		a.href="/stylesheets/" + style + ".css";
    }
  }

}

function serversidewikiInit()
{
if (user_logged_in)
	$("logged_out_actions").style.display="none";
else
	$("logged_in_actions").style.display="none";
}

function logout()
{
	user_logged_in=false;
	anonymous_restrictions();
	$("logged_out_actions").style.display="block";
	$("logged_in_actions").style.display="none";
	refreshSidebar("SideBarOptions");
	displayMessage("You have been logged out.");
	// redraw all tiddlers to get non-logged in toolbars
	for(t in store.tiddlers)
		if (t != "extend") // prototype FIX
		{
		tiddler=$("tiddler" + t);
		if (tiddler)
			displayTiddler(null,t,1,null,null,null,false,false);
		}

// delete private tiddlers
	var priv = store.getTaggedTiddlers("private");
	for(var t=0; t<priv.length; t++)
		delete store.tiddlers[priv[t].title];
	// this would happen automatically but calling removeTiddler and having this happen
	// for each tiddler we remove is just too expensive
	refreshStory();
	refreshTabs();

// close any non-existant tiddlers that might be open
	var place = document.getElementById("tiddlerDisplay");
	var tiddler = place.firstChild;
	var nextTiddler;
   while(tiddler)
	{
		nextTiddler = tiddler.nextSibling;
        if(tiddler.id)
            if(tiddler.id.substr(0,7) == "tiddler")
                {
                var title = tiddler.id.substr(7);
                if (!store.tiddlers[title])
                    place.removeChild(tiddler);
                }
		tiddler = nextTiddler;
   }
	window.scrollTo(0,0);
}

//config.macros.allTags.prompt="All tags in alphabetical order."
config.macros.allTags.prompt=null;

config.macros.allTags.handler = function(place,macroName,params)
{
	out="";
	var tags = store.getTags();
	if (config.macros.allTags.prompt!=null)
		out="!!!! " + config.macros.allTags.prompt + "\n";
	for (t=0; t<tags.length; t++)
		out+= "* [[" + tags[t][0] + "]] (" + tags[t][1] + ")\n";		
	wikify(out, place, null, null);
}

function preventClose(e)
{
    var place = document.getElementById("tiddlerDisplay");
    var tiddler = place.firstChild;
    var dirty=false;
    var nextTiddler;
    while(tiddler)
        {
        nextTiddler = tiddler.nextSibling;
        if(tiddler.id)
            if(tiddler.id.substr(0,7) == "tiddler")
                {
                var title = tiddler.id.substr(7);
                if(document.getElementById("editorWrapper" + title))
                    dirty=true;
                }
		tiddler = nextTiddler;
        }
if (dirty==true)
	return "\n\nYOU HAVE UNSAVED WORK. You must click cancel if you wish to go back and save your work.\n\nAre you sure you want to close the page and lose your work?\n\n";
}

// get all the names of the tags for our autocomplete
TiddlyWiki.prototype.getTagNames = function()
{
	var results = [];
	for(var t in this.tiddlers)
		{
		if (t=="extend") continue; // prototype FIX
		var tiddler = this.tiddlers[t];
		for(g=0; g<tiddler.tags.length; g++)
			{
				var tag = tiddler.tags[g];
				if (results.find(tag)==null)
					results.push(tag);
			}
		}
	results.sort(function (a,b) {if(a[0] == b[0]) return(0); else return (a[0] < b[0]) ? -1 : +1; });
	return results;
}
