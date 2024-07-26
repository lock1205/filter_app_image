const btnChars = ['all', 'bag', 'shoe', 'watch', 'camera', 'headphone'];

const btnsWrapper = document.querySelector('.filter-btns');
btnChars.map((btnChar) => {
  const btnsList = `<button class="filter-btn" data-filter="${btnChar}">${
    btnChar.charAt(0).toUpperCase() + btnChar.slice(1)
  }</button>`;

  //charAt() : 파라미터 인덱스에 해당하는 문자 선택
  //toUpperCase() : 대문자로 변화
  //toLowerCase() : 소문자로 변환
  //slice():문자열을 추출 - 파라미터 인덱스부터 추출

  btnsWrapper.insertAdjacentHTML('beforeend', btnsList);
});

//first button add active class
const btns = document.querySelectorAll('.filter-btn');
console.log(btns);
btns[0].classList.add('active');

const images = [
  'bag-1.jpg',
  'camera-1.jpg',
  'camera-2.jpg',
  'headphone-1.jpg',
  'headphone-2.jpg',
  'shoe-1.jpg',
  'shoe-2.jpg',
  'watch-1.jpg',
];

const imagesWrapper = document.querySelector('.filter-images');

images.map((image) => {
  const imagesList = `<div class="filter-image" data-filter="${
    image.split('-')[0]
  }">
    <span><img src="images/${image}" alt=""/></span>
  </div>`;

  imagesWrapper.insertAdjacentHTML('beforeend', imagesList);
});

const imageElements = document.querySelectorAll('.filter-image');

//filter images
btns.forEach((btn) => {
  btn.addEventListener('click', activateFilter);
});

function activateFilter() {
  btns.forEach(function (btn) {
    console.log(btn);
    btn.classList.remove('active');
  });
  this.classList.add('active'); //this는 ()=>{} 이 형태에서는 사용되지 못한다. function(){} 이 형태로 사용되어야 this를 사용할 수 있다.

  console.log(this);
  const selectedBtn = this.getAttribute('data-filter');
  console.log(selectedBtn);

  //map, filter. reduce함수는 DOM 요소에 사용할 수 없다. 그래서 Array.from()을 사용하여 배열로 반환한다.
  Array.from(imageElements).filter((imageElement) => {
    imageElement.classList.add('hide');
    //imageElement.classList.remove('show');

    setTimeout(() => {
      if (
        imageElement.getAttribute('data-filter') === selectedBtn ||
        selectedBtn === 'all'
      ) {
        imageElement.classList.remove('hide');
        imageElement.classList.add('show');
      } else {
        imageElement.classList.remove('show');
        imageElement.classList.add('hide');
      }
    }, 100); //시간 지연 함수(promise): 첫번째 파라미터 = callback function, 두번째 파라미터 = 시간(밀리초)
  });
}
//function은 아래에 있어도 호이스팅으로 인해 최상위로 올라가서 참조가 가능하다.

//activate light box when click each image

const lightBoxOn = document.querySelector('.light-box');
const lightBoxOverlay = document.querySelector('.overlay');
console.log(lightBoxOn);

const showLightBox = (e) => {
  const target = e.currentTarget;
  console.log(target);
  const selectedImage = target.children[0].children[0].getAttribute('src'); //this를 사용하면 window 전체를 표시하게 된다.
  console.log(selectedImage);
  const categoryName = target.getAttribute('data-filter');
  console.log(categoryName);

  const lightBoxImage = document.querySelector('.light-box-image img');
  const categoryElement = document.querySelector('.title p');

  // getAttribute(): 파라미터 속성 값 가져오기
  // setAttribute(a, b): a: 속성 이름, b: 변경할 속성 값
  // a.textContent = b: a 요소에 b 텍스트 입력
  console.log(lightBoxImage);

  lightBoxImage.setAttribute('src', selectedImage);

  //사진을 클릭했을 때
  if (lightBoxImage.getAttribute('src') != null) {
    lightBoxOn.style.display = 'block';
    lightBoxOverlay.style.display = 'block';
  }

  categoryElement.textContent = categoryName;

  //라이트박스에 close 버튼을 눌렀을 때
};

imageElements.forEach((imageElement) => {
  imageElement.addEventListener('click', showLightBox);
});

//close light box

const lightBoxCloseBtn = document.querySelector('.light-box-text button'); //라이트박스 클로즈 버튼 가져오기

lightBoxCloseBtn.addEventListener('click', function () {
  lightBoxOn.style.display = 'none';
  lightBoxOverlay.style.display = 'none';
});
