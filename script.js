// Script para el año actual
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        // Lógica para el menú hamburguesa
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth scroll y cierre de menú móvil
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (mobileMenu && !mobileMenu.classList.contains('hidden') && this.classList.contains('mobile-menu-link')) {
                    mobileMenu.classList.add('hidden');
                }
                if (targetId.length > 1 && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight || 70;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                }
            });
        });

        // Inicialización de Swiper para el carrusel de productos
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }
        });

        // Lógica del Modal Configurador
        const modal = document.getElementById('configuratorModal');
        const openBtn = document.getElementById('openConfiguratorBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        const getRecommendationBtn = document.getElementById('getRecommendationBtn');

        if (openBtn) {
            openBtn.onclick = function() {
                if(modal) modal.style.display = "block";
            }
        }
        if(closeBtn) {
            closeBtn.onclick = function() {
                if(modal) modal.style.display = "none";
            }
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                if(modal) modal.style.display = "none";
            }
        }
        
        // El resto del script para Gemini y para resaltar el nav activo se mantiene igual
        // Lógica para resaltar enlace activo en NAV
        const sections = document.querySelectorAll("section[id]");
        const allNavLinks = document.querySelectorAll(".nav-item-link"); 
        const headerElement = document.querySelector("header");
        let headerHeight = headerElement ? headerElement.offsetHeight : 70;

        function updateActiveNavLink() {
            let currentSectionId = "";
            if (sections.length === 0) return;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - headerHeight - 100) {
                    currentSectionId = section.getAttribute("id");
                }
            });
            if (!currentSectionId && sections.length > 0 && sections[0].id === 'inicio' && window.scrollY < sections[0].offsetTop) {
                 currentSectionId = 'inicio';
            }
            allNavLinks.forEach(link => {
                link.classList.remove('active-nav-link');
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.substring(1) === currentSectionId) {
                    link.classList.add('active-nav-link');
                }
            });
        }
        window.addEventListener('scroll', updateActiveNavLink);
        window.addEventListener('load', updateActiveNavLink);