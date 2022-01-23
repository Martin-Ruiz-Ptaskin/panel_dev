$(document).ready(function() {
  // Global Settings
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  fetchTasks();
  $('#task-result').hide();


  // search key type event
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
              template += `
                     <li><a href="#" class="task-item">${task.name}</a></li>
                    ` 
            });
            $('#task-result').show();
            $('#container').html(template);
          }
        } 
      })
    }
  });

  $('#task-form').submit(e => {
    e.preventDefault();
    const postData = {
      name: $('#name').val(),
      modulo: $('#modulo').val(),
      description: $('#description').val(),
      id: $('#taskId').val()
    };
    const url = edit === false ? 'task-add.php' : 'task-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      $('#task-form').trigger('reset');
      fetchTasks();
    });
  });

  // Fetching Tasks
  function fetchTasks() {
    $.ajax({
      url: 'tasks-list.php',
      type: 'GET',
      success: function(response) {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
         
          template += `
                  <tr  taskId="${task.id}">
                  <td style="display:none">${task.id}</td>
                  <td>
                  <a href="https://asijira.buenosaires.gob.ar/browse/${task.name}" class="task-item">
                    ${task.name} 
                  </a>
                  </td>
                  <td><pre>${task.description}</pre></td>
                  <td>${task.estado}</td>
                  <td>${task.fecha}</td>
                  <td>${task.modulo}</td>
                  <td class="personahold" viendo="${task.viendo}" >${task.viendo}</td>


                  
                  <td style="display:flex; justify-content:center; flex-direction:column;">
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                    <button taskid="${task.id}" class="task-info btn btn-info">
                      Acciones
                    </button>
                  </td>
                  </tr>
                `
        });
        $('#tasks').html(template);
        
      }
    });

  }

  // Get a Single Task by Id 
  $(document).on('click', '.task-item', (e) => {
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr('taskId');
    $.post('task-single.php', {id}, (response) => {
      const task = JSON.parse(response);
      $('#name').val(task.name);
      $('#description').val(task.description);
      $('#taskId').val(task.id);
      edit = true;
    });
    e.preventDefault();
  });

  // Delete a Single Task
  $(document).on('click', '.task-delete', (e) => { // le digo que ejecute lo siuiente cuando la clase task-delete sea clickeada
    if(confirm('Are you sure you want to delete it?')) { // pregunto si esta seguro de querer eliminar
      const element = $(this)[0].activeElement.parentElement.parentElement; // esto no haria falta pero guarda en una variable el objeto donde se encuentra el id Relacionado con la BBDD
      const id = $(element).attr('taskId'); // saco del html el atributo taskid Que tiene el id al cual debo modificar
      $.post('task-delete.php', {id}, (response) => { // con esto genero una peticion hacia "task-delete.php" que dberia ser tu archivo php que haga la accion de borrar modificar etc, tambien le paso la variable id definida arriba
        fetchTasks(); // ignorar
        console.log(response);  //imprimo lo que devuelve task-delete.php
      });
    }
  });
  var actual
   $(document).on('click', '.task-info', (e) => {
        
        $('.info').css("display","flex");

        
            const element = $(this)[0].activeElement.parentElement.parentElement.getAttribute('taskid');
            console.log(element)
      const id =$(this)[0].activeElement.parentElement.parentElement.getAttribute('taskid');;
      actual=id;
      
      
      $.post('traer-notas.php', {id}, (response) => {
console.log(response)
const tasks = JSON.parse(response);
        if(response!=null){
         
 let template = '';
        tasks.forEach(task => {
          if (task.padre==".t.") {
            task.padre ="tasio"
          }
           if (task.padre==".m.") {
            task.padre ="Martin"
          }
           if (task.padre==".n.") {
            task.padre ="Nahuel"
          }
          template += `
                  <div class="coment">
    <div class="autor"><pre>${task.padre}</pre><div style="margin-right: 10px;">${task.fecha}</div></div>
    <div class="textp_comentario"> ${task.txt}</div>
    
  </div>
                `
        });
      
        $('#texto-place').html(template);
        }
        if (tasks.length==0) {
          $('#texto-place').html('<h3 style="width:100%; text-align:center;">No hay comentarios </h3>');

        }
        
      
      });
    
  });
    var persona
  $(".per").click(function(){
var seesion = $(this).attr("iden")
persona=$(this).attr("iden");
console.log(seesion);


 $.post('set-session.php', {seesion}, (response) => {
 console.log(response);
 $(".fondo").css("display","none")
        if(response=="yes"){
          $("#texto-place").append('<p class="text"> '+txt+'</p>');
        }
       
      });

})


  $(".personal").click(function(){
  
    
var campos=$(".personahold");
for(n=0; campos.length>n ;n++){
  
  var valor=campos[n].getAttribute("viendo");
   if (!(valor.includes(persona))) { campos[n].parentNode.style.display="none" }
 
 
}
console.log();



  })

  $(".general").click(function(){
  
    
var campos=$(".personahold");
for(n=0; campos.length>n ;n++){
  
 campos[n].parentNode.style.display="" 
 
 
}
console.log();



  })
   // Agrego notas con el boton

   $("#agregar").click(function(){
        var txt=$('#txtarea').val();
        
         console.log(select)
     
        $.post('task-notas.php', {actual,txt,persona}, (response) => {

        if(response=="yes"){
          $("#texto-place").append('<pre class="text"> '+txt+'</pre>');
        }
        console.log(response);
      });
       



   })
   // agrego notas con el oncehnge del select

   $("#select").change(function(){
     var select=$('.select').val();
 $.post('task-notas.php', {actual,select,persona}, (response) => {

        if(response=="yes"){
          $("#texto-place").append('<p class="text"> '+txt+'</p>');
        }
        console.log(response);
      });
   })
  

   $("#cruz").click(function(){
        $('.text').remove();
        $('.info').css("display","none");
        



   })
   

});

 