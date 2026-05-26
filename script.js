/* ==========================================================================
   SERVIGRAM INTERACTIVE FRONTEND SCRIPT
    Snappy, lightweight, and robust vanilla JavaScript.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Sticky Glass Header Scroll Effect
     ========================================================================== */
  const header = document.querySelector('.main-header');
  
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check


  /* ==========================================================================
     2. Mobile Drawer Navigation Toggle
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const drawerClose = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = ''; // Unlock body scroll
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });


  /* ==========================================================================
     3. Active Menu Link ScrollSpy
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function activeMenuOnScroll() {
    let scrollY = window.scrollY;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      // Triggers slightly before section arrives for visual anticipation
      const sectionTop = current.offsetTop - 120; 
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', activeMenuOnScroll);
  activeMenuOnScroll(); // Initial active link check


  /* ==========================================================================
     4. Applications Section Filter Tab Switcher
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const appDetailsCard = document.querySelector('.apps-details-card');
  const appMainImg = document.getElementById('app-main-img');
  const appSubImg = document.getElementById('app-sub-img');
  const appTitle = document.getElementById('app-title');
  const appDesc = document.getElementById('app-desc');
  const appChecklist = document.getElementById('app-checklist');
  const appBadgeIcon = document.getElementById('app-badge-icon');

  // Rich metadata content dictionary for snappy tab switching
  const appData = {
    'cubiertas-metalicas': {
      title: 'Cubiertas metálicas',
      desc: 'Zinc, fierro galvanizado y galpones industriales. Adherencia directa sin demolición previa, sellado de tornillos y traslapes.',
      checklist: [
        'Sin demolición previa',
        'Aplicación monocapa',
        'Garantía técnica por escrito'
      ],
      mainImg: 'assets/app-industrial-DSK0ECAZ.jpg',
      subImg: 'assets/app-corrugated-DirBU1kB.jpg',
      iconSvg: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 16h.01M16 16h.01M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM8 16h.01"></path>
                </svg>`
    },
    'concreto-losas': {
      title: 'Concreto y losas',
      desc: 'Losas de concreto, estacionamientos públicos y terrazas residenciales. Sellado de microfisuras, juntas de dilatación y detención absoluta de filtraciones por capilaridad.',
      checklist: [
        'Impermeabilización continua 100%',
        'Transitabilidad peatonal media',
        'Apta para agua estancada indefinida'
      ],
      mainImg: 'assets/hero-roller-gDxJmXxD.jpg', // visually matches concrete structure roller application
      subImg: 'assets/app-corrugated-DirBU1kB.jpg',
      iconSvg: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 12h4M10 8h4M14 21v-3a2 2 0 0 0-4 0v3M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                </svg>`
    },
    'membranas-asfalticas': {
      title: 'Membranas asfálticas',
      desc: 'Renovación integral de membranas asfálticas envejecidas o agrietadas. Aplicación directa sobre el sustrato existente, evitando el costoso retiro, demolición y desecho de materiales pesados.',
      checklist: [
        'Cero retiro de escombros costosos',
        'Refuerzo en puntos críticos de desagüe',
        'Mayor reflectividad solar térmica (Cool Roof)'
      ],
      mainImg: 'assets/app-industrial-DSK0ECAZ.jpg',
      subImg: 'assets/hero-roller-gDxJmXxD.jpg',
      iconSvg: `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12.83 2.18-8.58 3.9a2 2 0 0 0 0 3.66l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a2 2 0 0 0 0-3.66l-8.58-3.9a2 2 0 0 0-1.66 0Z"></path>
                  <path d="m2 12 8.58 3.9a2 2 0 0 0 1.66 0L20.82 12M2 17l8.58 3.9a2 2 0 0 0 1.66 0L20.82 17"></path>
                </svg>`
    }
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states on tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.getAttribute('data-target');
      const data = appData[target];
      
      if (data) {
        // Trigger elegant fade and slide effect
        appDetailsCard.style.opacity = '0';
        appDetailsCard.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          // Update texts
          appTitle.innerText = data.title;
          appDesc.innerText = data.desc;
          appBadgeIcon.innerHTML = data.iconSvg;
          
          // Update checklist items
          appChecklist.innerHTML = '';
          data.checklist.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="accent-text">✓</span> ${item}`;
            appChecklist.appendChild(li);
          });
          
          // Update image sources
          appMainImg.src = data.mainImg;
          appSubImg.src = data.subImg;
          
          // Re-render display card details with smooth animations
          appDetailsCard.style.opacity = '1';
          appDetailsCard.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });


  /* ==========================================================================
     5. Snappy Stepper Cotizador logic
     ========================================================================== */
  let currentStep = 1;
  const totalSteps = 4;
  
  // Cotizador Data Object
  const cotizadorData = {
    superficie: '',
    area: 150,
    problemas: [],
    nombre: '',
    email: '',
    telefono: ''
  };

  const stepHeaders = document.querySelectorAll('.step-header');
  const stepPanes = document.querySelectorAll('.step-pane');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const stepperNavBar = document.getElementById('stepper-nav-bar');

  // Surface Selector options
  const surfaceOptions = document.querySelectorAll('.surface-option');
  
  surfaceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      surfaceOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      cotizadorData.superficie = opt.getAttribute('data-value');
      validateCurrentStep(); // check if step is valid
    });
  });

  // Area range slider & input synchronizer
  const areaSlider = document.getElementById('area-slider');
  const areaNumber = document.getElementById('area-number');
  const rangeValue = document.getElementById('range-value');

  if (areaSlider && areaNumber && rangeValue) {
    // Slider inputs
    areaSlider.addEventListener('input', () => {
      areaNumber.value = areaSlider.value;
      rangeValue.innerText = areaSlider.value;
      cotizadorData.area = parseInt(areaSlider.value);
    });
    
    // Manual number input
    areaNumber.addEventListener('input', () => {
      let val = parseInt(areaNumber.value);
      if (isNaN(val) || val < 30) val = 30;
      if (val > 10000) val = 10000;
      
      areaSlider.value = val;
      rangeValue.innerText = val;
      cotizadorData.area = val;
    });
  }

  // Check step validation to toggle disable state on "Next"
  function validateCurrentStep() {
    let isValid = false;
    
    if (currentStep === 1) {
      // Step 1: Valid if surface is selected
      if (cotizadorData.superficie !== '') {
        isValid = true;
      }
    } else if (currentStep === 2) {
      // Step 2: Area is always valid as it defaults to 150
      isValid = true;
    } else if (currentStep === 3) {
      // Step 3: Issues checkboxes (0 or more selected are valid)
      isValid = true;
    } else if (currentStep === 4) {
      // Step 4: Contact details verification
      const name = document.getElementById('calc-name').value.trim();
      const email = document.getElementById('calc-email').value.trim();
      const phone = document.getElementById('calc-phone').value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (name.length > 2 && emailRegex.test(email) && phone.length > 6) {
        isValid = true;
      }
    }
    
    btnNext.disabled = !isValid;
  }

  // Listen to step 4 keypresses to trigger live validation
  const contactInputs = document.querySelectorAll('.pane-form input');
  contactInputs.forEach(input => {
    input.addEventListener('input', validateCurrentStep);
  });

  // Navigate to target step pane
  function goToStep(step) {
    if (step < 1 || step > totalSteps + 1) return;
    
    // Hide active step panes
    stepPanes.forEach(pane => {
      pane.classList.remove('active');
    });
    
    // Update Stepper Headers Indicators
    stepHeaders.forEach(header => {
      const stepIdx = parseInt(header.getAttribute('data-step'));
      header.classList.remove('active', 'completed');
      
      if (stepIdx === step) {
        header.classList.add('active');
      } else if (stepIdx < step) {
        header.classList.add('completed');
      }
    });

    currentStep = step;
    
    // Handle specific pane displays
    if (step <= totalSteps) {
      const activePane = document.getElementById(`pane-${step}`);
      if (activePane) activePane.classList.add('active');
      
      // Update Stepper Navbar button states
      btnPrev.disabled = (currentStep === 1);
      btnNext.innerHTML = (currentStep === totalSteps) ? 
        'Cotizar Proyecto <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : 
        'Siguiente <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>';
      
      validateCurrentStep();
    } else {
      // Success pane reached!
      const successPane = document.getElementById('pane-success');
      if (successPane) successPane.classList.add('active');
      
      // Hide stepper navigation bar on success
      if (stepperNavBar) stepperNavBar.style.display = 'none';
    }
  }

  // Navigation button listeners
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep === totalSteps) {
        // Collect checkbox list before finishing
        const checkboxes = document.querySelectorAll('input[name="problemas"]:checked');
        cotizadorData.problemas = Array.from(checkboxes).map(cb => cb.value);
        
        cotizadorData.nombre = document.getElementById('calc-name').value.trim();
        cotizadorData.email = document.getElementById('calc-email').value.trim();
        cotizadorData.telefono = document.getElementById('calc-phone').value.trim();
        
        console.log('Sending Cotizador diagnostic package:', cotizadorData);
        goToStep(totalSteps + 1); // show success pane
      } else {
        goToStep(currentStep + 1);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  }

  // Stepper Reset Button
  const btnReset = document.getElementById('btn-calc-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      // Clear data object
      cotizadorData.superficie = '';
      cotizadorData.area = 150;
      cotizadorData.problemas = [];
      cotizadorData.nombre = '';
      cotizadorData.email = '';
      cotizadorData.telefono = '';
      
      // Reset DOM options
      surfaceOptions.forEach(o => o.classList.remove('selected'));
      areaSlider.value = 150;
      areaNumber.value = 150;
      rangeValue.innerText = 150;
      
      const checkboxes = document.querySelectorAll('input[name="problemas"]:checked');
      checkboxes.forEach(cb => cb.checked = false);
      
      document.getElementById('calc-name').value = '';
      document.getElementById('calc-email').value = '';
      document.getElementById('calc-phone').value = '';
      
      // Show Stepper Nav bar again
      if (stepperNavBar) stepperNavBar.style.display = 'flex';
      
      // Return to Step 1
      goToStep(1);
    });
  }


  /* ==========================================================================
     6. Traditional Message Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('msg-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const dataPackage = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        mensaje: formData.get('mensaje')
      };
      
      console.log('Sending Message Package:', dataPackage);
      
      // Direct high-fidelity alert response
      alert('¡Muchas gracias por su mensaje! Su solicitud ha sido enviada con éxito. Un consultor técnico de SERVIGRAM lo contactará a la brevedad.');
      contactForm.reset();
    });
  }


  /* ==========================================================================
     7. Scroll to Top Floating Button behavior
     ========================================================================== */
  const scrollTopBtn = document.querySelector('.scroll-to-top');

  function handleScrollTopBtnVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', handleScrollTopBtnVisibility);
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    handleScrollTopBtnVisibility(); // Initial check
  }

});
