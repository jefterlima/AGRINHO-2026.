// Aguarda o carregamento completo do DOM para garantir estabilidade na execução
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenuMobile();
    inicializarLinksAtivos();
    inicializarAnimacaoScroll();
    inicializarQuizInterativo();
    inicializarValidacaoFormulario();
});

/**
 * 1. CONTROLE DO MENU RESPONSIVO (INTERATIVIDADE)
 * Gerencia a abertura e fechamento do menu hamburguer em dispositivos móveis.
 */
function inicializarMenuMobile() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const menuNavegacao = document.querySelector(".nav-menu");

    if (botaoMenu && menuNavegacao) {
        botaoMenu.addEventListener("click", () => {
            menuNavegacao.classList.toggle("menu-ativo");
            
            // Define o estado de acessibilidade do botão para leitores de tela
            const estaAberto = menuNavegacao.classList.contains("menu-ativo");
            botaoMenu.setAttribute("aria-expanded", estaAberto);
            
            // Altera visualmente o caractere do botão conforme o estado
            botaoMenu.innerHTML = estaAberto ? "✕" : "☰";
        });

        // Fecha o menu automaticamente quando o usuário clica em um link de ancoragem
        const linksMenu = menuNavegacao.querySelectorAll("a");
        linksMenu.forEach(link => {
            link.addEventListener("click", () => {
                menuNavegacao.classList.remove("menu-ativo");
                botaoMenu.innerHTML = "☰";
                botaoMenu.setAttribute("aria-expanded", "false");
            });
        });
    }
}

/**
 * 2. MARCADOR DE LINK ATIVO (EXPERIÊNCIA DO USUÁRIO)
 * Identifica a seção visível na tela e adiciona a classe .active no item do menu correspondente.
 */
function inicializarLinksAtivos() {
    const secoes = document.querySelectorAll("section, header");
    const linksNav = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {
        let secaoAtualId = "";
        const topoPagina = window.scrollY + 100; // Deslocamento para compensar o menu fixo

        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop;
            const alturaSecao = secao.offsetHeight;

            if (topoPagina >= topoSecao && topoPagina < topoSecao + alturaSecao) {
                secaoAtualId = secao.getAttribute("id");
            }
        });

        linksNav.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${secaoAtualId}`) {
                link.classList.add("active");
            }
        });
    });
}

/**
 * 3. ANIMAÇÃO DE SURGIMENTO AO ROLAR A PÁGINA (COMPORTAMENTO DINÂMICO)
 * Utiliza a API IntersectionObserver para disparar efeitos visuais do CSS com alta performance.
 */
function inicializarAnimacaoScroll() {
    // Seleciona componentes-chave para receberem o efeito de fade-in estruturado
    const elementosParaAnimar = document.querySelectorAll(".card, .interactive-box, .split-text, .split-image");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("elemento-visivel");
                observador.unobserve(entrada.target); // Desativa observação pós-exibição para economizar hardware
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px" // Dispara levemente antes do elemento surgir por completo
    });

    elementosParaAnimar.forEach(elemento => {
        elemento.classList.add("animar-scroll"); // Garante que a classe base do CSS seja injetada
        observador.observe(elemento);
    });
}

/**
 * 4. CAIXA INTERATIVA DO QUIZ (FUNCIONALIDADE INTELIGENTE)
 * Processa as respostas do quiz sobre sustentabilidade em tempo real.
 */
function inicializarQuizInterativo() {
    const opcoesQuiz = document.querySelectorAll(".quiz-option");

    opcoesQuiz.forEach(opcao => {
        opcao.addEventListener("click", function() {
            const containerQuiz = this.parentElement;
            
            // Bloqueia interações adicionais caso a pergunta já tenha sido respondida
            if (containerQuiz.classList.contains("respondido")) return;
            containerQuiz.classList.add("respondido");

            const ehCorreta = this.getAttribute("data-correto") === "true";

            if (ehCorreta) {
                this.style.backgroundColor = "var(--primary)";
                this.style.color = "var(--white)";
                this.style.borderColor = "var(--primary)";
                this.innerHTML += " ✓ (Correto!)";
            } else {
                this.style.backgroundColor = "var(--danger)";
                this.style.color = "var(--white)";
                this.style.borderColor = "var(--danger)";
                this.innerHTML += " ✕ (Incorreto)";

                // Destaca automaticamente a alternativa certa para fins pedagógicos
                const alternativaCorreta = containerQuiz.querySelector("[data-correto='true']");
                if (alternativaCorreta) {
                    alternativaCorreta.style.backgroundColor = "var(--secondary)";
                    alternativaCorreta.style.color = "var(--white)";
                }
            }
        });
    });
}

/**
 * 5. VALIDAÇÃO INTELIGENTE DE FORMULÁRIO
 * Analisa os campos antes do envio, prevenindo submissões vazias ou inválidas.
 */
function inicializarValidacaoFormulario() {
    const formulario = document.querySelector("#form-agrinho") || document.querySelector("form");

    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Bloqueia o recarregamento padrão da página

        const camposInput = formulario.querySelectorAll("input, textarea, select");
        let formularioValido = true;

        camposInput.forEach(campo => {
            limparErroCampo(campo);

            // Validação de campos obrigatórios vazios
            if (campo.hasAttribute("required") && !campo.value.trim()) {
                exibirErroCampo(campo, "Este campo é obrigatório.");
                formularioValido = false;
            }
            // Validação estrutural para strings de e-mail
            else if (campo.type === "email" && campo.value.trim() !== "") {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexEmail.test(campo.value)) {
                    exibirErroCampo(campo, "Insira um endereço de e-mail válido.");
                    formularioValido = false;
                }
            }
        });

        if (formularioValido) {
            const botaoEnvio = formulario.querySelector("button[type='submit']");
            if (botaoEnvio) {
                const textoOriginal = botaoEnvio.textContent;
                botaoEnvio.textContent = "Enviando inscrição...";
                botaoEnvio.disabled = true;

                // Simula um delay de processamento antes de limpar a tela
                setTimeout(() => {
                    alert("Inscrição para o Agrinho 2026 processada com sucesso!");
                    formulario.reset();
                    botaoEnvio.textContent = textoOriginal;
                    botaoEnvio.disabled = false;
                }, 1500);
            }
        }
    });
}

/**
 * FUNÇÕES AUXILIARES PARA GERENCIAMENTO DE ERROS VISUAIS
 */
function exibirErroCampo(campo, mensagem) {
    campo.classList.add("input-erro");
    
    const grupoForm = campo.closest(".form-group") || campo.parentElement;
    let containerErro = grupoForm.querySelector(".mensagem-erro");
    
    if (!containerErro) {
        containerErro = document.createElement("span");
        containerErro.className = "mensagem-erro";
        grupoForm.appendChild(containerErro);
    }
    containerErro.textContent = mensagem;
}

function limparErroCampo(campo) {
    campo.classList.remove("input-erro");
    
    const grupoForm = campo.closest(".form-group") || campo.parentElement;
    const containerErro = grupoForm.querySelector(".mensagem-erro");
    if (containerErro) {
        containerErro.remove();
    }
}
