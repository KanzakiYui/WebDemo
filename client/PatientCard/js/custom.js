var currentOpen;
var profileFlag = true;
var newprogram = 0;
$(function(){
	$(".button-sets button").click(function(){
		$("#detail-title").text($(this).text());
		Toggle($(this).text());
  		$("html,body").animate({"scrollTop":$("#detail-title").offset().top},"fast");
	});
	$(".modal").on("show.bs.modal",function(event){
		$(this).data("deleteTarget",$(event.relatedTarget).data("item"));
	});
	$('[data-toggle="tooltip"]').tooltip({trigger: "manual"});
	$("div.editor-bar button").click(editorFunc)
});

function Toggle(name){
	if(name=="Allergies"&&currentOpen!="#allergy-detail-board"){
		$(currentOpen).slideUp();
		$("#allergy-detail-board").slideDown("normal");
		currentOpen = "#allergy-detail-board";
	}
	if(name=="Conditions"&&currentOpen!="#condition-detail-board"){
		$(currentOpen).slideUp();
		$("#condition-detail-board").slideDown("normal");
		currentOpen = "#condition-detail-board";
	}
	if(name=="Family Doctor"&&currentOpen!="#doctor-detail-board"){
		$(currentOpen).slideUp();
		$("#doctor-detail-board").slideDown("normal");
		currentOpen = "#doctor-detail-board";
		if(profileFlag){
			setTimeout(profile, 500);
			profileFlag = false;
		}
	}
	if(name=="Prescriptions"&&currentOpen!="#prescription-detail-board"){
		$(currentOpen).slideUp();
		$("#prescription-detail-board").slideDown("normal");
		currentOpen = "#prescription-detail-board";
	}
	if(name=="Services"&&currentOpen!="#service-detail-board"){
		$(currentOpen).slideUp();
		$("#service-detail-board").slideDown("normal");
		currentOpen = "#service-detail-board";
	}
	if(name=="Notes"&&currentOpen!="#note-detail-board"){
		$(currentOpen).slideUp();
		$("#note-detail-board").slideDown("normal");
		currentOpen = "#note-detail-board";
	}
	if(name=="Diagnosis Graph"&&currentOpen!="#graph-detail-board"){
		$(currentOpen).slideUp();
		$("#graph-detail-board").slideDown("normal");
		currentOpen = "#graph-detail-board";
	}
	if(name=="Attachment"&&currentOpen!="#attachment-detail-board"){
		$(currentOpen).slideUp();
		$("#attachment-detail-board").slideDown("normal");
		currentOpen = "#attachment-detail-board";
	}
}

function checkBox(event){
	if(event.target.checked)
		$(event.target).parent().addClass("check-container-checked");
	else
		$(event.target).parent().removeClass("check-container-checked");
}

function DeleteItem(event){
	var id = $(event.target).parents(".modal").data("deleteTarget");
	$("html,body").animate({"scrollTop":$(id).prev().offset().top},"fast");
	$(id).remove();
}

function allergyAdd(event){
	var last =$("#allergy-detail-board div.panel-primary").last()[0].id.split("-")[2];
	var id = "allergy-detail-"+(parseInt(last)+1);
	var text = $("#allergy-detail-board div.panel-primary")[0].innerHTML;
	text = text.substr(0,text.lastIndexOf("</div>"));
	text += "<div class='allergy-delete-button-wrap form-group col-sm-12'>";
	text += "<button type='button' class='allergy-delete btn btn-danger'  data-toggle='modal' data-target='#allergy-delete' data-item='#";
	text += id;
	text +="'>Delete</button></div><div>";
	var other = "<div id='"+id+"' class='panel panel-primary'>";
	text = other+text+"</div>";
	$(event.target).before(text);
	$("html,body").animate({"scrollTop":$("#"+id).offset().top},"fast");	
}

function profile(){
	var preHeight = $($("#doctor-detail-board div.col-md-4")[1]).height();
	var currentHeight = $($("#doctor-detail-board div.col-md-4")[2]).height();
	var imgCurrentHeight = $($("#doctor-detail-board div.col-md-4")[2]).find("img").height();
	var difference = currentHeight - preHeight ;
	$($("#doctor-detail-board div.col-md-4")[2]).find("img").height(imgCurrentHeight-difference);
}

function prescriptionAdd(event){
	var last =$("#prescription-detail-board div.panel-primary").last()[0].id.split("-")[2];
	var id = "prescription-detail-"+(parseInt(last)+1);
	var text = $("#prescription-detail-board div.panel-primary")[0].innerHTML;
	text = text.substr(0,text.lastIndexOf("</div>"));
	text += "<div class='prescription-delete-button-wrap form-group col-sm-12'>";
	text += "<button type='button' class='prescription-delete btn btn-danger'  data-toggle='modal' data-target='#prescription-delete' data-item='#";
	text += id;
	text +="'>Delete</button></div><div>";
	var other = "<div id='"+id+"' class='panel panel-primary'>";
	text = other+text+"</div>";
	$(event.target).before(text);
	$("html,body").animate({"scrollTop":$("#"+id).offset().top},"fast");
}

function addService(){
	var flag = Math.random()>0.5?"Yes":"No";
	var current = new Date();
	var date = current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
	newprogram++;
	var text="<tr><td class='record-table-2'>New Program [";
	text+=newprogram;
	text+="]</td><td class='record-table-5 service-description'>This is a new added program by demo...</td>";
	text+="<td class='record-table-1'>";
	text+=flag;
	text+="</td><td class='record-table-2'>";
	text+=date;
	text+="</td></tr>";
	$("#Patient-Service-Table").append(text);
}

function editorFunc(event){
	var func=$(event.target).text();
	if(func=="Smaller"){
		var size = $("#editor").css("font-size");
		size = parseFloat(size) - 4;
		size = size+"px";
		$("#editor").css("font-size",size);
	}
	if(func=="Larger"){
		var size = $("#editor").css("font-size");
		size = parseFloat(size) + 4;
		size = size+"px";
		$("#editor").css("font-size",size);
	}
	if(func=="Left")
		$("#editor").css("text-align","left");
	if(func=="Center")
		$("#editor").css("text-align","center");
	if(func=="Right")
		$("#editor").css("text-align","right");
	if(func=="Justify")
		$("#editor").css("text-align","justify");
}

function browse(){
	$("#fileUpload").trigger("click");
}

function fileChanged(event){
	$("#fileInfo").empty();
	var files= event.target.files;
	for(var i=0;i<files.length;i++){
		var suffix = files[i].name.lastIndexOf(".");
		var filename = files[i].name.slice(0, suffix);
		var type = files[i].name.slice(suffix+1);
		var size = files[i].size;
		if(size<1024)
			size = size+" B";
		else if (size<1024*1024&&size>=1024)
			size = (size/1024).toFixed(2)+" KB";
		else
			size = (size/1024/1024).toFixed(2)+" MB";
		var modified = files[i].lastModifiedDate.toString().split(" ");
		modified = modified[0] + " "+modified[1] + " "+modified[2] + " "+modified[3] + " "+modified[4];
		var text ="<tr><td>"+filename+"</td><td>"+type+"</td><td>"+size+"</td><td>"+modified+"</td></tr>";
		$("#fileInfo").append(text);
	}
}

function formSubmit(){
	var condition1 = /^\+?[0-9]*$/.test($("#age").val());
	var condition2 = $("#age").val() >= 0;
	var condition3 = $("#age").val() <= 200;
	var ageCondition = condition1&&condition2&&condition3;
	if($("#firstName").val()==""){
		$("html,body").animate({"scrollTop":$("#firstName").prev("label").offset().top},"fast");
		$("#firstName").tooltip("show");
		setTimeout(function(){$("#firstName").tooltip("hide");},2000);
	}
	else if($("#middleName").val()==""){
		$("html,body").animate({"scrollTop":$("#middleName").prev("label").offset().top},"fast");
		$("#middleName").tooltip("show");
		setTimeout(function(){$("#middleName").tooltip("hide");},2000);
	}
	else if($("#lastName").val()==""){
		$("html,body").animate({"scrollTop":$("#lastName").prev("label").offset().top},"fast");
		$("#lastName").tooltip("show");
		setTimeout(function(){$("#lastName").tooltip("hide");},2000);
	}
	else if($("#dateOfBirth").val()==""){
		$("html,body").animate({"scrollTop":$("#dateOfBirth").prev("label").offset().top},"fast");
		$("#dateOfBirth").tooltip("show");
		setTimeout(function(){$("#dateOfBirth").tooltip("hide");},2000);
	}
	else if($("#age").val()==""||!ageCondition){
		$("html,body").animate({"scrollTop":$("#age").prev("label").offset().top},"fast");
		$("#age").tooltip("show");
		setTimeout(function(){$("#age").tooltip("hide");},2000);
	}
	else if(dateAndage($("#dateOfBirth").val(),$("#age").val())){
		$("html,body").animate({"scrollTop":$("#dateOfBirth").prev("label").offset().top},"fast");
		$("#dateOfBirth").tooltip("show");
		setTimeout(function(){$("#dateOfBirth").tooltip("hide");},2000);
	}
	else if($("#homeNO").val()==""){
		$("html,body").animate({"scrollTop":$("#homeNO").prev("label").offset().top},"fast");
		$("#homeNO").tooltip("show");
		setTimeout(function(){$("#homeNO").tooltip("hide");},2000);
	}
	else if($("#city").val()==""){
		$("html,body").animate({"scrollTop":$("#city").prev("label").offset().top},"fast");
		$("#city").tooltip("show");
		setTimeout(function(){$("#city").tooltip("hide");},2000);
	}
	else if($("#mobilephone").val()==""){
		$("html,body").animate({"scrollTop":$("#mobilephone").prev("label").offset().top},"fast");
		$("#mobilephone").tooltip("show");
		setTimeout(function(){$("#mobilephone").tooltip("hide");},2000);
	}
	else if($("#homephone").val()==""){
		$("html,body").animate({"scrollTop":$("#homephone").prev("label").offset().top},"fast");
		$("#homephone").tooltip("show");
		setTimeout(function(){$("#homephone").tooltip("hide");},2000);
	}
	else if($("#emergency").val()==""){
		$("html,body").animate({"scrollTop":$("#emergency").prev("label").offset().top},"fast");
		$("#emergency").tooltip("show");
		setTimeout(function(){$("#emergency").tooltip("hide");},2000);
	}
	else
		vaildSuccess();
}

function dateAndage(date, age){
	var temp=date.split("-");
	var year = parseInt(temp[0])+parseInt(age);
	var mon = parseInt(temp[1]);
	var day = parseInt(temp[2]);
	var date = new Date();
	var currentYear = date.getFullYear();
	var currentMonth = parseInt(date.getMonth())+1;
	var currentDay = date.getDate();
	if(year>currentYear)
		return true
	else if(mon>currentMonth)
		return true
	else if(day>currentDay)
		return true
	else
		return false
}

function vaildSuccess(){
	$("#signatureToSubmit").modal("show",{keyboard: false, backdrop:"static"});
}

function signed(event){
	if($(event.target).val())
		$("#sub-button").removeAttr("disabled");
	else
		$("#sub-button").attr("disabled","disabled");
}

function Submitted(){
	$("#patientCard").submit();
}
