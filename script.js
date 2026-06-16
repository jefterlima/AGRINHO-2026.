document.addEventListener("DOMContentLoaded", () => {
    configurarMenuMobile();
    configurarScrollRevelacao();
    configurarCalculadoraAgua();
    configurarQuizSustentavel();
});

// 1. Menu Responsivo para Smartphones
function configurarMenuMobile() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const menuNav = document.querySelector(".nav-menu");

    if (botaoMenu && menuNav) {
        botaoMenu.addEventListener("click", () => {
            menuNav.classList.toggle("menu-ativo");
            const aberto = menuNav.classList.contains("menu-ativo");
            botaoMenu.innerHTML = aberto ? "✕" : "☰";
        });
    }
}

// 2. Animação de Entrada ao Rolar a Página (Scroll Reveal)
function configurarScrollRevelacao() {
    const blocosMapeados = document.querySelectorAll(".card, .split-text, .split-image, .interactive-box");
    
    const visualizador = new IntersectionObserver((elementos) => {
        elementos.forEach(item => {
            if (item.isIntersecting) {
                item.target.classList.add("elemento-visivel");
                visualizador.unobserve(item.target);
            }
        });
    }, { threshold: 0.15 });

    blocosMapeados.forEach(bloco => {
        bloco.classList.add("animar-scroll");
        visualizador.observe(bloco);
    });
}

// 3. Lógica da Calculadora Ecológica
function configurarCalculadoraAgua() {
    const botaoCalcular = document.querySelector("#btn-calcular");
    const entradaHectares = document.querySelector("#hectares");
    const containerResultado = document.querySelector("#resultado-calculo");

    if (botaoCalcular && entradaHectares && containerResultado) {
        botaoCalcular.addEventListener("click", () => {
            const valorHectares = parseFloat(entradaHectares.value);

            if (isNaN(valorHectares) || valorHectares <= 0) {
                containerResultado.innerHTML = "Por favor, digite um número válido de hectares.";
                containerResultado.style.color = "var(--danger)";
                return;
            }

            // Média hipotética de economia: 25.000 litros de água por hectare/ano com manejo otimizado
            const litrosEconomizados = valorHectares * 25000;
            
            containerResultado.style.color = "var(--primary-dark)";
            containerResultado.innerHTML = `🌟 Incrível! Sua propriedade economizaria aproximadamente ${litrosEconomizados.toLocaleString('pt-BR')} litros de água por ano utilizando gotejamento e sensores inteligentes!`;
        });
    }
}

// 4. Lógica Interativa do Quiz Pedagógico
function configurarQuizSustentavel() {
    const alternativas = document.querySelectorAll(".quiz-option");

    alternativas.forEach(opcao => {
        opcao.addEventListener("click", function() {
            const caixaPai = this.parentElement;
            
            if (caixaPai.classList.contains("bloqueado")) return;
            caixaPai.classList.add("bloqueado"); // Evita que clique em mais de uma alternativa

            const respostaVerdadeira = this.getAttribute("data-correto") === "true";

            if (respostaVerdadeira) {
                this.style.backgroundColor = "var(--primary)";
                this.style.color = "var(--white)";
                this.innerHTML += " ✨ (Resposta Correta! O plantio direto evita o impacto direto da chuva).";
            } else {
                this.style.backgroundColor = "var(--danger)";
                this.style.color = "var(--white)";
                this.innerHTML += " ✕ (Incorreto).";

                // Mostra a alternativa correta em verde para ensinar o estudante
                const corretaOriginal = caixaPai.querySelector("[data-correto='true']");
                if (corretaOriginal) {
                    corretaOriginal.style.backgroundColor = "var(--secondary)";
                    corretaOriginal.style.color = "var(--white)";
                }
            }
        });
    });
}
