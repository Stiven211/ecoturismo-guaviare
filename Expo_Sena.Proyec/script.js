    	// --- Publicar nuevo tour (solo para guías) ---
	const formNuevoTour = document.getElementById('form-nuevo-tour');
	const listaToursPublicados = document.getElementById('lista-tours-publicados');
	const mensajeTour = document.getElementById('mensaje-tour');

	// Cargar tours publicados desde localStorage
	function cargarToursPublicados() {
		if (!listaToursPublicados) return;
		listaToursPublicados.innerHTML = '';
		const tours = JSON.parse(localStorage.getItem('toursPublicados') || '[]');
		if (tours.length === 0) {
			listaToursPublicados.innerHTML = '<p style="color:#888;text-align:center;">No has publicado ningún tour aún.</p>';
			return;
		}
		tours.forEach(tour => {
			const card = document.createElement('div');
			card.className = 'tour-card';
			if (tour.foto) {
				const img = document.createElement('img');
				img.src = tour.foto;
				img.alt = 'Foto del tour';
				img.className = 'tour-foto';
				card.appendChild(img);
			}
			card.innerHTML += `<h3>${tour.nombre}</h3>
				<p><b>Precio:</b> $${tour.precio} COP</p>
				<p>${tour.descripcion}</p>`;
			listaToursPublicados.appendChild(card);
		});
	}

	if (formNuevoTour) {
		formNuevoTour.addEventListener('submit', function (e) {
			e.preventDefault();
			const nombre = document.getElementById('nombre-tour').value.trim();
			const descripcion = document.getElementById('descripcion-tour').value.trim();
			const precio = document.getElementById('precio-tour').value.trim();
			const fotoInput = document.getElementById('foto-tour');
			let foto = '';
			if (fotoInput && fotoInput.files && fotoInput.files[0]) {
				const reader = new FileReader();
				reader.onload = function (event) {
					foto = event.target.result;
					guardarTour(nombre, descripcion, precio, foto);
				};
				reader.readAsDataURL(fotoInput.files[0]);
			} else {
				guardarTour(nombre, descripcion, precio, '');
			}
		});
	}

	function guardarTour(nombre, descripcion, precio, foto) {
		const tours = JSON.parse(localStorage.getItem('toursPublicados') || '[]');
		tours.push({ nombre, descripcion, precio, foto });
		localStorage.setItem('toursPublicados', JSON.stringify(tours));
		if (mensajeTour) {
			mensajeTour.textContent = '¡Tour publicado exitosamente!';
			setTimeout(() => { mensajeTour.textContent = ''; }, 2000);
		}
		cargarToursPublicados();
		document.getElementById('form-nuevo-tour').reset();
	}

	// Mostrar tours publicados al cargar la página
	cargarToursPublicados();

document.addEventListener('DOMContentLoaded', function () {
	// --- Registro de usuario ---
	const registroForm = document.querySelector('.Registro');
	if (registroForm) {
		registroForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const nombre = registroForm.querySelector('input[type="text"]').value;
			const email = registroForm.querySelector('input[type="email"]').value;
			const password = registroForm.querySelector('input[type="password"]').value;
			const telefono = registroForm.querySelector('input[type="tel"]').value;
			const direccion = registroForm.querySelectorAll('input[type="text"]')[1].value;
			const tipo = registroForm.querySelector('select').value;
			const usuario = { nombre, email, password, telefono, direccion, tipo };
			localStorage.setItem('usuario', JSON.stringify(usuario));
			alert('Registro exitoso');
			window.location.href = tipo === "guia" ? 'index_de_Guia.html' : 'index_de_turista.html';
		});
	}

	// --- Inicio de sesión ---
	const sesionForm = document.querySelector('.sesion');
	if (sesionForm) {
		sesionForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const email = sesionForm.querySelector('input[type="email"]').value;
			const password = sesionForm.querySelector('input[type="password"]').value;
			const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
			if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
				alert('Inicio de sesión exitoso');
				window.location.href = 'Perfiles.html';
			} else {
				alert('Correo o contraseña incorrectos');
			}
		});
	}

	// --- Botón cerrar sesión (en cualquier página) ---
	const cerrarSesionBtn = document.querySelector('.cerrar-sesion');
	if (cerrarSesionBtn) {
		cerrarSesionBtn.addEventListener('click', function () {
			localStorage.removeItem('usuario');
			localStorage.removeItem('fotoPerfil');
			window.location.href = 'index.html';
		});
	}

	// --- Mostrar datos de perfil si estamos en Perfiles.html ---
	if (window.location.pathname.includes('Perfiles.html')) {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		if (usuario) {
			const nombreUsuario = document.getElementById('nombreUsuario');
			const emailUsuario = document.getElementById('emailUsuario');
			const telefonoUsuario = document.getElementById('telefonoUsuario');
			const direccionUsuario = document.getElementById('direccionUsuario');
			if (nombreUsuario) nombreUsuario.innerHTML = `<strong>Nombre:</strong> ${usuario.nombre}`;
			if (emailUsuario) emailUsuario.innerHTML = `<strong>Email:</strong> ${usuario.email}`;
			if (telefonoUsuario) telefonoUsuario.innerHTML = `<strong>Teléfono:</strong> ${usuario.telefono || '(no disponible)'}`;
			if (direccionUsuario) direccionUsuario.innerHTML = `<strong>Dirección:</strong> ${usuario.direccion || '(no disponible)'}`;
		}
		const inputImagen = document.getElementById('inputImagen');
		if (inputImagen) {
			inputImagen.addEventListener('change', function (event) {
				const file = event.target.files[0];
				if (file) {
					const reader = new FileReader();
					reader.onload = function (e) {
						document.getElementById('imagenUsuario').src = e.target.result;
						localStorage.setItem('fotoPerfil', e.target.result);
					};
					reader.readAsDataURL(file);
				}
			});
		}
		// Mostrar imagen guardada si existe
		const fotoGuardada = localStorage.getItem('fotoPerfil');
		if (fotoGuardada) {
			const imagenUsuario = document.getElementById('imagenUsuario');
			if (imagenUsuario) imagenUsuario.src = fotoGuardada;
		}
	}

	// --- Botón crear cuenta ---
	const btncrearcuenta = document.getElementById('btnCrear-cuenta');
	if (btncrearcuenta) {
		btncrearcuenta.addEventListener('click', function () {
			window.location.href = 'Iniciar_sesion.html';
		});
	}

	// --- Navegación de botones de volver ---
	const btnVolverIniciar = document.getElementById('btn-volver-iniciar');
	if (btnVolverIniciar) {
		btnVolverIniciar.addEventListener('click', function () {
			window.location.href = 'index.html';
		});
	}

	const btnVolverRegistro = document.getElementById('btn-volver-registro');
	if (btnVolverRegistro) {
		btnVolverRegistro.addEventListener('click', function () {
			window.location.href = 'index.html';
		});
	}

	// Botón volver en perfil: regresar al panel correcto según el tipo de usuario
	const btnVolverPerfil = document.getElementById('btn-volver-perfil');
	if (btnVolverPerfil) {
		btnVolverPerfil.addEventListener('click', function () {
			const usuario = JSON.parse(localStorage.getItem('usuario'));
			if (usuario && usuario.tipo === 'guia') {
				window.location.href = 'index_de_Guia.html';
			} else if (usuario && usuario.tipo === 'turista') {
				window.location.href = 'index_de_turista.html';
			} else {
				window.location.href = 'index.html';
			}
		});
	}

	// Botón volver en ver guías: regresar al panel correcto según el tipo de usuario
	const btnVolverGuias = document.getElementById('btn-volver-guias');
	if (btnVolverGuias) {
		btnVolverGuias.addEventListener('click', function () {
			const usuario = JSON.parse(localStorage.getItem('usuario'));
			if (usuario && usuario.tipo === 'guia') {
				window.location.href = 'index_de_Guia.html';
			} else if (usuario && usuario.tipo === 'turista') {
				window.location.href = 'index_de_turista.html';
			} else {
				window.location.href = 'index.html';
			}
		});
	}

	// Botón volver en ver tours: regresar al panel correcto según el tipo de usuario
	const btnVolverTours = document.getElementById('btn-volver-tours');
	if (btnVolverTours) {
		btnVolverTours.addEventListener('click', function () {
			const usuario = JSON.parse(localStorage.getItem('usuario'));
			if (usuario && usuario.tipo === 'guia') {
				window.location.href = 'index_de_Guia.html';
			} else if (usuario && usuario.tipo === 'turista') {
				window.location.href = 'index_de_turista.html';
			} else {
				window.location.href = 'index.html';
			}
		});
	}

	// --- Animación de entrada para el texto de bienvenida ---
	// --- Botones principales de navegación en index.html ---
	const btnIniciarSesion = document.getElementById('btn-iniciar-sesion');
	if (btnIniciarSesion) {
		btnIniciarSesion.addEventListener('click', function () {
			window.location.href = 'Iniciar_sesion.html';
		});
	}

	const btnPerfil = document.getElementById('btn-perfil');
	if (btnPerfil) {
		btnPerfil.addEventListener('click', function () {
			window.location.href = 'Perfiles.html';
		});
	}

	const btnGuias = document.getElementById('btn-guias');
	if (btnGuias) {
		btnGuias.addEventListener('click', function () {
			window.location.href = 'Guias.html';
		});
	}

	// --- Botones de navegación en index_de_Guia.html ---
	const btnPerfil2 = document.getElementById('btn-perfil');
	if (btnPerfil2 && window.location.pathname.includes('index_de_Guia.html')) {
		btnPerfil2.addEventListener('click', function () {
			window.location.href = 'Perfiles.html';
		});
	}
	const btnToursGuia = document.getElementById('btn-tours-guia');
	if (btnToursGuia) {
		btnToursGuia.addEventListener('click', function () {
			window.location.href = 'Tours.html';
		});
	}
	const btnTuristasGuia = document.getElementById('btn-turistas-guia');
	if (btnTuristasGuia) {
		btnTuristasGuia.addEventListener('click', function () {
			window.location.href = 'index_de_turista.html';
		});
	}

	// --- Botones de navegación en index_de_turista.html ---
	if (window.location.pathname.includes('index_de_turista.html')) {
		const btnPerfilTurista = document.getElementById('btn-perfil');
		if (btnPerfilTurista) {
			btnPerfilTurista.addEventListener('click', function () {
				window.location.href = 'Perfiles.html';
			});
		}
		const btnToursTurista = document.getElementById('btn-tours');
		if (btnToursTurista) {
			btnToursTurista.addEventListener('click', function () {
				window.location.href = 'Tours.html';
			});
		}
		const btnGuiasTurista = document.getElementById('btn-guias');
		if (btnGuiasTurista) {
			btnGuiasTurista.addEventListener('click', function () {
				window.location.href = 'Guias.html';
			});
		}
	}
	const animacion = document.querySelector('.animacion-bienvenida');
	if (animacion) {
		animacion.style.opacity = 0;
		animacion.style.transform = 'scale(0.8) translateY(30px)';
		setTimeout(() => {
			animacion.style.transition = 'all 1s cubic-bezier(.68,-0.55,.27,1.55)';
			animacion.style.opacity = 1;
			animacion.style.transform = 'scale(1) translateY(0)';
		}, 300);
	}
});
