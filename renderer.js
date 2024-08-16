// Aquí puedes colocar todo el código relacionado con el DOM

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
  
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0";
      main.style.marginLeft = "0";
      document.body.classList.remove("sidebar-open");
    } else {
      sidebar.style.width = "250px";
      main.style.marginLeft = "250px";
      document.body.classList.add("sidebar-open");
    }
}

  
  document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      card.addEventListener('click', function() {
        cards.forEach(c => c.classList.remove('selected')); // Quita la clase 'selected' de todas las cartas
        this.classList.add('selected'); // Añade la clase 'selected' a la carta clickeada
      });
    });
  });
  
  // login código
  function toggleRegister() {
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.classList.add('animate-right');
    registerForm.style.display = 'flex';
    
    setTimeout(() => {
      loginForm.style.display = 'none';
      registerForm.classList.add('animate-left');
      registerForm.style.transform = 'translateX(0%)';
    }, 300);
  }
  
  function toggleLogin() {
    const loginContainer = document.querySelector('.login-container');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    registerForm.classList.add('animate-right');
    loginForm.style.display = 'flex';
    
    setTimeout(() => {
      registerForm.style.display = 'none';
      loginForm.classList.add('animate-left');
      loginForm.style.transform = 'translateX(0%)';
    }, 300);
  }

// Inicializar el gráfico con valores predeterminados
function initializeChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      bar.style.height = '0%'; // Inicialmente, todas las barras están en 0%
    });
    setTimeout(() => {
      bars.forEach((bar, index) => {
        bar.style.height = `${parseInt(bar.dataset.height)}%`; // Animar el gráfico
      });
    }, 100);
  }
  
  // Actualiza el gráfico al tipo deseado
  function updateChartType(type) {
    const bars = document.querySelectorAll('.bar');
    if (type === 'high-low') {
      bars[0].style.height = '80%';
      bars[1].style.height = '60%';
      bars[2].style.height = '40%';
      bars[3].style.height = '20%';
    } else if (type === 'low-high') {
      bars[0].style.height = '20%';
      bars[1].style.height = '40%';
      bars[2].style.height = '60%';
      bars[3].style.height = '80%';
    }
    setTimeout(() => {
      bars.forEach((bar) => {
        bar.style.height = `${parseInt(bar.style.height)}%`;
      });
    }, 100);
  }
  
  // Llamada inicial para animar el gráfico
  document.addEventListener('DOMContentLoaded', initializeChart);
  

  //Base de datos del login
  const { ipcRenderer } = require('electron');

  // Manejar el evento de envío del formulario de login
  document.getElementById('loginForm').addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional.
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Envía los datos del login al proceso principal para validación
      ipcRenderer.send('login-attempt', { username, password });
  });
  
  // Recibir la respuesta del proceso principal sobre si el login fue exitoso
  ipcRenderer.on('login-success', (event, user) => {
      // Cambia el contenido de la página para mostrar la información del usuario logueado
      document.body.innerHTML = `
          <div class="logged-in-container">
              <h1>Bienvenido, ${user.username}!</h1>
              <p>Te has logueado exitosamente.</p>
              <button id="logoutButton">Cerrar sesión</button>
          </div>
      `;
  
      // Añadir funcionalidad al botón de cerrar sesión
      document.getElementById('logoutButton').addEventListener('click', () => {
          ipcRenderer.send('logout');
      });
  });
  
  // Mostrar un mensaje de error si el login falla
  ipcRenderer.on('login-failure', () => {
      alert('Login fallido, por favor verifica tus credenciales.');
  });
  
  // Manejar el evento de cierre de sesión
  ipcRenderer.on('logout-success', () => {
      location.reload(); // Recargar la página para volver al estado de login
  });
  

