const BASE = "https://raw.githubusercontent.com/ZAC96/Educacion_continua/main/";


function ordenarCursosPorFecha(cursos) {
  const meses = {
    "ENE": 1,
    "FEB": 2,
    "MAR": 3,
    "ABR": 4,
    "MAY": 5,
    "JUN": 6,
    "JUL": 7,
    "AGO": 8,
    "SEP": 9,
    "OCT": 10,
    "NOV": 11,
    "DIC": 12
  };

  return cursos.slice().sort((a, b) => {
    const diaA = parseInt(a.Dia) || 1;
    const diaB = parseInt(b.Dia) || 1;

    const fechaA = new Date(2025, (meses[a.Mes] || 12) - 1, diaA);
    const fechaB = new Date(2025, (meses[b.Mes] || 12) - 1, diaB);

    return fechaA - fechaB;
  });
}




fetch(BASE + "data/data_cursos_info/cursos.json")
  .then(res => res.json())
  .then(cursos => {
     // Filtrar los cursos con Tipo = "general"
     const cursosGenerales = cursos.filter(curso => curso.Tipo === "General");

    const contenedor = document.getElementById("cursos_generales_breve");
    contenedor.innerHTML = "";
    cursosGenerales.forEach(curso => {
      const div = document.createElement("div");
      div.className = "col-4 col-6-medium col-12-small";
      div.innerHTML = `
        <section class="box">
          <a href="curso.html?id=${curso.id}" class="image featured"><img src="${BASE + curso.img_index}"" alt="" /></a>
          <header>
            <h3>${curso.Titulo}</h3>
          </header>
          <p>${curso.descripcion_breve}</p>
          <footer>
            <ul class="actions">
              <li><a href="curso.html?id=${curso.id}" class="button alt">Saber más</a></li>
            </ul>
          </footer>
        </section>
      `;
      contenedor.appendChild(div);
      
    });
  })
  .catch(err => {
    document.getElementById("cursos").textContent = "Error al cargar cursos: " + err.message;
});

fetch(BASE + "data/data_cursos_info/cursos.json")
  .then(res => res.json())
  .then(cursos => {
    const cursosGenerales = cursos.filter(curso => curso.Tipo === "Especialidad");

    const contenedor = document.getElementById("cursos_especialidad_breve");
    contenedor.innerHTML = "";
    cursosGenerales.forEach(curso => {
      const div1 = document.createElement("div");
      div1.className = "col-4 col-6-medium col-12-small";
      div1.innerHTML = `
        <section class="box">
          <a href="curso.html?id=${curso.id}" class="image featured"><img src="${BASE + curso.img_index}" alt="" /></a>
          <header>
            <h3>${curso.Titulo}</h3>
          </header>
          <p>${curso.descripcion_breve}</p>
          <footer>
            <ul class="actions">
              <li><a href="curso.html?id=${curso.id}" class="button alt">Saber más</a></li>
            </ul>
          </footer>
        </section>
      `;
      contenedor.appendChild(div1);
    });


    //Lista de cursos en el final de la página
    const contenedor_dates = document.getElementById("fechas");
    contenedor_dates.innerHTML = "";

    const cursos_ordenados=ordenarCursosPorFecha(cursos)
    cursos_ordenados.forEach(curso => {
      const li = document.createElement("li");
      li.innerHTML = `
            <span class="date">${curso.Mes}<strong>${curso.Dia}</strong></span>
            <h3><a href="curso.html?id=${curso.id}">${curso.Titulo}</a></h3>
      `;

      contenedor_dates.appendChild(li);
    });

  })
  .catch(err => {
    document.getElementById("cursos").textContent = "Error al cargar cursos: " + err.message;
  });

