$(function () {


  //header fixed
  const headerTop = document.querySelector('.header-top');
  const headerBot = document.querySelector('.header-bot');


  const ceoBlockAccordionInit = () => {
    //ceo-block аккордион
    const ceoBlockBtn = document.querySelector('.ceo-text__btn');
    //Получаю блок высота которого изменяется 
    const ceoBlock = document.querySelector('.ceo-text__inner');
    ceoBlockBtn.onclick = (event) => {
      ceoBlock.classList.toggle('ceo-text__inner--active');
      if (ceoBlock.classList.contains('ceo-text__inner--active')) {
        ceoBlock.style.height = ceoBlock.scrollHeight + 'px';
        ceoBlockBtn.innerHTML = 'Скрыть';
      }
      else {
        window.innerWidth >= 768 ? ceoBlock.style.height = '103px' : ceoBlock.style.height = '200px';
        ceoBlockBtn.innerHTML = 'Показать еще';
      }
    };
  };

  //Главная страница
  if (document.querySelector('.home-page')) {
    const newsSlider = new Swiper('.last-news__inner1', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news1',
        prevEl: '.swiper-button-prev__last-news1',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    const newsSlide1r = new Swiper('.last-news__inner2', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news2',
        prevEl: '.swiper-button-prev__last-news2',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    const newsSlide2r = new Swiper('.last-news__inner3', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news3',
        prevEl: '.swiper-button-prev__last-news3',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains('home-info__btn')) {
        const id = event.target.id;
        document.querySelector(`[data-popup="${id}"]`).style.opacity = '1';
        document.querySelector(`[data-popup="${id}"]`).style.visibility = 'visible';
      }
      else if (event.target.classList.contains('popup')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
      else if (event.target.closest('.popup-closer')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
    });

    ceoBlockAccordionInit();

  }

  

  //Страница product-details (страница конкретного товара)
  else if (document.querySelector('.product-details')) {

    $('.slider-big').slick({
      arrows: false,
      asNavFor: '.slider-small',
      arrows: false
    });

    $('.slider-small').slick({
      asNavFor: '.slider-big',
      focusOnSelect: true,
      arrows: false,
      swipeToSlide: true,
      touchThreshold: 30,
      centerMode: true,
      variableWidth: true
    });

    const newsSlider = new Swiper('.last-news__inner', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news',
        prevEl: '.swiper-button-prev__last-news',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    if (window.innerWidth <= 991) {
      const dopSlider = new Swiper('.dop__inner', {
        spaceBetween: 10,
        freeMode: true,
        slidesPerView: 'auto',
        breakpoints: {
          768: {
            spaceBetween: 20,
          }
        }
      });
      $('.dop__tabs').slick({
        swipeToSlide: true,
        touchThreshold: 30,
        variableWidth: true,
        arrows: false,
        infinite: false
      });
    }

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains('product__btn')) {
        const id = event.target.id;
        document.querySelector(`[data-popup="${id}"]`).style.opacity = '1';
        document.querySelector(`[data-popup="${id}"]`).style.visibility = 'visible';
      }
      else if (event.target.classList.contains('popup')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
      else if (event.target.closest('.popup-closer')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
    });

    const newsSlide1r = new Swiper('.last-news__inner2', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news2',
        prevEl: '.swiper-button-prev__last-news2',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    const productAddBtn = document.querySelector('.add-to-cart');

    productAddBtn.addEventListener('click', (event) => {
      const productItem = event.target.closest('.product');

      const productName = productItem.querySelector('.product__title').innerHTML;
      const productPrice = productItem.querySelector('.value').innerHTML;
      const productImgBox = productItem.querySelector('.slider-big__item');
      const productImg = productImgBox.querySelector('img').src;
      const productCount = productItem.querySelector('.count').innerHTML;

      const productObj = {
        productName: productName,
        productPrice: productPrice,
        productImg: productImg,
        count: Number(productCount)
      };

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
        const cartCountHtml = document.querySelector('.cart-link__cart-count');
        cartCountHtml.innerHTML = locatCartData.length;
      }
    });

    const productCounterHTML = document.querySelector('.counter');

    productCounterHTML.addEventListener('click', (event) => {
      const parent = event.target.closest('.counter');
      const countHTML = parent.querySelector('.count');

      if (event.target.classList.contains('increment')) {
        countHTML.innerHTML = Number(countHTML.innerHTML) + 1;
      }
    });
  }

  //СТраница коризны
  else if (document.querySelector('.cart-page')) {
    const summOfCartHtml = document.querySelector('.cart__total-price-span');
    //Отображаю количество элементов в корзине
    let cartAmount;
    if (window.innerWidth > 991) {
      cartAmount = document.querySelector('.cart__total-count');
    } else {
      cartAmount = document.querySelector('.mobile-cart-count');
    }
    cartAmount.innerHTML = cartItems.length;

    const newsSlider = new Swiper('.last-news__inner', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news',
        prevEl: '.swiper-button-prev__last-news',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });

    //Скрипты для каунтера на странице "Собрать мероприятие"
    window.addEventListener("click", (event) => {
      //Кликнули на "-"
      if (event.target.closest('.decrement')) {
        const parent = event.target.closest(".cart__item-counter");
        let count = parent.querySelector(".count");
        if (count.innerHTML > 0) {
          count.innerHTML -= 1;

          const cartItemHtml = parent.closest('.cart__item');

          const currentName = cartItemHtml.querySelector('.cart__item-title').innerHTML;
          //Извлекаю элементы корзины
          const currentCartItems = JSON.parse(localStorage.getItem('cartItems'));
          const findedIndex = currentCartItems.findIndex(item => item.productName == currentName);
          currentCartItems[findedIndex].count--;

          localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
          summOfCartHtml.innerHTML = calculateSumOfCart(currentCartItems);
        }
      }
      else if (event.target.closest(".increment")) {
        const parent = event.target.closest(".cart__item-counter");
        let count = parent.querySelector(".count");
        count.innerHTML = Number(count.innerHTML) + 1;

        const cartItemHtml = parent.closest('.cart__item');

        const currentName = cartItemHtml.querySelector('.cart__item-title').innerHTML;
        //Извлекаю элементы корзины
        const currentCartItems = JSON.parse(localStorage.getItem('cartItems'));
        const findedIndex = currentCartItems.findIndex(item => item.productName == currentName);
        currentCartItems[findedIndex].count++;

        localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
        summOfCartHtml.innerHTML = calculateSumOfCart(currentCartItems);
      }
      else if (event.target.closest(".cart__item-remover")) {
        //remove item from LocalStorage
        const localCartItemsData = JSON.parse(localStorage.getItem('cartItems'));
        const currentProduct = event.target.closest('.cart__item');
        const currentProductName = currentProduct.querySelector('.cart__item-title').innerHTML;

        const findedIndex = localCartItemsData.findIndex(item => item.productName == currentProductName);

        localCartItemsData.splice(findedIndex, 1);

        localStorage.setItem('cartItems', JSON.stringify(localCartItemsData));
    
        const cartCountHtml1 = document.querySelector('.cart-link__cart-count');
        cartCountHtml1.innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;

        const cartInfoCount = document.querySelector('.cart__total-count');
        cartInfoCount.innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;

        event.target.closest('.cart__item').remove();
        summOfCartHtml.innerHTML = calculateSumOfCart(localCartItemsData);

        //Обновляю количество элементов в корзине
        let cartAmount;
        if (window.innerWidth > 991) {
          cartAmount = document.querySelector('.cart__total-count');
        } else {
          cartAmount = document.querySelector('.mobile-cart-count');  
        }
        cartAmount.innerHTML = localCartItemsData.length;
      }
    });

    window.addEventListener("click", (event) => {
      if (event.target.classList.contains('cart__info-btn')) {
        const id = event.target.id;
        document.querySelector(`[data-popup="${id}"]`).style.opacity = '1';
        document.querySelector(`[data-popup="${id}"]`).style.visibility = 'visible';
      }
      else if (event.target.classList.contains('popup')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
      else if (event.target.closest('.popup-closer')) {
        document.querySelectorAll('.popup').forEach(popup => {
          popup.style.opacity = '0';
          popup.style.visibility = 'hidden';
        });
      }
    });

    const addBtns = document.querySelectorAll('.card-add-btn');
  
    addBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        const cartItemsParentHTML = document.querySelector('.cart__items-box');
        cartItemsParentHTML.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        //Обновляю количество элементов в корзине
        let cartAmount;
        if (window.innerWidth > 991) {
          cartAmount = document.querySelector('.cart__total-count');
        } else {
          cartAmount = document.querySelector('.mobile-cart-count');  
        }
        cartAmount.innerHTML = cartItems.length;

                const cartItemComponent = (props) => {
                  const cartItemHTML = `
                    <div class="cart__item">
                      <div class="cart__item-box">
                        <div class="cart__item-img">
                          <img src="${props.productImg}" alt="">
                        </div>
                        <h6 class="cart__item-title">${props.productName}</h6>
                      </div>
                      <div class="cart__item-box">
                        <div class="cart__item-counter">
                          <button class="cart__item-decrement decrement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7089 12.0053H0.505859V10.9951H20.7089V12.0053Z" fill="#6C7073"/>
                            </svg>
                          </button>
                          <span class="cart__item-count count">${props.count}</span>
                          <button class="cart__item-increment increment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.316 21.6014V1.39844H11.3262V21.6014H10.316Z" fill="#6C7073"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9218 12.0053H0.71875V10.9951H20.9218V12.0053Z" fill="#6C7073"/>
                            </svg>
                          </button>
                        </div>
                        <div class="cart__item-price">${props.productPrice}</div>
                        <button class="cart__item-remover">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2862 15L0.000559541 0.714284L0.714844 0L15.0005 14.2857L14.2862 15Z" fill="#6C7073"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0.714734L0.714284 15.0004L0 14.2861L14.2857 0.000449988L15 0.714734Z" fill="#6C7073"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  `;
                  return cartItemHTML;
                };

                cartItems.forEach(item => {
                  cartItemsParentHTML.insertAdjacentHTML( "beforeend",cartItemComponent(item));
                });
        summOfCartHtml.innerHTML = calculateSumOfCart(cartItems);
      });
    });

    
    //Вычисления суммы корзины----
    


    const myParseInt = (str) => {
      const numbers = '1234567890';
      const arrOfStr = str.split('');
      let result = '';
      arrOfStr.forEach(el => {
        if (numbers.includes(el)) {
          result = result + el;
        }
      });
      return Number(result);
    };

    const calculateSumOfCart = (arr) => {
      let result = 0;
      arr.forEach(item => {
        result += myParseInt(item.productPrice) * item.count;
      });
      return result;
    };


    if (JSON.parse(localStorage.getItem('cartItems')).length > 0) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      summOfCartHtml.innerHTML = calculateSumOfCart(cartItems);
    }
    
  }

  //Страница каталога
  else if (document.querySelector('.catalog-page')) {
    const newsSlider = new Swiper('.last-news__inner1', {
      spaceBetween: 10,
      freeMode: true,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next__last-news1',
        prevEl: '.swiper-button-prev__last-news1',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        }
      }
    });
    

    //dropdowns in sidebar
    const sidebarDrops = document.querySelector('.sidebar__drops');
    const dropParents = document.querySelectorAll('.sidebar__dropdown');

    sidebarDrops.addEventListener('click', (event) => {
      if (event.target.closest('.sidebar__dropdown-head')) {
        const parent = event.target.closest('.sidebar__dropdown');
        dropParents.forEach(el => {
          if (el != parent) {
            el.classList.remove('sidebar-drop--active');
            el.querySelector('.sidebar__dropdown-content').style.height = '0px';
          } 
          else {
            const dropContent = parent.querySelector('.sidebar__dropdown-content');
            parent.classList.toggle('sidebar-drop--active');

            if (parent.classList.contains('sidebar-drop--active')) {
              dropContent.style.height = dropContent.scrollHeight + 'px';
            }
            else {
              dropContent.style.height = '0px';
            }
          }
        });
      }
    });


    //-----
    if (document.querySelector('.sidebar-drop--active')) {
      const currentDrop = document.querySelector('.sidebar-drop--active');
      const dropContent = currentDrop.querySelector('.sidebar__dropdown-content');

      dropContent.style.height = dropContent.scrollHeight + 'px';
    }

  }

  if (document.querySelector('.slider-big')) {
    $('.slider-big').slick({
      arrows: false,
      asNavFor: '.slider-small',
      arrows: false
    });

    $('.slider-small').slick({
      asNavFor: '.slider-big',
      focusOnSelect: true,
      arrows: false,
      swipeToSlide: true,
      touchThreshold: 30,
      centerMode: true,
      variableWidth: true
    });

  }
});

