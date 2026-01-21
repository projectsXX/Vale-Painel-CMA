
// src/js/Contatos.js
/**
 * Escolher entre Ligar (OK) ou WhatsApp (Cancelar).
 * @param {string} numero - Número no formato "+55DDDXXXXXXXX" ou com caracteres diversos (serão limpos).
 */
function escolherContato(numero) {
  try {
    const ligar = confirm("Como deseja entrar em contato?\n\nOK = Ligar\nCancelar = WhatsApp");
    const numeroLimpo = String(numero).replace(/\D/g, ''); // mantém só dígitos
    if (!numeroLimpo) return;
    if (ligar) {
      // Liga direto (mobile abre discador; desktop tenta app de chamadas)
      window.location.href = `tel:${numeroLimpo}`;
    } else {
      // Abre conversa no WhatsApp (web ou app)
      const mensagem = encodeURIComponent("Olá, preciso de suporte.");
      window.open(`https://wa.me/${numeroLimpo}?text=${mensagem}`, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.error('Erro em escolherContato:', err);
  }
}

/**
 * Escolher entre abrir no Teams (OK) ou enviar E‑mail (Cancelar).
 * @param {string} email - E-mail do contato.
 */
function escolherCanalEmail(email) {
  try {
    const abrirNoTeams = confirm("Como deseja entrar em contato?\n\nOK = Teams\nCancelar = E‑mail");
    const emailLimpo = String(email).trim();
    if (!emailLimpo) return;
    if (abrirNoTeams) {
      // Tenta abrir no app do Teams; se não abrir, cai para versão web
      const teamsUrlApp = `msteams://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(emailLimpo)}`;
      const teamsUrlWeb = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(emailLimpo)}`;
      const timer = setTimeout(() => {
        window.location.href = teamsUrlWeb;
      }, 500);
      // Tenta navegar direto para o app
      window.location.href = teamsUrlApp;
      // Limpa o timer ao sair da página
      window.addEventListener('pagehide', () => clearTimeout(timer));
    } else {
      // Abre cliente de e-mail padrão com assunto/corpo
      const assunto = encodeURIComponent('Assunto');
      const corpo = encodeURIComponent('Olá, tudo bem?');
      window.location.href = `mailto:${emailLimpo}?subject=${assunto}&body=${corpo}`;
    }
  } catch (err) {
    console.error('Erro em escolherCanalEmail:', err);
  }
}

/**
 * Escolher entre Ligar (OK) ou Acessar Site (Cancelar).
 * Use em <a onclick="escolherLigarOuSite('08007102073', 'https://vale.service-now.com/sp')">
 *
 * @param {string} numero - Número para ligação. Pode conter caracteres diversos; serão limpos para dígitos.
 * @param {string} url - URL do site para abrir (ex.: "https://vale.service-now.com/sp").
 */
function escolherLigarOuSite(numero, url) {
  try {
    const ligar = confirm("Como deseja prosseguir?\n\nOK = Ligar\nCancelar = Acessar o site");
    const numeroLimpo = String(numero).replace(/\D/g, '');
    const urlDestino = String(url).trim();
    if (ligar) {
      if (!numeroLimpo) return;
      // Liga direto
      window.location.href = `tel:${numeroLimpo}`;
    } else {
      if (!urlDestino) return;
      // Abre o site em nova aba com segurança
      window.open(urlDestino, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.error('Erro em escolherLigarOuSite:', err);
  }
}

/**
 * Escolher entre Ligar (OK) ou enviar E‑mail (Cancelar).
 * @param {string} email - E-mail do contato (ex.: "support@mmsi.zendesk.com").
 * @param {string} numero - Número de telefone (pode estar com +55 e caracteres; será sanitizado).
 */
function escolherLigarOuEmail(email, numero) {
  try {
    const ligar = confirm("Como deseja entrar em contato?\n\nOK = Ligar\nCancelar = E‑mail");
    const emailLimpo = String(email).trim();
    const numeroLimpo = String(numero).replace(/\D/g, ''); // mantém só dígitos
    if (ligar) {
      if (!numeroLimpo) return;
      // Abre discador (mobile) ou app de chamadas (desktop)
      window.location.href = `tel:${numeroLimpo}`;
    } else {
      if (!emailLimpo) return;
      // Abre cliente de e-mail padrão (assunto/corpo podem ser ajustados)
      const assunto = encodeURIComponent('Suporte');
      const corpo = encodeURIComponent('Olá, preciso de suporte.');
      window.location.href = `mailto:${emailLimpo}?subject=${assunto}&body=${corpo}`;
    }
  } catch (err) {
    console.error('Erro em escolherLigarOuEmail:', err);
  }
}

/**
 * Escolher entre Ligar (OK) ou abrir chat no Teams (Cancelar).
 * @param {string} numero - Telefone do contato (ex.: "+5531996464301" ou "31 99646-4301").
 * @param {string} email - E-mail do contato (usado para abrir o chat no Teams).
 */
function escolherLigarOuTeams(numero, email) {
  try {
    const ligar = confirm("Como deseja entrar em contato?\n\nOK = Ligar\nCancelar = Teams");
    // Sanitiza entradas
    const numeroLimpo = String(numero).replace(/\D/g, ''); // apenas dígitos
    const emailLimpo = String(email).trim();
    if (ligar) {
      // Liga direto (mobile abre discador; desktop tenta app de chamadas)
      if (!numeroLimpo) return;
      window.location.href = `tel:${numeroLimpo}`;
      return;
    }
    // Abrir chat direto no Teams
    if (!emailLimpo) return;
    // Deep link do Teams — tenta app primeiro e faz fallback para web
    const teamsUrlApp = `msteams://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(emailLimpo)}`;
    const teamsUrlWeb = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(emailLimpo)}`;
    // Estratégia: tenta navegar para o app; se não rolar, em ~500ms cai para a versão web
    const timer = setTimeout(() => {
      window.open(teamsUrlWeb, '_blank', 'noopener,noreferrer');
    }, 500);
    // Navega para o app (alguns navegadores bloqueiam, por isso o fallback)
    window.location.href = teamsUrlApp;
    // Limpa timeout quando a página muda
    window.addEventListener('pagehide', () => clearTimeout(timer));
  } catch (err) {
    console.error('Erro em escolherLigarOuTeams:', err);
  }
}

/**
 * Escolher entre Ligar (OK) ou abrir um dos dois sites (Cancelar → submenu).
 * Uso:
 * escolherLigarOuSiteDuplo('08007102073',
 * 'https://vale.service-now.com/sp',
 * 'https://vale.service-now.com/sp?id=walkup_online_checkin');
 *
 * @param {string} numero - Telefone (pode ter separadores; será sanitizado).
 * @param {string} url1 - Primeiro site (ex.: portal principal).
 * @param {string} url2 - Segundo site (ex.: check-in).
 */
function escolherLigarOuSiteDuplo(numero, url1, url2) {
  try {
    const acao = confirm("Como deseja prosseguir?\n\nOK = Ligar\nCancelar = Acessar site");
    const numeroLimpo = String(numero).replace(/\D/g, '');
    const site1 = String(url1).trim();
    const site2 = String(url2).trim();
    if (acao) {
      // Ligar
      if (!numeroLimpo) return;
      window.location.href = `tel:${numeroLimpo}`;
      return;
    }
    // Pergunta qual dos dois sites abrir
    const escolhaSite = prompt(
      "Qual site deseja abrir?\n\n" +
      "1 = Portal ServiceNow\n" +
      "2 = Check-in (Walk-up)\n\n" +
      "Digite 1 ou 2:"
    );
    if (!escolhaSite) return;
    const opt = String(escolhaSite).trim();
    if (opt === '1' && site1) {
      window.open(site1, '_blank', 'noopener,noreferrer');
      return;
    }
    if (opt === '2' && site2) {
      window.open(site2, '_blank', 'noopener,noreferrer');
      return;
    }
    // Se digitou algo diferente de 1/2, não faz nada
  } catch (err) {
    console.error('Erro em escolherLigarOuSiteDuplo:', err);
  }
} // <- vírgula removida aqui
