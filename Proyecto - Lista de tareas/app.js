document.getElementById('formulario-tareas').addEventListener('submit',guardarTarea);

function guardarTarea(e){
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    
    const tarea = {
        titulo,
        descripcion
    };

    //Si localStorage viene vacia agregame nuevas tareas
   if(localStorage.getItem('tareas') === null){
    let tasks = [];
    tasks.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tasks));

   } else {
    //En caso de que ya tenga tareas solo actualizalas
    let tasks = JSON.parse(localStorage.getItem('tareas'));
    tasks.push(tarea);
    localStorage.setItem('tareas',JSON.stringify(tasks))
   }

   obtenerTareas();
   document.getElementById('formulario-tareas').reset();
    e.preventDefault();
}



function obtenerTareas(){
    let tasks = JSON.parse(localStorage.getItem('tareas'));
    let vistaTareas = document.getElementById('tareas');

    vistaTareas.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].titulo;
        let descripcion = tasks[i].descripcion;
        vistaTareas.innerHTML += `
        <div class="card m-2"> 
           <div class = "card-body">
           <h3>${title}</h3>
           <hr>
            <p>${descripcion}</p>
            <a class="btn btn-danger" onclick = "borrarTarea('${title}')">Borrar</a>
           </div>
        </div>
        `
    }
}


function borrarTarea(title){

 let tareas = JSON.parse(localStorage.getItem('tareas'));
 for(let i = 0; i < tareas.length; i++){
    if(tareas[i].titulo ==  title){
      tareas.splice(i,1);
    }
 }
  localStorage.setItem('tareas', JSON.stringify(tareas));
  obtenerTareas();
}

obtenerTareas();