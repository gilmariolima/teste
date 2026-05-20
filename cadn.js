// ==UserScript==
// @name GILMARIO - CADASTRAR (Valor da Reserva)
// @namespace http://tampermonkey.net/
// @version 2026-05-17.1
// @description Script com interface moderna exibindo o valor da reserva com novas regras de remoção de acentos e preservação/corte de Ç.
// @author GILMARIO
// @match https://prod-guanabara-frontoffice-smartbus.smarttravelit.com/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        #btn-dados {
            position: fixed;
            bottom: 20px;
            right: 450px;
            z-index: 9999;
            padding: 12px 25px;
            background-color: darkred;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-family: sans-serif;
            border: 1px solid rgba(0,0,0,0.3);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        #btn-dados:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
            filter: brightness(1.2);
        }

        #btn-dados:active {
            transform: scale(0.95);
        }

        #balao-dados {
            position: fixed;
            display: flex;
            gap: 10px;
            flex-direction: column;
            bottom: 85px;
            right: 400px;
            background: rgba(139, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            color: white;
            padding: 20px;
            border-radius: 12px;
            z-index: 9999;
            font-size: 14px;
            font-family: sans-serif;
            border: 1px solid rgba(255,255,255,0.2);
            min-width: 250px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .item-clicavel {
            border: 1px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.05);
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            word-break: break-all;
            font-weight: 500;
        }

        .item-clicavel:hover {
            background: rgba(255,255,255,0.15);
            border-color: rgba(255,255,255,0.5);
            padding-left: 15px;
        }

        .item-clicavel:active {
            background: rgba(255,255,255,0.3);
        }

        #fechar-balao:hover {
            color: #ffcccc !important;
            transform: scale(1.2);
        }

        .valor-reserva-display {
            font-size: 14px;
            font-weight: bold;
            color: #ffcc00; /* Cor amarelada para destaque */
            letter-spacing: 0.5px;
        }
    `;
    document.head.appendChild(style);

    // Remove todos os acentos, mas garante que o Ç / ç NÃO seja removido
    function removerAcentosManterCedilha(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Regra específica para o primeiro clique (Copia até a letra anterior ao Ç)
    function tratarPrimeiroCliqueNome(nomeOriginal) {
        const nomeSemAcentos = removerAcentosManterCedilha(nomeOriginal);
        const indexCedilha = nomeSemAcentos.search(/[Çç]/);

        if (indexCedilha !== -1) {
            return nomeSemAcentos.substring(0, indexCedilha);
        }
        return nomeSemAcentos;
    }

    // Função para capitalizar a primeira letra de cada palavra (Mantendo tal e qual a acentuação para exibição)
    function capitalizarNome(texto) {
        return texto
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ');
    }

    function copiarComFeedback(elemento, texto) {
        // Remove acentos normais mantendo o Ç ao clicar individualmente nos itens do balão
        const textoProcessado = removerAcentosManterCedilha(texto);

        navigator.clipboard.writeText(textoProcessado).then(() => {
            const originalBg = elemento.style.background;
            elemento.style.background = "rgba(255, 255, 255, 0.4)";
            setTimeout(() => {
                elemento.style.background = originalBg;
            }, 200);
        });
    }

    function criarBotao() {
        if (document.getElementById('btn-dados')) return;

        const botao = document.createElement('button');
        botao.id = 'btn-dados';
        botao.textContent = 'CADASTRAR';

        botao.addEventListener('click', () => {
            const balaoExistente = document.getElementById("balao-dados");

            // Captura dos dados originais
            let tel = document.querySelectorAll(".card-coupon-area")[1]?.querySelectorAll("td")[4]?.textContent || "";
            let nomePassageiro = document.querySelectorAll(".card-coupon-area")[1]?.querySelectorAll("td")[1]?.textContent || "";
            let localizador = document.querySelectorAll(".coupon-summary-value")[1]?.textContent || "";

            // Captura do valor da reserva
            let valorReserva = document.querySelector(".lbl-payment-details-value.orange")?.textContent || "VALOR NÃO ENCONTRADO";

            if (document.querySelectorAll(".coupon-issuer-info").length === 2 &&
                document.querySelectorAll(".coupon-issuer-info")[1].querySelectorAll("label")[4]?.textContent === "Telefone") {
                tel = document.querySelectorAll(".coupon-issuer-info")[1].querySelectorAll(".lbl-value")[2]?.textContent || tel;
            }

            // Tratamento inicial das Strings e capitalização para exibição visual
            tel = tel.trim();
            nomePassageiro = capitalizarNome(nomePassageiro);
            localizador = localizador.trim();

            if (!balaoExistente) {
                // PRIMEIRO CLIQUE: Lógica especial de corte caso o nome possua Ç / ç
                const nomeCorteDiscreto = tratarPrimeiroCliqueNome(nomePassageiro);
                navigator.clipboard.writeText(nomeCorteDiscreto);
            } else {
                // CLIQUE SUBSEQUENTE (Copia tudo): Remove acentos mantendo Ç
                const textoTudo = `${nomePassageiro}\n${tel}\n${localizador}`;
                const textoSemAcento = removerAcentosManterCedilha(textoTudo);

                navigator.clipboard.writeText(textoSemAcento).then(() => {
                    const originalColor = "darkred";
                    botao.style.backgroundColor = "#28a745";
                    botao.textContent = "COPIADO TUDO";
                    setTimeout(() => {
                        botao.style.backgroundColor = originalColor;
                        botao.textContent = "CADASTRAR";
                    }, 1500);
                });
            }

            if (!balaoExistente) {
                const msg = document.createElement('div');
                msg.id = "balao-dados";

                // O conteúdo do balão exibe o nome idêntico à reserva (sem cortes visuais)
                msg.innerHTML = `
                    <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span class="valor-reserva-display">VALOR: ${valorReserva}</span>
                        <button id="fechar-balao" style="background:none; border:none; color:white; cursor:pointer; font-weight:bold; font-size: 16px; transition: 0.2s;">✕</button>
                    </div>
                    <div id="copy-nome" class="item-clicavel">${nomePassageiro}</div>
                    <div id="copy-tel" class="item-clicavel">${tel}</div>
                    <div id="copy-loc" class="item-clicavel">${localizador}</div>
                `;

                document.body.appendChild(msg);

                document.getElementById('copy-nome').addEventListener('click', function() { copiarComFeedback(this, nomePassageiro); });
                document.getElementById('copy-tel').addEventListener('click', function() { copiarComFeedback(this, tel); });
                document.getElementById('copy-loc').addEventListener('click', function() { copiarComFeedback(this, localizador); });
                document.getElementById('fechar-balao').addEventListener('click', () => msg.remove());
            }
        });

        document.body.appendChild(botao);
    }

    function removerBotao() {
        document.getElementById('btn-dados')?.remove();
        document.getElementById('balao-dados')?.remove();
    }

    function verificarTitulo() {
        const titulo = document.querySelector('.page-title')?.textContent?.trim();
        if (titulo === 'Reserva') {
            criarBotao();
        } else {
            removerBotao();
        }
    }

    const observer = new MutationObserver(() => verificarTitulo());
    observer.observe(document.body, { childList: true, subtree: true });

    // Execução inicial
    verificarTitulo();
})();
