<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agrinho 2026</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Cabeçalho e Menu Responsivo -->
    <header class="cabecalho">
        <div class="logo">Agrinho 2026</div>
        <button class="btn-menu" aria-expanded="false" aria-label="Abrir menu">☰</button>
        <nav class="menu-nav">
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#inscricao">Inscrição</a>
        </nav>
    </header>

    <main>
        <!-- Seção Banner com Animação -->
        <section id="sobre" class="banner animar-scroll">
            <h1>Inovação e Sustentabilidade no Campo</h1>
            <p>Conectando a educação ao futuro do agronegócio.</p>
        </section>

        <!-- Seção de Conteúdo com Animação -->
        <section id="projetos" class="conteudo animar-scroll">
            <h2>Nossos Pilares</h2>
            <div class="cards">
                <div class="card">Tecnologia Agrícola</div>
                <div class="card">Preservação Ambiental</div>
                <div class="card">Desenvolvimento Social</div>
            </div>
        </section>

        <!-- Seção do Formulário com Validação -->
        <section id="inscricao" class="formulario-secao animar-scroll">
            <h2>Participe do Agrinho 2026</h2>
            <form id="form-agrinho" class="formulario">
                <div class="grupo-form">
                    <label for="nome">Nome Completo:</label>
                    <input type="text" id="nome" placeholder="Digite seu nome">
                </div>
                <div class="grupo-form">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" placeholder="seu@email.com">
                </div>
                <button type="submit" class="btn-enviar">Enviar Inscrição</button>
            </form>
        </section>
    </main>

    <!-- Vinculação do arquivo Javascript -->
    <script src="script.js"></script>
</body>
</html>
/* Configurações Globais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f4f7f5;
    color: #333;
    line-height: 1.6;
}

/* Cabeçalho e Menu */
.cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5%;
    background-color: #2e7d32;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.btn-menu {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
}

.menu-nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    font-weight: 500;
    transition: color 0.3s;
}

.menu-nav a:hover {
    color: #a5d6a7;
}

/* Seções e Layout */
section {
    padding: 80px 5%;
    text-align: center;
}

.banner {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://picsum.photos') no-repeat center/cover;
    color: white;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.banner h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
}

.cards {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    flex-wrap: wrap;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex: 1;
    min-width: 250px;
    max-width: 350px;
}

/* Formulário e Validações */
.formulario-secao {
    background-color: #e8f5e9;
}

.formulario {
    max-width: 500px;
    margin: 30px auto 0 auto;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    text-align: left;
}

.grupo-form {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.grupo-form label {
    margin-bottom: 5px;
    font-weight: bold;
}

.grupo-form input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

/* Estilos de Erro gerados pelo JS */
.input-erro {
    border-color: #d32f2f !important;
    background-color: #ffebee;
}

.mensagem-erro {
    color: #d32f2f;
    font-size: 0.85rem;
    margin-top: 5px;
}

.btn-enviar {
    width: 100%;
    padding: 12px;
    background-color: #2e7d32;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
}

.btn-enviar:hover {
    background-color: #1b5e20;
}

/* Lógica de Animação de Scroll (CSS + JS) */
.animar-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.elemento-visivel {
    opacity: 1;
    transform: translateY(0);
}

/* Responsividade para Celulares */
@media (max-width: 768px) {
    .btn-menu {
        display: block;
    }

    .menu-nav {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: #2e7d32;
        padding: 20px;
        text-align: center;
    }

    .menu-nav a {
        margin: 15px 0;
    }

    .menu-ativo {
        display: flex;
    }
}
