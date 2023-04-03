Proyecto API de Productos y Carritos para CoderHouse

# ACLARACIONES :

## Ruta GET api/products
Al no establecer un filtro especifico para la ruta get de productos( api/products ),
al parametro filter le ha sido asignada la tarea de establecer un monto minimo en PRICE
para realizar el filtro.

## Ruta POST api/carts/:cid/products/:pid
Se infiere un buen funcionamiento del frontend, Se usa para agregar un producto al carrito y para actualizar el mismo en caso de modificar si cantidad (quantity).

Para agregar un producto al carrito o modificar su cantidad :
En el body debera enviarse un objeto con las propiedades "_id" y "quantity"
Ej : {"_id" : "87asdah88", "quantity" : 3}

