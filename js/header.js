// localStorage.setItem('cartItems', JSON.stringify(cartItems));

if (!localStorage.getItem('cartItems')) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

//drawer menu dropdowns
const dropHeads = document.querySelectorAll('.catalog-menu__dropdown-head ');
const dropParents = document.querySelectorAll('.catalog-menu__dropdown');

dropHeads.forEach(head => {
  head.addEventListener('click', (event) => {
    const parent = event.target.closest('.catalog-menu__dropdown');
    dropParents.forEach(el => {
      if (el != parent) {
        el.classList.remove('drop-active');
        const dropContent = el.querySelector('.catalog-menu__dropdown-content');
        dropContent.style.height = '0px';
      }
      else {
        parent.classList.toggle('drop-active');
        const dropContent = parent.querySelector('.catalog-menu__dropdown-content');

        if (parent.classList.contains('drop-active')) {
          dropContent.style.height = dropContent.scrollHeight + 'px';
        }
        else {
          dropContent.style.height = '0px';
        }
      }
    })
  });
});

let drawerBtn;
if (window.innerWidth > 991) {
  drawerBtn = document.querySelector('.header-bot__nav-link')
} else {
  drawerBtn = document.querySelector('.header-top__burger')
}

const drawer = document.querySelector('.catalog-menu');

const drawerShow = () => {
  drawer.classList.toggle('catalog-menu--show');
};

drawerBtn.addEventListener('click', drawerShow);

drawer.addEventListener('click', event => {
  if (event.target.classList.contains('catalog-menu')) {
    drawerShow();
  }
  else if (event.target.closest('.catalog-menu__btn-close')) {
    drawerShow();
  }
});


//----adding to cart
let cartCountHtml;

if (window.innerWidth > 991) {
  cartCountHtml = document.querySelector('.cart-link__cart-count');
} else {
  cartCountHtml = document.querySelector('.mobile-cart-count');  
}

if (localStorage.getItem('cartItems')) {
  cartCountHtml.innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;
}

const addCartBtns = document.querySelectorAll('.card-add-btn');

//console.log(JSON.parse(localStorage.getItem('cart')));

const addToCart = (event) => {
  //Извлекаю данные товара
  const productItem = event.target.closest('.card-item');

  const productName = productItem.querySelector('.card-item__title').innerHTML;
  const productPrice = productItem.querySelector('.card-item__price').childNodes[0].data.replace(/\s+/g, '');
  const productImgBox = productItem.querySelector('.card-item__img');
  const productImg = productImgBox.querySelector('img').src;

  const productObj = {
    productName: productName,
    productPrice: productPrice,
    productImg: productImg,
    count: 1
  };

  // console.log(productObj);
  //Получаю данные которые уже есть в LocalStorage
  const locatCartData = JSON.parse(localStorage.getItem('cartItems'));

  const findedIndex = locatCartData.findIndex(item => item.productName == productName);
  
  //Если товар уже есть то увеличиваю его count
  if (findedIndex !== -1) {
    locatCartData[findedIndex].count++;
    localStorage.setItem('cartItems', JSON.stringify(locatCartData));
    console.log('count обновлен');
  } else {
    locatCartData.push(productObj);
    localStorage.setItem('cartItems', JSON.stringify(locatCartData));
    console.log('добавлено');
    cartCountHtml.innerHTML = locatCartData.length;
  }

  console.log(JSON.parse(localStorage.getItem('cartItems')));
};

addCartBtns.forEach(btn => {
  btn.addEventListener('click', addToCart);
});

document.querySelector('.user-nav__item').style.display = 'none';