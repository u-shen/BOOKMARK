var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var mustCreat =document.getElementById('mustCreat');
var notTrue =document.getElementById('notTrue');
var siteList=[];

if(localStorage.getItem('sitelist') !== null){
siteList= JSON.parse(localStorage.getItem('sitelist'));
display();
}

function addSite(){
    if(siteName.value !== "" && siteURL.value !== "" ){
        if(URLvalidation()===true){
            creatSite();
        }else{
            notTrue.classList.replace('d-none','d-block');
            alert('URL is not true');
        }
    }else{
        mustCreat.classList.replace('d-none','d-block');
        alert("you must creat site");
    }
}

function creatSite(){
   var site ={
    nameSite : siteName.value,
    urlSite : siteURL.value
   }
   siteList.push(site);
   localStorage.setItem("sitelist",JSON.stringify(siteList));
   cleatForm();
   display();
   mustCreat.classList.replace('d-block','d-none');
   notTrue.classList.replace('d-block','d-none');
}

function cleatForm(){
    siteName.value="";
    siteURL.value="";
   
}

function display(){
    var trs="";
    for(var i=0 ; i<siteList.length ; i++){
        trs+=`
        <tr >
        <td>${i+1}</td>
        <td>${siteList[i].nameSite}</td>
        <td > <button class="btn visit"> <i class="fa-solid fa-eye"></i> 
        <a href="${siteList[i].urlSite}"> Visit </a>
        </button> </td>
        <td><button class="btn delete" onclick="deleteSite(${i})"> <i class="fa-solid fa-trash-can"></i> Delete </button></td>
      </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=trs;
    }

function deleteSite(index){
    siteList.splice(index,1);
    localStorage.setItem("sitelist",JSON.stringify(siteList));
    display();
}

function URLvalidation(){
    var urlValue = siteURL.value;
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if(urlRegex.test(urlValue)===true){
       console.log("match");
        return true;
    }else{
        console.log("not match");
        return false;
    }
}