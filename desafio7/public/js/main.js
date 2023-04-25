// Vanilla JS
const newProduct = document.getElementById('newProduct')
newProduct.addEventListener('submit', event => {
    event.preventDefault()
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const description = document.getElementById('description').value
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value
    socket.emit('new-product', 
    {
        "title" : title,
        "description" : description,
        "price" : parseInt(price),
        "thumbnail" : thumbnail,
        "code" : code,
        "stock" : parseInt(stock)
      })
    newProduct.reset();
  })
// Socket
const socket = io()

function deleteProduct(button){
  const id = button.getAttribute("data-id");
  socket.emit('delete-product', id);
}

socket.on('connect', () => {
  console.log('Socket on Frontend')
})

socket.on('render-products', products => {
  fetch('http://localhost:4000/views/products-render.handlebars')
    .then(response => {
       return response.text()
    })
    .then(plantilla => {
      let template = Handlebars.compile(plantilla);
      let html = template({products})
      document.getElementById('productos').innerHTML = html;
    })
})