// [1] add setting box
let setting = document.querySelector(".setting");
let settingBox = document.querySelector(".setting-box");
let gear = document.querySelector(".gear");

// [1] [3] save colors in local storage

let mainColor = localStorage.getItem("color");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (mainColor === element.dataset.color) {
      element.classList.add("active");
    }
  });
}

setting.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  gear.classList.toggle("fa-spin");
});
// [1] [2] add switch color
let lisList = document.querySelectorAll(".colors-list li");
lisList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color", e.target.dataset.color);
    for (let i = 0; i < lisList.length; i++) {
      lisList[i].classList.remove("active");
    }
    e.target.classList.add("active");
  });
});

// [1] [3] add randome background
// img container add on click no
let imgContainer = document.querySelector(".img-container");

let randomBackEl = document.querySelectorAll(".span-container span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomImages();
      localStorage.setItem("image", true);
      imgContainer.style.height = "0";
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("image", false);
      imgContainer.style.height = "250px";
    }
  });
});

// [2] [1] add landing page
let landingPage = document.querySelector(".landing-page");
let backgroundOption = true;
let backgroundInterval;
let localBackground = localStorage.getItem("image");

// add active class to the backgrounds
let backgrounds = document.querySelectorAll(".img-content img");
backgrounds.forEach((img) => {
  img.addEventListener("click", (e) => {
    backgrounds.forEach((ele) => {
      //remove active class from all elements
      ele.classList.remove("active");
    });
    // add active class to the clicked
    e.target.classList.add("active");

    // put the background the selector image
    landingPage.style.backgroundImage = `url(${e.currentTarget.dataset.img})`;
    landingPage.style.backgroundSize = "cover";
  });
});

// save background in local storage
if (localBackground !== null) {
  if (localBackground === "true") {
    backgroundOption = true;
    console.log("true");
  } else {
    backgroundOption = false;
    console.log("false");
    imgContainer.style.height = "250px";
  }
  document.querySelectorAll(".span-container span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localBackground === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

// [2] add images
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

function randomImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * images.length);
      landingPage.style.backgroundImage = `url(../images/${images[random]})`;
    }, 3000);
  } else {
    clearInterval(backgroundInterval);
  }
}

randomImages();

// up scroll
let upScroll = document.querySelector(".up");

upScroll.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: "smooth",
  });
});

// Skills animation when scrollY connect thair

let skills = document.querySelector(".skills");
let skillSpan = document.querySelectorAll(".skill-progress span");

// window on scroll

window.onscroll = function () {
  // up button
  if (window.scrollY > 200) {
    upScroll.style.display = "block";
  } else {
    upScroll.style.display = "none";
  }

  if (window.scrollY >= skills.offsetTop - 300 && window.scrollY < 1500) {
    skillSpan.forEach((span) => {
      span.style.width = span.dataset.progress;
      span.innerHTML = span.dataset.progress;
    });
  } else {
    skillSpan.forEach((span) => {
      span.style.width = 0;
    });
  }
};

// active the gallery
let gallery = document.querySelector(".gallery");
let imageBox = document.querySelectorAll(".images-box img");

imageBox.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    let imgShow = document.createElement("div");
    imgShow.className = "img-show";

    let activeImg = document.createElement("img");
    activeImg.src = e.target.src;

    let closeIcon = document.createElement("button");
    closeIcon.className = "close-icon";
    closeIcon.innerHTML = "X";

    imgShow.appendChild(activeImg);
    imageContainer.appendChild(closeIcon);
    imageContainer.appendChild(imgShow);
    gallery.appendChild(imageContainer);

    closeIcon.addEventListener("click", () => {
      gallery.removeChild(imageContainer);
    });
  });
});

// Nav Bullets

const navBullets = document.querySelectorAll(".nav-bullets .bullet");
const linkSection = document.querySelectorAll(".links a");

function goToAnyWhere(element) {
  element.forEach((sec) => {
    sec.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
goToAnyWhere(linkSection);
goToAnyWhere(navBullets);

// reset settings

document.querySelector(".reset-settings").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// send massage to whatsapp
let prompText = document.getElementById('prompText');
let submit = document.getElementById('submit').addEventListener("click",(e)=>{
  let number = "+201050305754";
  e.preventDefault();
  let name = document.querySelector('form .left .userName').value;
  let phone = document.querySelector('form .left .userPhone').value;
  let email = document.querySelector('form .left .userEmail').value;
  let subject = document.querySelector('form .left .subject').value;
  let msg  = document.querySelector('form .right .msg').value;
  if(name.value == '' || phone.value == '' || email.value == "" || msg == "") {
    prompText.innerHTML = "please fill all cells "
  }
  else{
    prompText.innerHTML = "";
    var url = "https://wa.me/" + number + "?text="
  + "Name : " + name + "%0a" 
  + "phone : " + phone + "%0a"
  + "email : " + email + "%0a"
  + "subject : " + subject + "%0a"
  + "massage : " + msg  + "%0a%0a";
  window.open(url).focus();
}
  
})

// media query 

let navLinks = document.querySelector('.links');
let btn = document.querySelector('#menu');

btn.addEventListener("click", (e)=>{
  navLinks.classList.toggle('active');
  linkSection.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
      navLinks.classList.remove('active');
    })
  })
})
