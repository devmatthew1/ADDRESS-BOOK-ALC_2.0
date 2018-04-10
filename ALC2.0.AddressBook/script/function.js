window.onload = function(){
	
	var contactinfo = [];
	var selectedindex = -1;

    var addbutton = document.getElementById('addbtn');
	var savebtn = document.getElementById('save');
	var modalform = document.querySelector('.modal')
	var date = document.getElementById('date');
	var name = document.getElementById('name');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address'); 
	var editor = document.getElementById('editor');

	var email = document.getElementById('email');
	
	var delcontact = document.querySelector('.contactlist');



   addbutton.addEventListener("click", function addbutton(){
	clearForm();
	document.getElementById('pop').style.display = "block";
    document.getElementById('formtitle').innerHTML = "CREATE NEW CONTACT";
	document.getElementById('save').innerHTML = "save";

	});

	savebtn.addEventListener("click", function savecontact(){
		var personData = name.value!='' && phone.value!='' && address.value!='' && email.value!='';
		if(personData){
		
			var obj = new formstructure(name.value,phone.value,address.value,email.value,date.value);
			if (selectedindex === -1) {
			contactinfo.push(obj);}
			else{
				contactinfo.splice(selectedindex,1,obj);
			}
			localStorage['mystorage'] = JSON.stringify(contactinfo);

			modalform.style.display = "none";
			clearForm();
			viewcontactinfo();
		}
	});

	delcontact.addEventListener("click", function removeEntry(e){
		
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			contactinfo.splice(remID,1);
			localStorage['mystorage'] = JSON.stringify(contactinfo);
			viewcontactinfo();

		}
	});

	


		editor.addEventListener("click", function editEntry(e){
		
		if(e.target.classList.contains('editbon')){
			document.getElementById('formtitle').innerHTML = "CONTACT INFO";
			var editID = e.target.getAttribute('data-id');
			selectedindex = editID;
			var contobj = contactinfo[editID];
			modalform.style.display = "block";
		    name.value = contobj.name;
		    phone.value = contobj.phone;
		    address.value = contobj.address;
		    email.value = contobj.email;
		    date.value = contobj.date;
			document.getElementById('save').innerHTML = "Update";

		}
	});


	
	function formstructure(name,phone,address,email,date){
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.email = email;	
		this.date = date;
	}

	function clearForm(){
		selectedindex = -1;
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function viewcontactinfo(){
		if(localStorage['mystorage'] === undefined){
			localStorage['mystorage'] = '';
		} else {
			contactinfo = JSON.parse(localStorage['mystorage']);
			
			delcontact.innerHTML = '';
			for(var n in contactinfo){
				var str = '<div class="result">';
					str += '<div class="name"  maxlength=""><span><a href="#" class="editbon" data-id="' + n + '">' + contactinfo[n].name + '</a></span></div>';
					str += '<div class="email"><span>' + contactinfo[n].email + '</span></div>';
					str += '<div class="phonenumber"><span>' + contactinfo[n].phone + '</span></div>';
					str += '<div class="address"><span>' + contactinfo[n].address + '</span></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				delcontact.innerHTML += str;
			}
		}
	}

	viewcontactinfo();

}