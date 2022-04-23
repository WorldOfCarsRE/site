function whichBrs()
{
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1)
	{
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla')
			return navigator.userAgent.substr(0,agt.indexOf('\/'));
		else 
			return 'Netscape';
	} 
	else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
	else 
		return navigator.userAgent;
}

function getBrowserInfo()
{
	return ("BROWSER=" + whichBrs() + "\rUSERAGENT=" + navigator.userAgent + "\r");
}

function setSubmitURL()
{
	document.forms["report_form"].action = CFG.eventum;
	return true;
}

function onSetFormValue(name, value)
{
	if( name == "gamelog" )
	{
		name = "custom_fields[8]"
		value = (getBrowserInfo() + value);
	}
	else if( name == "accountname" )
	{
		name = "custom_fields[14]";
	}
	else if( name == "email" )
	{
		name = "custom_fields[10]";
	}
	
	document.contact_form[name].value = value;
}


function validateForm(theForm)
{
	setSubmitURL();
    var varFieldsToCheck = ["description","custom_fields[10]","custom_fields[14]", "custom_fields[5]", "custom_fields[6]"]

    var varReturn = true
    	for (var i=0;i<varFieldsToCheck.length;i++){
	    var itemToCheck=theForm[varFieldsToCheck[i]]
		if (itemToCheck == undefined){

			continue;
		}

	    if ((itemToCheck.value==null)||(itemToCheck.value=="")){
		errorDetails(theForm, varFieldsToCheck[i], true)
	      varReturn =  false
	    }



	    if (varFieldsToCheck[i] == "custom_fields[10]"){
		    if (echeck(itemToCheck.value)==false){

		      errorDetails(document.report_form, varFieldsToCheck[i], true)
		      varReturn =  false
		    }
	    }
	    if (varReturn == true){
		    errorDetails(document.report_form, varFieldsToCheck[i], false)
	    }

	}

	var varAttachCheck = checkAttachments("file[]_1", "file[]_2","file[]_3")

	if (!varAttachCheck){
		//varAttachError.className = "DisplayBlock"
		//varAttachError.style.visibility = "visible"
		varReturn =  false
      	}

	
	return varReturn

   }
   

   
function gotoEnvironURL(xpage){
	document.location = PATH.siteRoot +'/'+ xpage
}


function back_button(){
	history.go(-1)
}
  
function valEmail(value){
	var good = /^([\w\d\.\-_]+)@([\w\d\.\-]+)$/i;
  var evil =  /[^a-z0-9\@_\-\.]+/i;
        
  if (good.test(value) && !evil.test(value)) {
    return true;
  } else {
    return false;
  }
}

jq.fn.clearForm = function(){
	return this.each(function(){
		var type = this.type, tag = this.tagName.toLowerCase();
		if(tag == 'form')
			return jq(':input',this).clearForm();
		if(type == 'text' || type == 'password' || tag == 'textarea')
			this.value = '';
		else if(type == 'checkbox' || type == 'radio')
			this.checked = false;
		else if(tag == 'select')
			this.selectedIndex = -1;		
	});
}


  function getFormElement(f, field_name, num)
  {
      var elements = document.getElementsByName(field_name);
      var y = 0;
      for (var i = 0; i < elements.length; i++) {
          if (f != elements[i].form) {
              continue;
          }
          if (num != null) {
              if (y == num) {
                  return elements[i];
              }
              y++;
          } else {
              return elements[i];
          }
      }
      return false;
}
  function getPageElement(id)
  {
      if (document.getElementById) {
          return document.getElementById(id);
      } else if (document.all) {
          return document.all[id];
      }
}
  //
  //
  function errorDetails(f, field_name, show)
  {
      var field = getFormElement(f, field_name);
      //var icon = getPageElement('error_icon_' + field_name);
      //if (icon == null) {
         // return false;
     // }
      if (show) {
          field.style.backgroundColor = '#FF9999';
         // icon.style.visibility = 'visible';
         // icon.width = 14;
         // icon.height = 14;
      } else {
          field.style.backgroundColor = '#FFFFFF';
          //icon.style.visibility = 'hidden';
          //icon.width = 1;
         // icon.height = 1;
      }
}
//
//

function checkAttachments(xAttach1,xAttach2, xAttach3){
	
	
	var varCheckList = [xAttach1,xAttach2, xAttach3];
	
	var varAcceptTypes = ".jpg, .gif, .BMP, .log, .doc, .txt"
	
	for (var i=0;i<varCheckList.lenght;i++){
		if (varCheckList[i] != null){
		var varItem = varCheckList[i].value
		xAttach1 = xAttach1.toLowerCase();
			if (xAttach1 != "" && xAttach1 != " "){

				var varTypePos = xAttach1.lastIndexOf(".")
				var varType = xAttach1.substring(varTypePos)


				if (varAcceptTypes.indexOf(varType)>-1){
					varReturn = true

				}else{
				alert("checkAttachments return false")
				return false;

				}
			}
		}
		
	}
	return true;	
}

jq.fn.valType = function(){
	var valid = ['.jpq','.gif','.BMP','.log','.doc','.txt'];
	
}