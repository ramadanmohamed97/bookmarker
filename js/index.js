var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var dataContent = document.getElementById("bookmarkContent");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var searchInput = document.getElementById("search");

var registrationIndexUpdated ; 
var allBookMarks =[ ];




if(localStorage.allBookMarks !=null){
    allBookMarks = JSON.parse (localStorage.allBookMarks);
    displayData(allBookMarks)
}

function addBookMark() {
    console.log("addBookMark");
    var newBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value
    }
    allBookMarks .push (newBookMark);
    localStorage.setItem('allBookMarks' , JSON.stringify(allBookMarks))
    console.log(allBookMarks);
    displayData(allBookMarks);
}




submitBtn.addEventListener("click" ,function(){
   
    console.log("addBookMark");
    var newBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value
    }
    allBookMarks .push (newBookMark);
    localStorage.setItem('allBookMarks' , JSON.stringify(allBookMarks))
    console.log(allBookMarks);
    displayData(allBookMarks);
    clearInputs();
    
})

function displayData(arr){
    var cartoona = "";
    for(var i = 0; i < arr.length; i++){
        cartoona +=` 
         <tr>
                    <td class="ind">${i+1}</td>

                    <td class="web">${arr[i].siteName}</td>

                    <td><a class="btn-1" href="${arr[i].siteUrl}" target="_blank" >Visit </a></td>

                    <td><button class="btn-2" onclick="preUpdate(${i})"> Update</button></td>

                    <td><button class="btn-3" onclick="deleteBookMark(${i})" >Delete</button></td>
                </tr> 
                `;
    }
    dataContent.innerHTML=cartoona

}

function preUpdate(index){
    registrationIndexUpdated = index ;
    siteNameInput.value = allBookMarks[index].siteName;
    siteUrlInput.value = allBookMarks [index].siteUrl;
    displayupdateBtn()
    console.log( registrationIndexUpdated);
}

function displayupdateBtn(){
    document.getElementById("submitBtn").classList.replace('d-block','d-none');
    document.getElementById("updateBtn").classList.replace('d-none','d-block');
}

function displaySubmitBtn(){
    document.getElementById("submitBtn").classList.replace('d-none','d-block');
    document.getElementById("updateBtn").classList.replace('d-block','d-none');
}

function finalUpdate (){ 
    var newUpdate = {
        siteName : siteNameInput.value,
        siteUrl : siteUrlInput.value
    };
    allBookMarks.splice(registrationIndexUpdated , 1 , newUpdate);
    localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks));
    displayData(allBookMarks);
    displaySubmitBtn();
    clearInputs();

}

function deleteBookMark(index){
    allBookMarks.splice(index,1);
    localStorage.setItem('allBookMarks' , JSON.stringify (allBookMarks)) ;
    displayData(allBookMarks);
}

function clearInputs(){
    siteNameInput.value=""
    siteUrlInput.value=""
}

searchInput.addEventListener("input", function(e) {
    var query = e.target.value.toLowerCase();
    var result = [];
    for (var i = 0; i < allBookMarks.length; i++) {
        if (allBookMarks[i].siteName.toLowerCase().includes(query)) {
            result.push(allBookMarks[i]);
        }
    }
    displayData(result);

})

function validateUrl() {
    var urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w]*)*\/?$/i;
   console.log(urlPattern.test(siteUrlInput.value));
   return urlPattern.test(siteUrlInput.value);
}







   