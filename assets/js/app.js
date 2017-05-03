function Person(celular, nombre, correo, ciudad){
  this.celular = celular;
  this.nombre = nombre;
  this.correo = correo;
  this.ciudad = ciudad;
}

var logo = document.getElementById("logo");
var navSignUp = document.getElementById("nav-sign-up");
var navLogIn = document.getElementById("nav-log-in");


var elemFormNone = document.getElementsByName("form-none");
var inpPhoneNumber = document.getElementById("inp-phone");
var inpName = document.getElementById("inp-name");
var inpEmail = document.getElementById("inp-email");
var inpCity = document.getElementById("inp-city");


var regPhone = /\d{9}/;
var regFirstCapLet = /^[A-Z][a-z]+$/;
var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


function validateEachInput(regEx){
    var input = event.target;
    var elemParent = input.parentElement;
    if(!regEx.test(input.value)){
      input.style.borderBottom = "2px solid #FEA4AD";
      input.nextElementSibling.style.display="block";
      // input:after.style.content = "error";
    }else{
      input.style.borderBottom = "2px solid #CCC3E2";
      input.nextElementSibling.style.display="none";
    }
}


window.addEventListener("load", function(){
  var lastScrollTop = 0;

  window.addEventListener("scroll", function(){
    var currentScroll = window.pageYOffset || document.body.scrollTop;
    var drive = document.getElementById("drive");
    var explore = document.getElementById("explore");
    var help = document.getElementById("help");
    if(currentScroll > 1){
      document.getElementById("header").className = "header-down-scroll";
      logo.src = "assets/image/logo-pink.png";
      help.style.color = "#CCC3E2";
      drive.style.color = "#CCC3E2";
      explore.style.color = "#CCC3E2";
      navLogIn.className = "c-gray";
      navSignUp.className= "show-sign-up";
    }else{
      document.getElementById("header").className = "header-up-scroll";
      logo.src = "assets/image/logo-white.png";
      navSignUp.className= "none-sign-up";
      navLogIn.className = "c-white";
      help.style.color = "white";
      drive.style.color = "white";
      explore.style.color = "white";
    }

  }, false);

  inpPhoneNumber.addEventListener("focus", function(){
    for (var i = 0; i < elemFormNone.length; i++) {
      elemFormNone[i].className = "input-box block";
    }
  });

  inpPhoneNumber.addEventListener("blur", function(){
    validateEachInput(regPhone);
  });

  inpName.addEventListener("blur", function(){
    validateEachInput(regFirstCapLet);
  });

  inpEmail.addEventListener("blur", function(){
    validateEachInput(emailRegex);
  });

  inpCity.addEventListener("blur", function(){
    validateEachInput(regFirstCapLet);
  });

  var allPerson=[];
  if(!localStorage.getItem("allPerson")){
    localStorage.setItem("allPerson",JSON.stringify(allPerson));
  }

  document.getElementById("btn-become").addEventListener("click", function(){
    event.preventDefault();
    var allInpData = document.querySelectorAll(".inp-data");

      for (var i = 0; i < allInpData.length; i++) {
        if(allInpData[i].value.trim().length == 0){
          allInpData[i].style.borderBottom = "2px solid #FEA4AD";
        }else if(inpPhoneNumber.value != "" || inpName.value != "" || inpEmail.value != "" || inpCity.value != ""){
          if(allInpData[i].style.borderBottom == "2px solid #FEA4AD"){
            allInpData[i].style.borderBottom = "2px solid #FEA4AD";
          }
          else{
            var newPerson = new Person(inpPhoneNumber.value, inpName.value, inpEmail.value, inpCity.value);
          }
          allPerson.unshift(newPerson);
         localStorage.setItem("allPerson",JSON.stringify(allPerson));
        }
      }
  });

});
