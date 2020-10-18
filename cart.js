

const getData = fetch('./data.json').then(res => res.json()).then(data => {
    data.items.forEach(item => createProductCard(item))
});

let qty = 0;
var TotalPrice = 0;
var Totaldiscount = 0;
var discount = 0;

const createProductCard = (item) => {
    const div = document.createElement('div')
    const spanDisc = document.createElement('span');
    const img = document.createElement('img')
    const div2 = document.createElement('div')
    const h4 = document.createElement('h4')
    const s = document.createElement('s')
    const span = document.createElement('span')
    const button = document.createElement('button')


    const cardHolder = document.querySelector('div.container-card');

    div.className = 'col-xs-10 col-sm-6 col-md-3 card';
    spanDisc.className = 'discount';
    img.className = 'img-responsive';
    Object.assign(img, {
        className: 'img-responsive',
        src: item.image,
        alt: 'Book Cover Not available'
    })
    div2.className = "price-info";
    button.className = "btn-add";
    cardHolder.append(div);
    div.append(spanDisc);
    div.append(img);
    div.append(div2);
    div2.append(h4);
    div2.append(s);
    div2.append(span);
    div2.append(button);

    h4.innerHTML = item.name;
    h4.setAttribute('style', 'font-family: Georgia, serif');
    h4.setAttribute('class', 'title');
    spanDisc.innerHTML = item.discount + '%';
    s.innerHTML = '₹' + item.price.display;
    s.setAttribute('class', 'actual-price');
    span.innerHTML = ' ₹' + item.price.actual;
    span.setAttribute('style', 'font-weight:bold;margin-right:3px');
    span.setAttribute('class', 'price');
    button.innerHTML = "Add to Cart";

    var addToCartButtons = document.getElementsByClassName('btn-add');

    for (var i = 0; i < addToCartButtons.length; i++) {
        var btn = addToCartButtons[i]
        btn.addEventListener('click', addToCartClicked)
    }


}





function addToCartClicked(event) {
    let data = event.target.parentElement;
    var price = data.getElementsByClassName('price')[0].innerHTML;
    var title = data.getElementsByClassName('title')[0].innerHTML;
    var actualPrice = data.getElementsByClassName('actual-price')[0].innerHTML;
    addItemToCart(title, price, actualPrice)

}

function addItemToCart(title, price, actualPrice) {
    const spanHeader = document.createElement('span');
    const header = document.querySelector('div.message-header');
    price = Number(price.split('₹').join(''));
    actualPrice = Number(actualPrice.split('₹').join(''));
    var tr = document.createElement('tr');
    var tdItem = document.createElement('td');
    var tdQty = document.createElement('td');
    var tdPrice = document.createElement('td');
    var cartRow = document.querySelector('table.cart-table');
    var elementExist = document.getElementById(title);
    if (elementExist) {
        header.append(spanHeader);
        spanHeader.setAttribute('class', 'alert-message');
        spanHeader.innerHTML = title + ' Already in Cart!';
        setTimeout(() => {
            spanHeader.remove();
        }, 2000)
        return
    }

    cartRow.append(tr);
    tr.append(tdItem);
    tr.append(tdQty);
    tr.append(tdPrice);

    tdItem.innerHTML = title;
    tdItem.setAttribute('id', title);
    tdQty.innerHTML = 1;
    tdPrice.innerHTML = '₹' + price;
    qty++;
    TotalPrice = TotalPrice + price;
    discount = actualPrice - price;
    Totaldiscount = Totaldiscount + discount;

    header.append(spanHeader);
    spanHeader.setAttribute('class', 'succ-message');
    spanHeader.innerHTML = title + ' Added to Cart!'

    setTimeout(() => {
        spanHeader.remove();
    }, 2000)


    updateTotal(qty, TotalPrice, Totaldiscount)

}

const updateTotal = (qty, TPrice, Totaldiscount) => {
    var totalItem = document.getElementsByClassName('total-item');
    var totalItemPrice = document.getElementsByClassName('total-item-count');
    var orderTotal = document.getElementsByClassName('order-total');
    var Tdiscount = document.getElementsByClassName('Tdiscount');
    totalItem[0].innerHTML = 'items' + '(' + qty + ')';
    totalItemPrice[0].innerHTML = '₹' + TPrice;
    orderTotal[0].innerHTML = '₹' + TPrice;
    Tdiscount[0].innerHTML = '₹' + Totaldiscount;



}