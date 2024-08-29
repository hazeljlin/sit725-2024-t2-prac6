$(document).ready(function() {
  // Load cat food products on page load
  getProducts();

  // Handle add product form submission
  $('#add-product-form').on('submit', function(event) {
    event.preventDefault();
    const product = {
      title: $('#title').val(),
      brand: $('#brand').val(),
      image: $('#image').val(),
      description: $('#description').val()
    };
    
    $.post('/api/products', product, (response) => {
      if (response.statusCode === 200) {
        M.toast({html: 'Product added successfully!'});
        getProducts(); // Refresh the list of products
      } else {
        M.toast({html: 'Failed to add product.'});
      }
    });
  });

  // Handle contact form submission
  $('#contact-form').on('submit', function(event) {
    event.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    M.toast({html: `Thank you, ${name}! We will get back to you shortly.`});
    
    // Clear form fields
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
  });
});

const getProducts = () => {
  $.get('/api/products', (response) => {
    if (response.statusCode == 200) {
      addProductCards(response.data);
    }
  });
};

function addProductCards(items) {
  $('#card-section').empty(); // Clear existing content
  items.forEach(item => {
    let card = `<div class="col s12 m6 l4">
                  <div class="card">
                    <div class="card-image">
                      <img src="${item.image}" alt="${item.title}">
                      <span class="card-title">${item.title}</span>
                    </div>
                    <div class="card-content">
                      <p><strong>Brand:</strong> ${item.brand}</p>
                      <p>${item.description}</p>
                    </div>
                    <div class="card-action">
                      <a href="#">Rate this product</a>
                    </div>
                  </div>
                </div>`;
    $('#card-section').append(card);
  });
}

