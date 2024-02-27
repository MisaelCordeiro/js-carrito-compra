// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    })
}



// Funciones
function agregarCurso(e){
    e.preventDefault(); 
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del array articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); 
        
        carritoHTML(); // iterar sobre el carrito y mostrar sus html
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la info del curso
function leerDatosCurso(curso){
    // console.log(curso)

    //Crear Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if (existe){
        // actualizamos cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // devuelve el object actualizado
            }else{
                return curso; // devuelve los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agreagamos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   
   

   console.log(articulosCarrito);

   carritoHTML();
}

// Muestra el carrito en el HTML
function carritoHTML(){
    // limpiar el html
    limpiarHTML();

    // recorre carrito y gneera html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        // Agrega HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Eliminar cursos del tbody 
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}