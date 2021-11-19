const BASE_URL = 'https://api.mercadolibre.com/';
const CART_ITEMS = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function getItem(middle, item) {
    document.querySelector('.container')
      .appendChild(createCustomElement('section', 'loading', 'loading...'));
    const response = await fetch(`${BASE_URL}${middle}${item}`);
    const object = response.json();
    document.querySelector('.loading').remove();
    if (object) return object;
    throw Error('Erro! Falha na conexão');
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function setLocalStorage() {
  const cartList = document.querySelector(CART_ITEMS).innerHTML;
  localStorage.setItem('cartList', JSON.stringify(cartList));
}

function sumItems() {
  const totalPrice = document.querySelector('.total-price');
  const cart = document.querySelector('ol.cart__items');
  if (cart.children.length) {
    const newPrice = Object.values(cart.children).reduce((acc, value) => {
      const price = parseFloat(value.innerText.split('$')[1]);        
      return Math.round((acc + price) * 100) / 100;
    }, 0);
    totalPrice.innerText = newPrice;
  } else {
    totalPrice.innerText = '';
  }
}

function cartItemClickListener(event) {
  const { target } = event;
  target.remove();
  setLocalStorage();
  sumItems();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  try {
    const itemID = getSkuFromProductItem(event.target.parentNode);
    const selectItem = await getItem('items/', itemID);
    const cart = document.querySelector(CART_ITEMS);
    cart.appendChild(createCartItemElement(selectItem));
    setLocalStorage();
    sumItems();
  } catch (error) {
    window.alert(error);
  }
}

function uploadItems(results) {
  const items = document.querySelector('.items');
  results.forEach((result) => {
    const item = items.appendChild(createProductItemElement(result));
    const btnAddToCart = item.querySelector('.item__add');
    btnAddToCart.addEventListener('click', addItemToCart);
  });
}

async function fetchItem() {
  try {
    const { results } = await getItem('sites/MLB/search?q=', 'computador');
    uploadItems(results);
  } catch (error) {
    window.alert(error);
  }
}

async function getLocalStorage() {
  const cart = await document.querySelector(CART_ITEMS);
  cart.innerHTML = await JSON.parse(localStorage.getItem('cartList'));
  Object.values(cart.children).forEach((item) =>
    item.addEventListener('click', cartItemClickListener));
  sumItems();
}

function emptyCartEvent() {
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    document.querySelector(CART_ITEMS).innerHTML = '';
    setLocalStorage();
    sumItems();
  });
}

window.onload = () => {
  getLocalStorage();
  fetchItem();
  emptyCartEvent();
};
