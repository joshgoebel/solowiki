// Checkboxes

function onClickCheckbox(e)
{
 if (!e) var e = window.event; 
 var target = (e.target) ? e.target : e.srcElement;
 var tiddler = this.parentNode.id.substr(6);
 if (store.tiddlers[tiddler].tags.find("todo")!=null)
 	return onClickToDo(tiddler,target);
 var text = store.getTiddlerText(tiddler);
 var re = new RegExp("^\\[([xX* ])\\](.*?)$","mg");
 var checkboxNum = 0;
 do {
  // get the next match
  var matches = re.exec(text);
  var matchpos = matches ? matches.index : text.length;
  if (matchpos != text.length) {
   var chk = matches[1];
   var chkp = (chk == " ") ? "x" : " ";
   if (tiddler + "_chk" + checkboxNum == target.id) {
    store.tiddlers[tiddler].text =
    text.replace(new RegExp("\\["+chk+"\\]"+matches[2],"mg"),"["+chkp+"]"+matches[2]);
    matches = null;
   }
   checkboxNum++;
  }
 } while(matches);
 // signal a change for a reload
 return(true);
}

function onClickToDo(tiddler, target)
{
// if (!e) var e = window.event; 
// var target = (e.target) ? e.target : e.srcElement;
// var tiddler = this.parentNode.id.substr(6);
 var text = store.getTiddlerText(tiddler);
 var re = new RegExp("^\\[([xX* ])\\](.*?)$","mg");
 var unfinished = new RegExp("^\\[([ ])\\](.*?)$","mg");
 var checkboxNum = 0;
 do {
  // get the next match
  var matches = re.exec(text);
  var matchpos = matches ? matches.index : text.length;
  if (matchpos != text.length) {
   var chk = matches[1];
   var chkp = (chk == " ") ? "x" : " ";
   if (tiddler + "_chk" + checkboxNum == target.id) {
    
    if (chkp!=" ") // if we're marking an item complete
    	{
//	    text=text.replace(new RegExp("\\["+chk+"\\]"+matches[2],"mg"),"");	
		 text=text.replace("\n["+chk+"]"+matches[2],"");		
//	  	 text=text.replace("----\n","----\n[x] "+trim(matches[2])+"\n");
    	 todo = unfinished.exec(text);
    	 if (!todo)
    	 	text=text.replace("!ToDo\n","!Complete");
    	 store.tiddlers[tiddler].text=text;
    	 addDoneItem(tiddler,trim(matches[2]));
    	 return;
    	 }
    else //we still have an item to do
    	{
  	 	text=text.replace("!Complete","!ToDo");
//     text=text.replace(new RegExp("\\["+chk+"\\]"+matches[2],"mg"),"");
		 text=text.replace("\n["+chk+"]"+matches[2],"");
		 store.tiddlers[tiddler].text=trim(text);
		 addToDoItem(tiddler,trim(matches[2]));
		 return true;
    	}
    
    matches = null;
   }
   checkboxNum++;
  }
 } while(matches);
 refreshTiddler(tiddler);
 saveTiddlerText(tiddler);
 // signal a change for a reload
 return(true);
}
