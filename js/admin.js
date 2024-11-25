const productos = [
    {
      id: 1,  
      image: "https://f.fcdn.app/imgs/17a759/www.hering.com.uy/her/a523/original/catalogo/0227-MD3EN-1/1500-1500/camiseta-basica-unissex-gris-oscuro.jpg",
      nombre: "Camiseta básica",
      descripcion: "Camiseta de algodón 100% en varios colores.",
      categoria: "Ropa",
      precio: 15.99
    },
    {
      id: 2,  
      image: "https://static.bidcom.com.ar/publicacionesML/productos/ABLUE117/1000x1000-ABLUE117.jpg",
      nombre: "Auriculares inalámbricos",
      descripcion: "Auriculares Bluetooth con cancelación de ruido.",
      categoria: "Electrónica",
      precio: 49.99
    },
    {
      id: 3,
      image: "https://acdn.mitiendanube.com/stores/001/609/296/products/mockup-taza-personalizadas-800x8001-7a50e77fb3f6efc4f916246402651769-1024-1024.jpg",
      nombre: "Taza personalizada",
      descripcion: "Taza de cerámica con diseño personalizado.",
      categoria: "Hogar",
      precio: 9.99
    },
    {
      id: 4,
      image: "https://images.fravega.com/f300/bbafa7833bfa5612fa62601d5c7eabdc.jpg.webp",
      nombre: "Mochila resistente al agua",
      descripcion: "Mochila ideal para actividades al aire libre.",
      categoria: "Accesorios",
      precio: 29.99
    },
    {
      id: 5,
      image: "https://images.cdn3.buscalibre.com/fit-in/360x360/83/d9/83d9ec9246b1a3a05261ad9fa29802cc.jpg",
      nombre: "Libro de cocina",
      descripcion: "Recetario con platos fáciles y deliciosos.",
      categoria: "Libros",
      precio: 19.99
    },
    {
      id: 6,
      image: "https://acdn.mitiendanube.com/stores/896/208/products/negro-121-9df0e0553dd050f4c616735488919242-640-0.jpg",
      nombre: "Reloj inteligente",
      descripcion: "Smartwatch con monitor de actividad y notificaciones.",
      categoria: "Tecnología",
      precio: 89.99
    },
    {
      id: 7,
      image: "https://http2.mlstatic.com/D_NQ_NP_920355-MLA74957036825_032024-O.webp",
      nombre: "Zapatillas deportivas",
      descripcion: "Zapatillas ligeras y cómodas para correr.",
      categoria: "Calzado",
      precio: 59.99
    },
    {
      id: 8,
      image: "https://acdn.mitiendanube.com/stores/001/496/549/products/b31e782a-54e1-4cc1-a4df-afd289e270961-1025a6efcfc57c4c0416524611475068-1024-1024.jpeg",
      nombre: "Set de pinceles",
      descripcion: "Juego de pinceles para artistas de todos los niveles.",
      categoria: "Arte",
      precio: 12.99
    },
    {
      id: 9,
      image: "https://http2.mlstatic.com/D_NQ_NP_902439-MLM76224436026_052024-O.webp",
      nombre: "Bicicleta plegable",
      descripcion: "Bicicleta compacta y fácil de transportar.",
      categoria: "Deportes",
      precio: 299.99
    },
    {
      id: 10,
      image: "https://acdn.mitiendanube.com/stores/002/155/655/products/d_817487-mla46900788374_072021-o-4bf33efff419e42b7816305974317207-1024-1024-24b4d523d47612a74016766822900040-1024-1024.jpg",
      nombre: "Cojín ergonómico",
      descripcion: "Cojín de espuma viscoelástica para mayor comodidad.",
      categoria: "Hogar",
      precio: 24.99
    }
  ];
// ---------------------------------------------------------------#---------------------------------------------------------------//

let isEditing;
let productsButtonsEdit;

const tableHTML = document.getElementById('table-container');

const tableBodyHTML =document.getElementById('table-body');
const totalHTML = document.getElementById('total');
const productsFormHTML = document.getElementById('#user-form');
const formContainerHTML = document.querySelector(".container-table");
// const btnSumbitHTML = productsFormHTML.querySelector('button[type="submit"]');
renderProductos(productos);

productsFormHTML.addEventListener("submit", (evento)=>{
  evento.preventDefault()
  console.log(evento.target.elements);

  const el = evento.target.elements
  if(el["password-repeat"].value !== el.password.value){
    Swal.fire("La contraseña no coincide!");
    return
  }

  const nuevoArticulo = {
    id: isEditing ? isEditing : crypto.randomUUID(),
    image: el.image.value,
    nombre:el.nombre.value,
    descripcion: el.descripcion.value,
    categoria: el.categoria.value,
    precio: el.precio.value,
    active: el.active.checked,

  }
  if(isEditing){
    const productsIndex = productos.findIndex((products)=>{
      if(products.id === isEditing){
        return true
      }
    })
    productos[productsIndex] = nuevoArticulo
  }else{
    productos.push(nuevoArticulo)
  }

 
  renderProductos(productos);

  isEditing = undefined
  formContainerHTML.classList.remove("form-edit")
  btnSumbitHTML.classList.remove("btn")
  btnSumbitHTML.classList.add("btn-success")

  btnSumbitHTML.innerText = "Editar"

  titleFormHTML.innerText = "Editar producto"

  productsFormHTML.reset()
  el.nombre.focus()


})

function renderProductos(arrayProductos){

  tableBodyHTML.innerHTML= '';


  arrayProductos.forEach((products, index)=> {
      tableBodyHTML.innerHTML += `<tr>
                                 <td class= 'products-image'>
                                      <image src="${products.image}" alt="${products.nombre} imagenes"
                                 </td>
                                 <td class = "products-name"> ${products.nombre}</td>
                                 <td class = "products-descripcion"> ${products.descripcion}</td>
                                 <td class = "products-categori"> ${products.categoria}</td>
                                 <td class = "products-price"> ${products.precio}</td>                     
                                 <td class = "products-action">

                                    <button class= "button-edit" data-edit="${products.id}" title= "Editar">
                                      <i class="fas fa-pen"></i>
                                      
                                   </button>
                                   <button class= "button-danger" title= "Eliminar" onclick= "deleteProductos(${products.id})">
                                      <i class="fas fa-trash"></i>
                                      
                                   </button>                                 
                                                               
                                 </td>                     
  
                              </tr>`
  })
  updateEditButton();
}



function updateEditButton(){
  productsButtonsEdit = document.querySelectorAll('button[data-edit]')
  productsButtonsEdit.forEach((btn)=>{
    btn.addEventListener('click', (evt)=>{
      const id = evt.currentTarget.dataset.edit
      completeProductsForm(id)
    })
  })
}
//-----------------------------------------------------------------#------------------------------------------------------------//

function completeProductsForm(idproducts){
  isEditing = idproducts;
  
  const products = productos.find((products)=>{
    if(parseInt(products.id) === parseInt(idproducts))
      return true
  })
  if(!products){
    alert('No se encontro el producto')
    return
  }
  const el = productsFormHTML.elements;
  el.id.value = products.id;
  el.image.value = products.image;
  el.nombre.value = products.nombre;
  el.descripcion.value = products.descripcion;
  el.categoria.value = products.categoria;
  el.precio.value = products.precio;
  el["password-repeat"].value = products.password;
  el.active.checked = products.active;


  formContainerHTML.classList.add("form-edit")
  btnSumbitHTML.classList.remove("btn-primary")
  btnSumbitHTML.classList.add("btn-success")

  btnSumbitHTML.innerText = "Editar"

  titleFormHTML.innerText = "Editar usuario"
}




// ---------------------------------------------------------------#---------------------------------------------------------------//

function deleteProductos(idProducts){
  const indice = productos.findIndex((products)=> {
    if(products.id === idProducts){
      return true
    }

  })
  
  if(indice=== -1){
    Swal.fire({
      title: "¡Alerta! 👀",
      text: "No se encontro el producto",
      icon: "Warning",
      
    })
    return
  }  
  productos.splice(indice, 1)
  renderProductos(productos)

  Swal.fire({
    title: "Esta seguro que quieres eliminar el producto?",
    text: "Esta accion no se puede revertir!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar producto"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se elimino correctamente",
        showConfirmButton: false,
        timer: 2000
      })
    }
  })
  
}




//-----------------------------------------------------------------#------------------------------------------------------//
function inputSearch(evt){
  console.log(evt.target.value)
  const search = evt.target.value.toLowerCase();

  const filteredProductos = productos.filter((products)=>{
    if(products.nombre.toLowerCase().includes(search)){
      return true;

    }
    return false;
  })
  renderProductos(filteredProductos)

}
 function sortDesc(){
  const collator = new Intl.Collator(undefined, {sensitivity: 'base'})
  productos.sort((a,b)=> {
    return collator.compare(b.nombre, a.nombre)
  })
  renderProductos(productos);
  
}

function sortAsc(){
  const collator = new Intl.Collator(undefined, {sensitivity: 'base'})
  productos.sort((a,b)=> {
    return collator.compare(a.nombre, b.nombre)
  })
  renderProductos(productos);
}



