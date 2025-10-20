document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartContent = document.querySelector('.cart-content');
  const totalDisplay = document.querySelector('.cart-total h3');

  let cart = [];
  let total = 0;

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const name = card.querySelector('h3').textContent;
      const price = parseFloat(card.querySelector('p').textContent.replace('₱', ''));

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCart();
    });
  });

  function updateCart() {
    cartContent.innerHTML = '';
    total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <span>${item.name} x${item.qty}</span>
        <span>₱${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-item" data-name="${item.name}">X</button>
      `;
      cartContent.appendChild(div);
    });

    if (cart.length === 0) {
      cartContent.innerHTML = '<p>No items yet.</p>';
    }

    totalDisplay.textContent = 'Total: ₱' + total.toFixed(2);

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', e => {
        const name = e.target.dataset.name;
        removeItem(name);
      });
    });
  }

  function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
  }
});
