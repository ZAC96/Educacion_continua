const BASE = "https://raw.githubusercontent.com/ZAC96/Educacion_continua/main/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function obtenerInstructoresDelCurso(campoInstructores, instructoresDisponibles) {
  // Separar por coma y limpiar espacios
  const nombresBuscados = campoInstructores
    .split(',')
    .map(nombre => nombre.trim());

  // Filtrar instructores que coincidan por nombre exacto
  const instructoresCoincidentes = instructoresDisponibles.filter(instr =>
    nombresBuscados.includes(instr.Name.trim())
  );

  return instructoresCoincidentes;
}


async function cargarCurso_Instructor() {
  try {
    const [cursosData, instructoresData] = await Promise.all([
      fetch(BASE + "data/data_cursos_info/cursos.json").then(r => r.json()),
      fetch(BASE + "data/data_cursos_info/instructores.json").then(r => r.json())
    ]);

    const curso = cursosData.find(c => c.id === id);
    if (!curso) throw new Error("Curso no encontrado");

    //document.getElementById("titulo").textContent = curso.Titulo;
    document.getElementById("curso").innerHTML = `
            <div class="row">
                        <!-- Panel izquierdo: contenido del curso -->
                        <div class="col-6 col-12-small curso_info" style="display: flex; flex-direction: column; justify-content: center;">
                            <header>
                                <h2>${curso.Titulo}</h2>
                            </header>
                            <div class="content">

            <p class="horario">${curso.horario}</p>
            <dl>
                <dt>Descripción</dt>
                <dd>${curso.Descripcion} </dd>
                <dt>Dirigido a</dt>
                <dd>${curso.Dirigido}</dd>
                <dt>Requisitos</dt>
                <dd>${curso.Requisitos}</dd>
                <dt>Duración</dt>
                <dd>${curso.Duracion}</dd>
            </dl>
			<div class="main-button"><a href="${BASE + curso.Temario}"  target="_blank">Temario</a></div>
                <p></p> 

                </div>
                        </div>
                        <!-- Panel derecho: imagen -->
                        <div  class="col-6 col-12-small" style="display: flex; align-items: center; justify-content: center;">
                            <img src="${BASE + curso.img}" alt="Imagen del curso" width="300" height="300" style="max-width:100%; height:auto; border-radius: 10px;">
                        </div>
                    </div>
                </div>
    `;
    const contenedor = document.getElementById("Instructores");
    contenedor.innerHTML = "";
    const instructores=obtenerInstructoresDelCurso(curso.Instructores, instructoresData)
    // Título dinámico según la cantidad
    const titulo = instructores.length > 1 ? "Instructores" : "Instructor";
    const tituloH2 = document.createElement("h2");
    tituloH2.textContent = titulo;
    contenedor.appendChild(tituloH2);

    instructores.forEach(instructor => {
      const divI = document.createElement("div");
      divI.className = "instructor-info"; // clase para estilos
      divI.innerHTML = `
          <img src="${BASE + instructor.img}" alt="${instructor.Name}" class="instructor-image">
          <h3>${instructor.Name}</h3>
          <p>${instructor.Descripcion}</p>
     `;
      contenedor.appendChild(divI);
    })

  } catch (err) {
    document.body.innerHTML = "<h2>Error al cargar datos: " + err.message + "</h2>";
  }
}

cargarCurso_Instructor();
