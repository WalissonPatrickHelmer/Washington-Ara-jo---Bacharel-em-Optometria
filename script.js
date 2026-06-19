/*
   ==========================================================================
   COMPORTAMENTOS E INTERAÇÕES - LANDING PAGE Washington Araújo
   Bacharel em Optometria | 26 Anos de Experiência
   ==========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. EFEITO DE STICKY HEADER (SCROLL)
    // ==========================================
    const header = document.getElementById('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Executa no carregamento e ao rolar a página
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ==========================================
    // 2. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre e fecha o menu clicando no botão hambúrguer
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Previne scroll do body quando menu estiver aberto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fecha o menu ao clicar em qualquer link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ==========================================
    // 3. ROLAGEM SUAVE COM COMPENSAÇÃO DE HEADER
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora links vazios ou apenas "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcula altura do header para compensar no posicionamento final do scroll
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 4. CONFIGURAÇÃO DE DIRECIONAMENTO DE CTAS (WHATSAPP E INSTAGRAM)
    // ==========================================
    
    // Contato do Profissional
    const whatsappPhone = '5531984930018';
    const instagramUrl = 'https://www.instagram.com/washington_optometrista/';

    // Mensagens personalizadas
    const messagePatient = 'Olá Washington, vi seu site e gostaria de saber os locais e datas disponíveis para atendimento.';
    const messagePartner = 'Olá Washington, tenho uma ótica e gostaria de conversar sobre uma parceria de atendimento.';

    // Função auxiliar para abrir o WhatsApp
    const openWhatsApp = (message) => {
        const encodedText = encodeURIComponent(message);
        const url = `https://wa.me/${whatsappPhone}?text=${encodedText}`;
        window.open(url, '_blank');
    };

    // Botões para Pacientes (CTAs de Consulta)
    const patientButtons = document.querySelectorAll('.btn-paciente');
    patientButtons.forEach(button => {
        button.addEventListener('click', () => {
            openWhatsApp(messagePatient);
        });
    });

    // Botões para Óticas Parceiras (B2B)
    const partnerButtons = document.querySelectorAll('.btn-parceiro');
    partnerButtons.forEach(button => {
        button.addEventListener('click', () => {
            openWhatsApp(messagePartner);
        });
    });

    // Botões para Instagram (Feed e Perfil)
    const instagramButtons = document.querySelectorAll('.btn-instagram');
    instagramButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.open(instagramUrl, '_blank');
        });
    });

    // ==========================================
    // 5. ANIMAÇÕES DE REVELAR AO ROLAR (SCROLL REVEAL)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    // Inicializa a API Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na janela do navegador
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Remove o observer do elemento após animado para melhorar performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,          // Usa o viewport do navegador
        threshold: 0.15,     // Aciona quando 15% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem na parte inferior para acionar um pouco antes de entrar totalmente
    });

    // Registra cada elemento no observador
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
