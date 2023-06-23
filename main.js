let hero = document.querySelector(".hero");
let heroTitle = document.querySelectorAll(".hero_title>.ofh>h1");
let main = document.querySelector("#main");

let images = [
  "img/01.jpg",
  "img/02.jpg",
  "img/03.jpg",
  "img/04.jpg",
  "img/05.jpg",
  "img/06.jpg",
  "img/07.jpg",
  "img/08.jpg",
  "img/09.jpg",
];

let settings = {
  isEnabled: false,
  count: 1,
  time: 50,
};
gsap.set(heroTitle, { x: "-101%", opacity: 0 });

const initHero = function () {
  gsap.set(heroTitle, { x: "-101%", opacity: 0 });
  showHero();
};
const showHero = () => {
  gsap.to(heroTitle, { duration: 1.75, x: 0, stagger: 0.2, opacity: 1 });
};

function calcIndex(length) {
  settings.count++;
  if (settings.count == length) {
    settings.count = 0;
  }
  return settings.count;
}

function animateImage(e) {
  //이미지태그를 만들기
  let image = document.createElement("img"); //<img src=''> 이런게 만들어짐.
  let imageSize = 50;
  let countIndex = calcIndex(images.length);
  // console.log(countIndex);
  image.classList.add("hero_media");
  image.setAttribute("src", images[countIndex]);
  image.style.width = `${imageSize}rem`;
  image.style.height = `${imageSize}rem`;
  // setattribute로 속성을 설정하겠다.
  //A.appendChild(B).A에 B를 자식으로 넣겠다.
  image.style.top = e.clientY - imageSize * 4 + "px";
  image.style.left = e.clientX - imageSize * 4 + "px";

  hero.appendChild(image);
  let randomDeg = Math.floor(Math.random() * 15); // random() 0~ 1전까지의 소수숫자를 랜덤하게 뿌려줌.
  // console.log(randomDeg)
  setTimeout(() => {
    image.style.transform = "scale(0.5)";
    image.style.transform = `rotate(${randomDeg}deg)`;
  }, 30);
  setTimeout(() => {
    image.style.transform = "scale(0.25)";
    image.style.filter = "blur(10px)";
    image.style.opacity = 0;
  }, 300);
  setTimeout(() => {
    //자식요소 없애기.
    hero.removeChild(image);
  }, 2000);
}

window.addEventListener("mousemove", (e) => {
  if (!settings.isEnabled) {
    settings.isEnabled = true;
    setTimeout(() => {
      settings.isEnabled = false;
    }, settings.time);
    animateImage(e);
  }
});

// // 문서안의 모든 요소 및 이미지 영상 등 자료가 모두 업데이트 되면
// // 실행 돼라.
window.onload = () => {
  window.addEventListener("scroll", function () {
    let scrollT = window.pageYOffset;
    if (scrollT >= main.offsetTop - 400) {
      initHero();
      console.log("실행");
    }
  });
};
