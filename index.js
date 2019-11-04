var siteNameInp = document.getElementById("siteName");
var siteUrlInp = document.getElementById("siteURL");
var addBtn = document.getElementById("addBtn");
var alertContainer = document.getElementById("alertContainer");
var sitesContainer;

if(localStorage.getItem("sitesContainer") == null)
    {
        sitesContainer = [];
    }
else
    {
        sitesContainer = JSON.parse( localStorage.getItem("sitesContainer"));
        displaySite();
    }

addBtn.onclick = function()
{
    if(validateForm()==true)
        {
            addSite();  
            displaySite();
            clearForm();
        }
}

function addSite()
{
    var site = 
        {
            name:siteNameInp.value,
            url:siteUrlInp.value,
        }
    sitesContainer.push(site);
    
localStorage.setItem("sitesContainer",JSON.stringify(sitesContainer)); 
}

function displaySite()
{
    var cols="";
    for(var i = 0 ; i<sitesContainer.length ; i++)
        {
        cols +=`<div class="container site mt-5">
                    <h3 class="text-left">`+sitesContainer[i].name+`</h3>
                    <div class="btns">
                        <a class="btn btn-info" href="`+sitesContainer[i].url+`" target="_blank">Visit</a>
                        <button class="btn btn-danger"         onclick="deleteSite(`+i+`)">Delete</button>
                    </div>
                </div>`   
        }
    document.getElementById("rowData").innerHTML = cols;
}
function deleteSite(id)
{
    sitesContainer.splice(id,1);
    localStorage.setItem("sitesContainer",JSON.stringify(sitesContainer));
    displaySite();
}
function clearForm()
{
    
   var inputs= document.getElementsByClassName("form-control");
    
    for(var i= 0 ; i <inputs.length ; i++)
        {
            inputs[i].value = "";
        }
}
function validateForm()
{
    var errors = "";
    var nameRegx = /^[A-Z][a-zA-Z0-9]{2,14}$/;
    var urlRegx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    
    
    if(nameRegx.test(siteNameInp.value)== false)
        {
            alertContainer.style.display = "block";
            errors+="<p>Site name must start with capital letter and 2-14 letters</p>";
            alertContainer.innerHTML = errors
        }
    if(urlRegx.test(siteUrlInp.value)== false)
        {
            alertContainer.style.display = "block";
            errors+="<p>Site url should start with https://</p>";
            alertContainer.innerHTML = errors
        }
    if(errors.length>0)
        {
            return false;
        }
    else 
        {
            alertContainer.style.display = "none";
            return true;
        }
}