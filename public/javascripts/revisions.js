config.views.wikified.toolbarRevisions={text:"revisions", tooltip:"Show past revisions of this page"};

function onClickToolbarRevisions(e)
{
	clearMessage();
	if(this.parentNode.id)
		{
		//displayTiddler(null,this.parentNode.id.substr(7),3,null,null,false,false);
		createTiddlerRevisions(this.parentNode.id.substr(7));
		}
}

function createTiddlerRevisions(title)
{
	var theBody = document.getElementById("body" + title);
	var theViewer = document.getElementById("viewer" + title);
	var theEditor = document.getElementById("editorWrapper" + title);
	if(theBody)
	{
	txt="";
	var theRevisions = createTiddlyElement(theBody,"div","revisions" + title,"viewer",null);
	var callback = function(request)
	{
	r=request.responseText;
	var revisions = r.split('\n');
	txt+="<p><strong>" + (revisions.length-1) + " revisions are currently available.</strong></p>";
	txt+="<ul>";
	var now=new Date();
	for (var i=0; i<revisions.length-1; i++)
	{
		var parts = revisions[i].split(' ');
		var rev=parts[1];
		var modified = Date.convertFromYYYYMMDDHHMM(parts[0]);
		txt+="<li";
		var tiddler = store.tiddlers[title];
		if(tiddler.revision == rev || (!tiddler.revision && i==0) )
			txt+=" style='background-color:#eee;'";
		txt+="><a href='JavaScript:;' onclick='onClickRevision(event);' tiddlerTitle='" + title + "' revision='" + rev + "' class='tiddlyLinkExisting tiddlyLink'>";
		if (rev!="current")
			txt+="Revision #" + rev + "</a> - ";
		else
			txt+="Latest Copy</a> - ";
//		txt+=modified.toLocaleString();

		minutes=Math.round((now-modified)/1000/60);
		txt+="" +distance_of_time_in_words(minutes) + " ago - ";
		txt+=modified.formatString("MMM DD, YYYY");
		txt+="</li>";
		txt+="\n";
	}
	txt+="</ul>";
		txt+="<p style='padding:7px; background-color:#f7f7f7; border:1px solid #ccc;'>Revisions are automatically stored each time the body text of your page changes (minimum 15 minute intervals). Updating the title or tags without changing the body will not create a new revision. <strong>10 revisions will be kept on file.</strong></p>";
	theRevisions.innerHTML=txt;
	createTiddlerHandle(null,title);
	if(theViewer)
		theViewer.parentNode.removeChild(theViewer);
	createTiddlerToolbar(title,false,true);
	createTiddlerFooter(title,true);
	spinnerTiddler(title, false) 
	}
	spinnerTiddler(title, true, "Retrieving revisions...")
	req= 	new Ajax.Request('/wiki/revisions', {asynchronous:true, parameters:"id=" +title, onSuccess:function(request){callback(request)} });
//	req= 	new Ajax.Request('/wiki/revisions', {asynchronous:false, parameters:"id=" +title, });

	}

}

function onClickRevision(e)
{
	clearMessage();
	if (!e) var e = window.event;
	var theTarget = resolveTarget(e);
	title=theTarget.getAttribute("tiddlerTitle");
	rev=theTarget.getAttribute("revision");
	if (title)
		{
		var params="id=" + encodeURIComponent(title);
		params+="&revision=" + rev;
		req= new Ajax.Request('/wiki/revision', {asynchronous:false, parameters:params });
		r=req.transport.responseText;
		var tiddler = new Tiddler();
		var parts = r.split('\n');
    	tiddler.set(parts[0], parts[1].replace(regexpBackSlashEn, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), parts[2], Date.convertFromYYYYMMDDHHMM(parts[3]), parts[4]);
    	store.tiddlers[title]=tiddler;
    	store.tiddlers[title].revision = rev;
		displayTiddler(null,title,1,null,null,false,false);
		if (rev!="current")
			revisionText(title,"Revision #" + rev + " has been loaded.");
		else
			revisionText(title,"Latest copy has been loaded.");
//		displayMessage("If you wish to revert your page to this prior revision you must save it.");	
		}
}

function revisionText(title,rev)
{
e=document.getElementById("rev" + title);
if (!e)
{
	var theTiddler = document.getElementById("tiddler" + title);
	e=createTiddlyElement(theTiddler,"div","rev" + title,"revisiontext",null);
}
e.style.display="block";
e.innerHTML=rev;
window.setTimeout("new Effect.Fade(e);", 1000);

}

function distance_of_time_in_words(minutes) {
  if (minutes.isNaN) return "";
  minutes = Math.abs(minutes);
  if (minutes < 1) return ('less than a minute');
  if (minutes < 50) return (minutes + ' minute' + (minutes == 1 ? '' : 's'));
  if (minutes < 90) return ('about one hour');
  if (minutes < 1080) return (Math.round(minutes / 60) + ' hours');
  if (minutes < 1440) return ('one day');
  if (minutes < 2100) return ('approx one day');
  if (minutes < 2880) return ('almost two days');
  else return (Math.round(minutes / 1440) + ' days')
}
