var usuarios = [];
var usuariosInteres = [];
var indiceUsuario = 0;
var indiceUsuarioL = usuariosInteres.length;

const cargarUsuarios = async () =>  {
    let respuesta = await fetch("http://localhost:3000/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
            },
        }
    );
    usuarios = await respuesta.json();
    console.log(usuarios);
    renderizarUsuarios();
}
cargarUsuarios();

const renderizarUsuarios = () => {
    usuarios.forEach((usuario) => {
        document.getElementById('usuarios').innerHTML +=
        `<div id="contenedor-usuario" onclick="ocultar2(${usuario.id})">
        <div><img id="img-usuarios" src="../Imagenes/${usuario.imagenPerfil}" alt=""></div> 
        <div id="nombre">${usuario.nombre}</div>
        </div>
        `
    });
}



function ocultar1(){
    document.getElementById('contenedor1').style.display = "block";
    document.getElementById('contenedor2').style.display = "none";
    document.getElementById('contenedor3').style.display = "none";
}

const cargarUsuario = async (id) =>  {
    let respuesta = await fetch(`http://localhost:3000/users/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
            },
        }
    );
    let usuarioSelect = await respuesta.json();
    console.log(usuarioSelect);
    
    return usuarioSelect;
}

const ocultar2 = async (id) => {
    document.getElementById('contenedor2').style.display = "block";
    document.getElementById('contenedor1').style.display = "none";
    document.getElementById('contenedor3').style.display = "none";
    let usuarioSelect = await cargarUsuario(id);
    cargarMatches(usuarioSelect.id);

    usuarioSelect.generoInteres.forEach(async (interes) => { 
        // console.log('Interes usuario',interes);
        usuarios.forEach( async (usuario)=>{
            // console.log('Genero usuarios',usuario.genero);
            if(interes == usuario.genero){
                // console.log('seleccionados',usuario.nombre, usuario.genero);
                usuariosInteres.push(usuario);
                console.log(usuariosInteres);
            }
        });
    });
    renderizarPortada(usuariosInteres[indiceUsuario]);
    // obtenerSeleccionado(usuariosInteres);

    // console.log('Este es el usuario elegido',usuarioSelect);
    // generoUsuario(usuarioSelect);
    // intereses(usuarioSelect);
}

const renderizarPortada = (usuarioSelect) => {
    // document.getElementById('contenedor2').innerHTML='';
    
        let htmlIntereses = "";
        let verificado = "";
        let indiceEdad = usuarioSelect.id-1;
        if (usuarioSelect.verificado) {
            verificado = '<i class="fa-solid fa-circle-check" style="color: #005eff;"></i>';
        }
        // usuarios[indiceEdad].intereses.forEach(interes => {
        //     htmlIntereses += `<div class="cualidades">${interes}</div>`
        //     })
    
        document.getElementById('contenedor2').innerHTML +=
        `
        <div id="portada">

            <img id="fondo-img" src="../Imagenes/${usuarioSelect.imagenPortada}" alt="">
            <div id="info-doble">
                <div class="informacion">
                    <div class="info">
                        <div>${usuarioSelect.nombre}</div>
                        <div>${usuarioSelect.edad}</div>${verificado}
                    </div>
                    <div><i class="icon2 fa-solid fa-briefcase"></i>${usuarioSelect.ocupacion}</div>
                    <div><i class="icon2 fa-solid fa-location-dot"></i>${usuarioSelect.ciudad}</div>
                    <!-- <div id="cualidades">${htmlIntereses}</div>      -->  
                </div>  
            </div>

            <div id="navegacion-inferior">
                <div class="ancho" onclick="flechaL(${usuarioSelect.id})"><i class="icon3 fa-solid fa-arrow-left"></i></div>
                <div class="ancho" onclick="corazon(${usuarioSelect.id})"><i id="corazon" class="icon3 fa-solid fa-heart"></i></div>
                <div class="ancho" onclick="flechaR(${usuarioSelect.id})"><i class="icon3 fa-solid fa-arrow-right"></i></div>
            </div>

        </div>
        `
}

const flechaR = (id) => {
    let indice = usuariosInteres.length-1;
    console.log('Indice',indice);
    if (indiceUsuario == indice) {
        indiceUsuario = -1;
    }
        
    document.getElementById('contenedor2').innerHTML='';
    console.log(id);
    indiceUsuario++;
    console.log('Indice usuario',indiceUsuario);
    renderizarPortada(usuariosInteres[indiceUsuario]);

}

const flechaL = () => {

    console.log('Izquierda');
    let indice = -1;
    console.log('Indice',indice);
    if (indiceUsuarioL == indice) {
        indiceUsuarioL = usuariosInteres.length-1;
    }
    console.log('Indice usuarioL',indiceUsuarioL);
    document.getElementById('contenedor2').innerHTML='';
    
    renderizarPortada(usuariosInteres[indiceUsuarioL]);
    indiceUsuarioL = indiceUsuarioL - 1;
    console.log('Indice usuarioL',indiceUsuarioL);
}

const corazon = async (id) => {
    document.getElementById('corazon').style.color = '#FF0000';
    // let usuarioLike = await cargarUsuario(id);
    // console.log(cuentaUsuario);
    // console.log(usuarioLike);
    // let like = usuarioLike.likes.push(usu);

    // let actualizar = 
    // {
    // "id": id,
    // "nombre": usuarioLike.nombre,
    // "genero": usuarioLike.genero,
    // "verificado": usuarioLike.verificado,
    // "edad": usuarioLike.edad,
    // "imagenPerfil": usuarioLike.imagenPerfil,
    // "imagenPortada": usuarioLike.imagenPortada,
    // "ocupacion": usuarioLike.ocupacion,
    // "ciudad": usuarioLike.ciudad,
    // "intereses": usuarioLike.intereses,
    // "matches": usuarioLike.matches,
    // "likes": usuarioLike.likes,
    // "generoInteres": usuarioLike.generoInteres
    // }
}



const cargarMatches = async (id) =>  {
    
    let respuesta = await fetch(`http://localhost:3000/users/${id}/matches`,
        {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
            },
        }
    );
    let matches = await respuesta.json();
    renderizarMatches(matches);
}



function ocultar3(){
    document.getElementById('contenedor3').style.display = "block";
    document.getElementById('contenedor1').style.display = "none";
    document.getElementById('contenedor2').style.display = "none";
}

const renderizarMatches = (matches) => {
    document.getElementById('matchesTotales').innerHTML = '';
    matches.forEach((match) => {
        document.getElementById('matchesTotales').innerHTML +=
        `
        <div id="matches">
            <div><img id="imgMatch" src="../Imagenes/${match.imagenPerfil}" alt=""></div>
                    
            <div class="matchInformacion">
                <div>${match.nombre}</div>
                <div class="letra ">${match.edad}</div>
                <div class="letra"><i class="fa-solid fa-briefcase"></i>${match.ocupacion}</div>
                <div class="letra"><i class="fa-solid fa-location-dot"></i>${match.ciudad}</div>
            </div>
        </div>    
        `
    });
}

const actualizarUsuario = async (json, id) => {
    let respuesta = await fetch(`http://localhost:3000/users/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json)
        }
    );
    const usuarioActualizado = await respuesta.json();
    console.log(usuarioActualizado);
}

