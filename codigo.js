// =============================================================================
// HAXBALL MOBILE — InjecThor
// Vixel Dev 2024
// =============================================================================

// =============================================================================
// SETUP INICIAL — Frame, Body, Viewport
// =============================================================================

const gameFrame = document.querySelector(".gameframe").contentWindow;

let stylesheet = document.createElement("style");
gameFrame.document.head.appendChild(stylesheet);

let body = document.querySelector(".gameframe").contentWindow.document.body;

document
  .querySelector("meta[name=viewport]")
  .setAttribute(
    "content",
    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
  );

var metaTag = document.createElement("meta");
metaTag.setAttribute("http-equiv", "X-UA-Compatible");
metaTag.setAttribute("content", "ie=edge");
gameFrame.document.head.appendChild(metaTag);

// =============================================================================
// FLAGS DE FUNCIONALIDADES
// =============================================================================

const VIRTUAL_JOYSTICK   = true;
const JOYSTICK           = true;
const HIDE_HEADER        = true;
const ADBLOCK            = true;
const ROOM_SEARCH        = true;
const CLIPBOARD_ROOM     = true;
const STORE_BUTTON       = true;
const ROOM_ADMIN_SETTINGS = true;
const SHIRTS_BUTTON      = true;
const PASSWORD_BUTTON    = true;

// =============================================================================
// CSS CUSTOMIZADO
// =============================================================================

const CUSTOM_CSS = `
  .game-view > .top-section,
  .room-view { margin-top: 0 }

  .stats-view,
  [data-hook=ok] { text-transform: uppercase }

  * { user-select: none }

  body { background: #1a2125 }

  [data-hook=leave-btn] {
    background: #c13535 !important;
    margin-right: 6px
  }

  .inputrow,
  .roomlist-view > .dialog > .splitter > .buttons > .file-btn,
  .sound-button-container,
  [data-hook=rec-btn],
  [data-hook=tvideo-lowlatency],
  [data-hook=tvideo-showavatars],
  [data-hook=tvideo-showindicators],
  [data-hook=tvideo-teamcol],
  div.chatbox-view > div > div.input,
  div:has(> [data-hook=chatbgmode]),
  div:has(> [data-hook=chatfocusheight-range]),
  div:has(> [data-hook=chatopacity-range]) { display: none !important }

  div.chatbox-view > div > div.input { pointer-events: all }
  div.chatbox-view > div > div.input > input { overflow: hidden }

  .game-view > [data-hook=popups] { background-color: #1a212585 !important }

  h1 { border-bottom-color: #fec45b !important }

  .room-view {
    margin-bottom: 0;
    height: 100%
  }

  .room-view > .container {
    margin-top: auto !important;
    max-width: none;
    max-height: none;
    border-radius: 0;
    width: 100%;
    margin-bottom: 30px
  }

  .room-view > .container > .header-btns {
    bottom: 0;
    top: auto;
    display: flex;
    flex-flow: row-reverse;
    left: 10px;
    right: auto
  }

  [data-hook=stadium-pick] {
    position: fixed !important;
    background: 0 0 !important;
    color: transparent !important;
    width: 300px;
    height: 20px
  }

  [data-hook=stadium-name] { text-decoration: underline }

  .room-view > .container > .controls {
    display: flex;
    align-self: center;
    position: absolute;
    bottom: 0;
    right: 10px;
    top: auto;
    margin-bottom: 15px !important;
    z-index: 1;
    flex-flow: row-reverse
  }

  .settings-view {
    width: 100%;
    height: 100%;
    max-height: unset;
    border-radius: 0
  }

  .settings-view .tabcontents {
    width: 100%;
    text-align: -webkit-center
  }

  .settings-view .section.selected {
    display: flex;
    width: max-content
  }

  .choose-nickname-view { flex-direction: row-reverse }

  .fade-out {
    opacity: 0;
    transition: opacity 10s ease-out
  }

  .game-view > .bottom-section {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none
  }

  .roomlist-view > .dialog,
  .view-wrapper > .dialog {
    max-width: calc(100vw - 2vw);
    max-height: calc(100vh - 2vw)
  }

  .chatbox-view-contents > .drag,
  .graph,
  .showing-room-view > .gameplay-section { display: none }

  body > div > div > div.dialog > p:nth-child(2) { font-size: 0% }

  body > div > .roomlist-view > div.dialog > p:nth-child(2)::after {
    font-size: medium;
    content: "HaxBall Mobile is now Open-Source. Feel free to make and publish improvements to the developer community";
    font-weight: 700
  }

  .filters::after {
    content: "Vixel Dev 2024 - InjecThor";
    white-space: pre;
    font-style: italic
  }

  button[data-hook=shirt-btn]:after {
    content: "◑";
    font-size: 1.25em
  }

  button[data-hook=shirt-btn] {
    margin-right: 6px;
    margin-left: 6px
  }

  div.chatbox-view > div > div.log.subtle-thin-scrollbar > div > p {
    display: none;
    text-shadow: 1px 0 4px rgba(0,0,0,.66)
  }

  div.chatbox-view > div > div.log.subtle-thin-scrollbar > div > p:nth-last-child(-n+5) {
    opacity: 1;
    display: block;
    animation: 10s forwards fadeOut
  }

  .log > div > p:has(br) { display: none !important }

  @keyframes fadeOut {
    0%   { opacity: 1 }
    100% { opacity: 0; display: none }
  }

  .chatbox-view-contents {
    flex-direction: column-reverse;
    pointer-events: none;
    background: 0 0;
    height: 100vh;
    position: absolute;
    text-align: center;
    align-items: center;
    top: 30px;
    width: 100vw
  }

  .showing-room-view > .bottom-section > .chatbox-view > div { top: 0 !important }

  .chatbox-view-contents > .log { flex-direction: column }

  .chatbox-view {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 0 !important;
    overflow-y: visible
  }

  .log-contents {
    display: flex;
    flex-direction: column-reverse
  }

  .stats-view {
    left: 50%;
    bottom: 0;
    background-color: transparent;
    text-shadow: 1px 1px 1px #000, 0 1px 1px #000;
    padding: 8px;
    margin: 4px;
    line-height: 1.5em;
    position: absolute;
    text-align: center !important;
    opacity: .25;
    width: min-content;
    transform: translate(-50%, 0);
    pointer-events: all;
    display: flex;
    flex-direction: column-reverse
  }

  .chatbox-view-contents > .autocompletebox { position: relative }
`;

// =============================================================================
// LOGO CUSTOMIZADO
// =============================================================================

const CUSTOM_LOGO = {
  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' viewBox='0 0 2859 2858'%3E%3Cpath fill='%23eda242' d='M1249 0h124a139997 139997 0 0 1 548 550l2 120-1 3L1249 0Zm-143 26h2l788 789L816 1896 26 1106 1106 26Zm206 500c28 1 45 15 51 43l-11 357c-6 26-22 41-49 44a51 51 0 0 1-50-55l10-287-291 10c-31-3-49-20-51-51 2-27 16-43 43-49l348-12Zm-489 99c20-1 36 7 47 24l265 578c11 28 3 50-22 66-29 11-51 4-67-21L779 687c-4-34 11-55 44-62ZM587 920a52 52 0 0 1 50 43l-9 298 12 1c90-4 180-7 271-9 34-2 54 14 60 49-4 32-22 49-54 50l-338 12c-34-3-52-22-52-56l11-340c4-29 20-45 49-48ZM0 1371v-118l1-5 674 673a3825 3825 0 0 1-129-2L2 1376l-2-5Zm1543-36a5355 5355 0 0 1 61 63l-205 205h-3l-60-59v-2l207-207Zm206 202 170 172 2 4 2 210-1 207a13671 13671 0 0 1-175-176 23576 23576 0 0 1 2-417Zm-120 3 2 149-1 149-149-150 148-148Zm408 289 5 2 166 167 4 8v415l-172-171-3-7v-414Zm292 292 149 149-149 149v-298Zm231 233h3l60 61v2l-205 205h-2l-61-60v-3l205-205Zm299 261v2l-3 5-236 236h-7l-137-47c-3-3-4-7-3-10v-67c4-11 11-20 22-26l227-228c5-6 13-9 21-8h58c4-1 8 0 11 4l47 139Z'/%3E%3C/svg%3E",
  height: "100px",
};

// =============================================================================
// FONTE CUSTOMIZADA
// =============================================================================

const CUSTOM_FONT = {
  name: "Inter",
  type: "sans-serif",
  url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
};

// =============================================================================
// INICIALIZAÇÃO DE CANVAS / OBSERVER
// =============================================================================

if (!localStorage.getItem("low_latency_canvas")) {
  localStorage.setItem("low_latency_canvas", 0);
  location.reload();
}

const observer = new MutationObserver(onDOMChange);
const observerConfig = { childList: true, subtree: true };

// =============================================================================
// OBSERVER — Detecção de mudanças no DOM
// =============================================================================

function onDOMChange(mutations, observer) {
  if (getByDataHook("loader-view")) return;

  if (body.querySelector(".roomlist-view")) {
    getByDataHook("search")    || createSearchbar();
    getByDataHook("url-room")  || createURLButton();
    filterRooms(getByDataHook("search").value);
    showControls(false);

  } else if (body.querySelector(".settings-view")) {
    getByDataHook("inputopacity-value") || (createInputSettings(), createResetSettingsButton());
    showControls(false);

  } else if (body.querySelector(".room-view") || body.querySelector(".showing-room-view")) {
    getByDataHook("store") || createStoreButton();

    if (body.querySelector(".room-view .admin")) {
      body.querySelectorAll(".player-list-item").forEach(roomAdminSettings);
      getByDataHook("shirt-btn")    || createShirtButtons();
      getByDataHook("password-btn") || createPasswordButton();
    }

    handleFPSText();
    showControls(false, true);

  } else if (
    body.querySelector(".game-view") &&
    !body.querySelector(".showing-room-view") &&
    !body.querySelector(".settings-view")
  ) {
    showControls(true);
    handleFPSText();
  }
}

observer.observe(body, observerConfig);

// =============================================================================
// CHAT — Input / Hide
// =============================================================================

function showChatInput(focus = true) {
  const chatboxView = body.querySelector(".chatbox-view");
  const inputWrapper = chatboxView.querySelector(".input");
  const inputEl = inputWrapper.querySelector("input");

  inputWrapper.style = "display: block !important;";
  if (focus) inputEl.focus();
  inputEl.addEventListener("blur", hideChatInput);
}

function hideChatInput() {
  const inputWrapper = body.querySelector(".chatbox-view").querySelector(".input");
  inputWrapper.style = "";
}

// =============================================================================
// CHAT — Joystick de mensagens rápidas
// =============================================================================

const chatJoystick      = document.createElement("div");
const chatJoystickPanel = document.createElement("div");
const chatStick         = document.createElement("div");
const chatJoystickLabel = document.createElement("p");

let chatSelectedMessage = ["", 0];

chatJoystick.setAttribute("id", "chat-joystick");
chatJoystickPanel.setAttribute("id", "chat-joystick-panel");
chatStick.setAttribute("id", "chat-stick");
chatStick.innerHTML = `
  <svg id="chat-svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
    <path d="M5.8 12.2V6H2C.9 6 0 6.9 0 8v6c0 1.1.9 2 2 2h1v3l3-3h5c1.1 0 2-.9 2-2v-1.82a.943.943 0 0 1-.2.021h-7zM18 1H9c-1.1 0-2 .9-2 2v8h7l3 3v-3h1c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2"/>
  </svg>
`;
chatJoystickLabel.setAttribute("id", "chat-joystick-label");
chatJoystickLabel.innerText = "GG!";

document.body.appendChild(chatJoystickPanel);
chatJoystickPanel.appendChild(chatJoystick);
chatJoystick.appendChild(chatJoystickLabel);
chatJoystick.appendChild(chatStick);

// --- Estilos do Chat Joystick ---
let chatJoystickStylesheet = document.createElement("style");
chatJoystickStylesheet.innerHTML = `
  #chat-joystick,
  #chat-stick {
    color: #dedede55;
    font-weight: bolder;
    font-size: 1.5rem;
    border-radius: 50%;
  }

  #chat-joystick {
    width: 120px;
    height: 120px;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    margin: 30px;
  }

  #chat-joystick-panel {
    width: min-content;
    height: min-content;
    position: absolute;
    right: 0;
    top: 35px;
    display: none;
    z-index: 3;
    opacity: var(--joystick-opacity);
  }

  #chat-stick {
    width: calc(100px * .45);
    height: calc(100px * .45);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #244967;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.66) 1px 0px 4px;
    filter: saturate(1.4);
  }

  #chat-svg { fill: #FFFFFF; }

  #chat-joystick-label {
    color: white;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8em;
    font-family: 'Inter';
    font-weight: normal;
    text-shadow: 1px 0px 4px rgba(0,0,0,0.66);
  }
`;

let chatJoystickRootStylesheet = document.createElement("style");
document.head.appendChild(chatJoystickStylesheet);
document.head.appendChild(chatJoystickRootStylesheet);

// --- Eventos do Chat Joystick ---
let isDraggingChatJoystick = false;

chatJoystickPanel.addEventListener("mousedown",  startDrag);
chatJoystickPanel.addEventListener("touchstart", startDrag);
chatJoystickPanel.addEventListener("touchstart", chatDoubleTouch);
chatJoystickPanel.addEventListener("mouseup",    endDrag);
chatJoystickPanel.addEventListener("touchend",   endDrag);
chatJoystickPanel.addEventListener("mousemove",  moveStick);
chatJoystickPanel.addEventListener("touchmove",  moveStick);

resetChatStick();

var chatTapedTwice = false;

function chatDoubleTouch(e) {
  if (!chatTapedTwice) {
    chatTapedTwice = true;
    setTimeout(() => { chatTapedTwice = false; }, 300);
    return false;
  }
  e.preventDefault();
  showChatInput();
}

function startDrag(e) {
  isDraggingChatJoystick = true;
  e.preventDefault();
}

function endDrag(e) {
  isDraggingChatJoystick = false;
  if (chatSelectedMessage[1] > 30) prefabMessage(chatSelectedMessage[0]);
  resetChatStick();
}

function moveStick(e) {
  if (!isDraggingChatJoystick) return;

  const rect = chatJoystick.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  if (e.type === "touchmove") {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  }

  const cx = chatJoystick.offsetWidth  / 2;
  const cy = chatJoystick.offsetHeight / 2;

  let angle    = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
  let distance = Math.min(chatJoystick.offsetWidth / 2, Math.sqrt((x - cx) ** 2 + (y - cy) ** 2));

  chatStick.style.transition = "none";
  chatStick.style.transform  = `translate(${distance * Math.cos(angle * (Math.PI / 180)) - cx / 2}px, ${distance * Math.sin(angle * (Math.PI / 180)) - cy / 2}px)`;

  if (distance > 30) {
    if      (angle > -25  && angle < 25)   chatSelectedMessage[0] = "GG!";
    else if (angle > 65   && angle < 115)  chatSelectedMessage[0] = "Defending";
    else if (angle > -115 && angle < -65)  chatSelectedMessage[0] = "Pass to me!";
    else if (angle < -155 || angle > 155)  chatSelectedMessage[0] = "Teamwork!";
    chatSelectedMessage[1] = distance;
  } else {
    chatSelectedMessage[0] = "";
    chatSelectedMessage[1] = 0;
  }

  chatJoystickLabel.innerText  = chatSelectedMessage[0];
  chatJoystickLabel.style.opacity = distance / 50;
}

function resetChatStick() {
  chatStick.style.transition    = "transform 0.4s ease-out";
  chatStick.style.transform     = "translate(-50%, -50%)";
  chatSelectedMessage[0]        = "";
  chatSelectedMessage[1]        = 0;
  chatJoystickLabel.style.opacity = "0";
}

// =============================================================================
// UI — Botão URL Room
// =============================================================================

function createURLButton() {
  if (typeof CLIPBOARD_ROOM === "undefined") return;

  let btn = document.createElement("button");
  btn.setAttribute("data-hook", "url-room");
  btn.innerHTML = '<i class="icon-link"></i><div>URL Room</div>';

  btn.addEventListener("click", () => {
    if (getByDataHook("input-url")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "label-input";
    wrapper.style.cssText = "background-color: transparent; padding: 0; display: flex;";
    wrapper.innerHTML = '<label>URL:</label><br><input data-hook="input-url" type="url">';

    getByDataHook("search").parentNode.style.display = "none";
    insertAfter(body.querySelector("div.dialog > p:nth-child(2)"), wrapper);

    const input = wrapper.querySelector("input");
    input.focus();

    input.addEventListener("blur", () => {
      getByDataHook("search").parentNode.style.display = "flex";
      wrapper.remove();
    });

    input.addEventListener("submit", () => {
      openHaxballURL(getByDataHook("input-url").value);
    });
  });

  insertAfter(getByDataHook("join"), btn);
}

// =============================================================================
// CSS — Aplicação do stylesheet e fonte
// =============================================================================

stylesheet.innerHTML += CUSTOM_CSS;

if (typeof CUSTOM_FONT !== "undefined") {
  let fontLink = document.createElement("link");
  fontLink.href = CUSTOM_FONT.url;
  fontLink.rel  = "stylesheet";
  gameFrame.document.head.appendChild(fontLink);
  stylesheet.innerHTML += `* { font-family: '${CUSTOM_FONT.name}', ${CUSTOM_FONT.type} !important; }`;
}

// =============================================================================
// UI — Botão de Senha
// =============================================================================

function createPasswordButton() {
  if (typeof PASSWORD_BUTTON === "undefined") return;

  let btn = document.createElement("button");
  btn.setAttribute("data-hook", "password-btn");
  btn.style.fontSize = "1em";
  btn.style.padding  = "5px 0";
  btn.classList.add("admin-only");

  let icon = document.createElement("i");
  icon.classList.add("icon-lock");
  btn.appendChild(icon);
  btn.innerHTML += "Password";

  insertAfter(getByDataHook("reset-all-btn"), btn);
  btn.addEventListener("click", createPasswordPopup);
}

function createPasswordPopup() {
  const popup   = document.createElement("div");
  popup.classList.add("dialog", "basic-dialog", "admin-only");

  const title   = document.createElement("h1");
  title.textContent = "Change password";

  const desc    = document.createElement("p");
  desc.textContent  = "Enter the new password or leave the input empty to set the room as public";

  const input   = document.createElement("input");
  input.setAttribute("data-hook", "pass-input");
  input.setAttribute("type", "text");
  input.setAttribute("maxlength", "30");
  input.setAttribute("placeholder", "No password");

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("data-hook", "close-pass");
  closeBtn.textContent = "Close";

  const setBtn   = document.createElement("button");
  setBtn.setAttribute("data-hook", "set-pass");
  setBtn.textContent = "Set password";

  buttons.appendChild(closeBtn);
  buttons.appendChild(setBtn);
  popup.appendChild(title);
  popup.appendChild(desc);
  popup.appendChild(input);
  popup.appendChild(buttons);

  const popupsContainer = getByDataHook("popups");
  popupsContainer.appendChild(popup);
  popupsContainer.style.display = "flex";

  input.onkeydown   = (e) => e.stopPropagation();
  closeBtn.onclick  = () => { popup.remove(); popupsContainer.style.display = "none"; };
  setBtn.onclick    = () => {
    input.value === ""
      ? prefabMessage("/clear_password")
      : prefabMessage("/set_password " + input.value);
    popup.remove();
    popupsContainer.style.display = "none";
  };
}

// =============================================================================
// UI — Botão Reset Settings
// =============================================================================

function createResetSettingsButton() {
  const section = getByDataHook("miscsec");
  if (getByDataHook("reset-all-btn")) return;

  let btn = document.createElement("button");
  btn.setAttribute("data-hook", "reset-all-btn");
  btn.innerHTML = "Reset all";

  section.appendChild(document.createElement("br"));
  section.appendChild(btn);
  section.innerHTML += "<p style='font-size: small; font-style: italic; opacity: 0.5;'>You'll see changes next <br>time you open the app.";

  getByDataHook("reset-all-btn").addEventListener("click", () => localStorage.clear());
}

// =============================================================================
// UI — Admin: long press em jogadores
// =============================================================================

function roomAdminSettings(playerItem) {
  if (typeof ROOM_ADMIN_SETTINGS === "undefined") return;

  let doubleTap = false;
  let touchStart = {x: 0, y: 0};

  playerItem.addEventListener("touchstart", (e) => {
    touchStart = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    
    if (!doubleTap) {
      doubleTap = true;
      setTimeout(() => { doubleTap = false; }, 300);
      return false;
    }
    
    // Verificar se houve movimento (drag)
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const distance = Math.sqrt(Math.pow(currentX - touchStart.x, 2) + Math.pow(currentY - touchStart.y, 2));
    
    // Se tiver movimento > 15px, é um drag, não dispara o contextmenu
    if(distance > 15) return;
    
    e.preventDefault();
    const contextEvent = new MouseEvent("contextmenu", {
      bubbles: true, cancelable: true, view: window, button: 2,
    });
    playerItem.dispatchEvent(contextEvent);
  });
  
  playerItem.addEventListener("touchmove", (e) => {
    // Se tiver movimento, cancela o double tap
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const distance = Math.sqrt(Math.pow(currentX - touchStart.x, 2) + Math.pow(currentY - touchStart.y, 2));
    if(distance > 15) doubleTap = false;
  });
}

// =============================================================================
// UI — Busca de Salas
// =============================================================================

function filterRooms(query) {
  if (typeof ROOM_SEARCH === "undefined") return;

  const lowerQuery = query.toLowerCase();
  body.querySelectorAll("tr").forEach((row) => {
    const nameEl = row.querySelector('span[data-hook="name"]');
    if (nameEl && !nameEl.textContent.toLowerCase().includes(lowerQuery)) {
      row.style.display = "none";
    } else {
      row.removeAttribute("style");
    }
  });
}

function createSearchbar() {
  if (typeof ROOM_SEARCH === "undefined") return;

  const wrapper = document.createElement("div");
  wrapper.className = "label-input";
  wrapper.style.cssText = "background-color: transparent; padding: 0;";
  wrapper.innerHTML = '<label>Search a room:</label><br><input data-hook="search" placeholder="Type here..." type="text">';

  insertAfter(body.querySelector("div.dialog > p:nth-child(2)"), wrapper);

  const input = wrapper.querySelector("input");
  input.addEventListener("input", () => filterRooms(input.value));
}

// =============================================================================
// UI — Logo customizado
// =============================================================================

if (typeof CUSTOM_LOGO !== "undefined") {
  stylesheet.innerHTML += `
    .choose-nickname-view > img {
      content: url("${CUSTOM_LOGO.url}");
      height: ${CUSTOM_LOGO.height || "auto"};
      width: ${CUSTOM_LOGO.width   || "auto"};
    }
  `;
}

// =============================================================================
// CAMISAS — Configurações de times
// =============================================================================

const blueShirts = {
  arg: "0 000000 FFFFFF 0D8ED9 FFFFFF",
  fra: "0 E8B320 0F0D4D",
  gbr: "90 151AA1 151AA1 FFFFFF FFFFFF",
  ita: "180 D4BA91 2D4E9D",
  hvr: "0 3A33FF EBE6FF DBDBDB FFFFFF",
  jpn: "30 F2F2F2 1930FF 0066FF 101FA3",
};

const redShirts = {
  bel: "0 000000 FF150D BD100A FF150D",
  bra: "0 167010 FFFF26 F7FF19 FFFF26",
  prt: "-60 FFCB21 0D3808 FF0D0D",
  nld: "0 0D0D40 FF9124 FFAE0D FF9124",
  esp: "0 EBC015 BF0000",
  mar: "FFFFFF 046317 FF0000 FF0000",
};

function getNextShirt(team) {
  const shirts = team === "red" ? redShirts : blueShirts;
  const keys   = Object.keys(shirts);

  getNextShirt.currentIndex        = getNextShirt.currentIndex || {};
  getNextShirt.currentIndex[team]  = getNextShirt.currentIndex[team] || 0;

  const idx = getNextShirt.currentIndex[team];
  getNextShirt.currentIndex[team] = (idx + 1) % keys.length;

  return shirts[keys[idx]];
}

function pickShirt(e) {
  if (typeof SHIRTS_BUTTON === "undefined") return;
  const team = e.target.hasAttribute("red") ? "red" : "blue";
  prefabMessage(`/colors ${team} ${getNextShirt(team)}`);
}

function createShirtButtons() {
  const redBtn  = document.createElement("button");
  redBtn.setAttribute("data-hook", "shirt-btn");
  redBtn.classList.add("admin-only");
  redBtn.setAttribute("red", "");
  redBtn.onclick = pickShirt;

  const blueBtn = document.createElement("button");
  blueBtn.setAttribute("data-hook", "shirt-btn");
  blueBtn.classList.add("admin-only");
  blueBtn.setAttribute("blue", "");
  blueBtn.onclick = pickShirt;

  body.querySelector(".t-red  > .buttons").appendChild(redBtn);
  body.querySelector(".t-blue > .buttons").appendChild(blueBtn);
}

// =============================================================================
// UI — Botão Store
// =============================================================================

function createStoreButton() {
  if (typeof STORE_BUTTON === "undefined") return;

  let btn = document.createElement("button");
  btn.setAttribute("data-hook", "store");
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 407 407"
         fill="white" style="height:0.85em; width: auto">
      <path d="M402 84 323 5c-3-3-7-5-12-5H17C8 0 0 8 0 17v373c0 9 8 17 17 17h373c9 0 17-8 17-17V96c0-4-2-9-5-12zm-101 80H67V39h234v125z"/>
      <path d="M214 148h43c3 0 6-2 6-6V60c0-4-3-6-6-6h-43c-3 0-6 2-6 6v82c0 4 3 6 6 6z"/>
    </svg> Store
  `;

  insertAfter(getByDataHook("rec-btn"), btn);
  btn.addEventListener("click", () => prefabMessage("/store"));
}

// =============================================================================
// FPS — Toggle de exibição
// =============================================================================

function handleFPSText() {
  const showFPS   = localStorage.getItem("show_fps") || 1;
  const statsView = body.querySelector(".stats-view");

  statsView.style = showFPS == 1 ? "" : "opacity: 0 !important;";

  statsView.ontouchstart = (e) => {
    if ((localStorage.getItem("show_fps") || 1) == 1) {
      localStorage.setItem("show_fps", 0);
      e.target.style = "opacity: 0 !important;";
    } else {
      localStorage.setItem("show_fps", 1);
      e.target.style = "";
    }
  };
}

// =============================================================================
// JOYSTICK VIRTUAL — Movimento do jogador
// =============================================================================

if (typeof VIRTUAL_JOYSTICK !== "undefined") {
  const joystickEl   = document.createElement("div");
  const joystickPanel = document.createElement("div");
  const kickPanel    = document.createElement("div");
  const stickEl      = document.createElement("div");

  joystickEl.setAttribute("id",    "joystick");
  joystickPanel.setAttribute("id", "joystick-panel");
  kickPanel.setAttribute("id",     "kick-panel");
  stickEl.setAttribute("id",       "stick");

  joystickEl.style.visibility = "hidden";

  document.body.appendChild(kickPanel);
  document.body.appendChild(joystickPanel);
  joystickPanel.appendChild(joystickEl);
  joystickEl.appendChild(stickEl);

  // --- Estilos do Joystick ---
  let joystickStylesheet = document.createElement("style");
  joystickStylesheet.innerHTML = `
    #joystick,
    #stick {
      touch-action: none;
      background-color: #c2c2c255;
      box-shadow: 6px 6px 10px 0 #a5abb133, -5px -5px 9px 0 #a5abb133;
      color: #dedede55;
      font-weight: bolder;
      font-size: 1.5rem;
      border-radius: 50%;
    }

    #joystick {
      width: var(--joystick-size);
      height: var(--joystick-size);
      opacity: var(--joystick-opacity);
      position: absolute;
      left: var(--joystick-margin);
      bottom: var(--joystick-margin);
    }

    #joystick-panel {
      width: 45%;
      height: 70%;
      position: absolute;
      left: 0;
      bottom: 0;
      display: none;
    }

    #kick-panel {
      width: 45%;
      height: 70%;
      position: absolute;
      right: 0;
      bottom: 0;
      display: none;
    }

    #stick {
      width: calc(var(--joystick-size) * .45);
      height: calc(var(--joystick-size) * .45);
      position: absolute;
      top: calc(50% - var(--joystick-size) * .45 / 2);
      left: calc(50% - var(--joystick-size) * .45 / 2);
      transform: translate(0%, 0%);
    }
  `;

  let joystickRootStylesheet = document.createElement("style");
  document.head.appendChild(joystickStylesheet);
  document.head.appendChild(joystickRootStylesheet);

  let isJoystickDragging = false;

  const PWM_TICK = (1 / 40) * 1000;
  let pwmRatios  = { W: 0, A: 0, S: 0, D: 0 };

  // --- Drag Start ---
  function joystickStartDrag(e) {
    isJoystickDragging = true;

    if ((localStorage.getItem("input_fixed") || 0) == 0) {
      const rect = joystickEl.getBoundingClientRect();
      let ox = e.touches[0].clientX - rect.left - joystickEl.offsetWidth  / 2;
      let oy = e.touches[0].clientY - rect.top  - joystickEl.offsetHeight / 2;
      joystickEl.style.transform = `translate(${ox}px, ${oy}px)`;
    }

    joystickEl.style.visibility = "visible";
    e.preventDefault();
  }

  // --- Drag End ---
  function joystickEndDrag(e) {
    isJoystickDragging = false;

    if ((localStorage.getItem("input_fixed") || 0) == 0) {
      joystickEl.style.transform  = "";
      joystickEl.style.visibility = "hidden";
    }

    resetJoystickStick();
  }

  // --- Stick Move ---
  function joystickMoveStick(e) {
    if (!isJoystickDragging) return;

    const rect = joystickEl.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (e.type === "touchmove") {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }

    const cx     = joystickEl.offsetWidth  / 2;
    const cy     = joystickEl.offsetHeight / 2;
    const dx     = x - cx;
    const dy     = y - cy;
    const dist   = Math.sqrt(dx ** 2 + dy ** 2);
    const maxR   = Math.min(cx, cy);
    const ratio  = Math.min(1, dist / maxR);
    let   angle  = Math.atan2(dy, dx) * (180 / Math.PI);

    if (angle < 0) angle += 360;

    if (ratio > 0.25) {
      switch (Math.round(angle / 45) % 8) {
        case 0: changeJoystickDirection("d");  break;
        case 1: changeJoystickDirection("sd"); break;
        case 2: changeJoystickDirection("s");  break;
        case 3: changeJoystickDirection("sa"); break;
        case 4: changeJoystickDirection("a");  break;
        case 5: changeJoystickDirection("wa"); break;
        case 6: changeJoystickDirection("w");  break;
        case 7: changeJoystickDirection("wd"); break;
      }
    } else {
      changeJoystickDirection("");
    }

    const clampedDx = (dx / dist) * ratio * maxR;
    const clampedDy = (dy / dist) * ratio * maxR;
    stickEl.style.transition = "none";
    stickEl.style.transform  = `translate(${clampedDx}px, ${clampedDy}px)`;
  }

  // --- Direção ---
  function changeJoystickDirection(keys) {
    const active = { w: false, a: false, s: false, d: false };
    for (let k of keys) active[k] = true;
    try {
      emulateKey("KeyW", active.w);
      emulateKey("KeyA", active.a);
      emulateKey("KeyS", active.s);
      emulateKey("KeyD", active.d);
    } catch {}
  }

  function resetJoystickStick() {
    stickEl.style.transition = "transform 0.1s ease-out";
    stickEl.style.transform  = "translate(0%, 0%)";
    pwmRatios = { W: 0, A: 0, S: 0, D: 0 };
    changeJoystickDirection("");
  }

  // --- PWM Tick ---
  function joystickTick(key) {
    const pwmEnabled = (localStorage.getItem("input_pwm") || 0) == 1;
    const onTime     = PWM_TICK * pwmRatios[key];
    const offTime    = PWM_TICK - onTime;

    if (pwmRatios[key] > 0.1 && pwmEnabled) emulateKey("Key" + key, true);

    setTimeout(() => {
      if (pwmRatios[key] < 0.85 && pwmEnabled) emulateKey("Key" + key, false);
      setTimeout(() => joystickTick(key), offTime);
    }, onTime);
  }

  // --- Emulação de Teclas ---
  function emulateKey(code, pressed) {
    const eventType = pressed ? "keydown" : "keyup";
    gameFrame.document.dispatchEvent(new KeyboardEvent(eventType, { code }));
  }

  // --- Chute ---
  function startKick() { emulateKey("KeyX", true);  }
  function endKick()   { emulateKey("KeyX", false); }

  // --- Exibir / Ocultar Controles ---
  function showControls(visible, keepChat = false) {
    if (typeof VIRTUAL_JOYSTICK === "undefined") return;

    if (visible) {
      const isFixed = localStorage.getItem("input_fixed") || 0;
      joystickPanel.style.display = "block";
      kickPanel.style.display     = "block";
      document.body.querySelector("#chat-joystick-panel").style.display = "block";

      if (isFixed == 1) {
        joystickEl.style.transform  = "";
        joystickEl.style.visibility = "visible";
      }

      reloadJoystickRoot();
    } else {
      joystickPanel.style.display   = "none";
      kickPanel.style.display       = "none";
      joystickEl.style.transform    = "";
      joystickEl.style.visibility   = "hidden";

      if (!keepChat) {
        document.body.querySelector("#chat-joystick-panel").style.display = "none";
      }
    }
  }

  // =============================================================================
  // CONFIGURAÇÕES — Joystick Settings na tela de Settings
  // =============================================================================

  function createInputSettings() {
    const section = getByDataHook("inputsec");

    const opacity = localStorage.getItem("input_opacity") || 0.8;
    const size    = localStorage.getItem("input_size")    || 40;
    const fixed   = localStorage.getItem("input_fixed")   || 0;
    const margin  = localStorage.getItem("input_margin")  || 10;

    // Opacity Row
    const opacityRow   = document.createElement("div");
    opacityRow.classList.add("option-row");
    const opacityLabel = document.createElement("div");
    opacityLabel.style.cssText = "margin-right: 10px; flex: 1; max-width: 115px;";
    opacityLabel.textContent   = "Controls Opacity";
    const opacityValue = document.createElement("div");
    opacityValue.style.width   = "40px";
    opacityValue.setAttribute("data-hook", "inputopacity-value");
    const opacityRange = document.createElement("input");
    opacityRange.classList.add("slider");
    opacityRange.setAttribute("type", "range");
    opacityRange.setAttribute("min", "0.25");
    opacityRange.setAttribute("max", "1");
    opacityRange.setAttribute("step", "0.01");
    opacityRange.setAttribute("data-hook", "inputopacity-range");
    opacityRange.onchange = inputOpacityChange;
    opacityRange.oninput  = inputOpacityChange;
    opacityRange.value    = opacity;
    opacityValue.innerText = opacityRange.value;
    opacityRow.appendChild(opacityLabel);
    opacityRow.appendChild(opacityValue);
    opacityRow.appendChild(opacityRange);

    // Size Row
    const sizeRow   = document.createElement("div");
    sizeRow.classList.add("option-row");
    const sizeLabel = document.createElement("div");
    sizeLabel.style.cssText = "margin-right: 10px; flex: 1; max-width: 115px;";
    sizeLabel.textContent   = "Joystick Size";
    const sizeValue = document.createElement("div");
    sizeValue.style.width   = "40px";
    sizeValue.setAttribute("data-hook", "inputsize-value");
    const sizeRange = document.createElement("input");
    sizeRange.classList.add("slider");
    sizeRange.setAttribute("type", "range");
    sizeRange.setAttribute("min", "30");
    sizeRange.setAttribute("max", "50");
    sizeRange.setAttribute("step", "1");
    sizeRange.setAttribute("data-hook", "inputsize-range");
    sizeRange.onchange = inputSizeChange;
    sizeRange.oninput  = inputSizeChange;
    sizeRange.value    = size;
    sizeValue.innerText = sizeRange.value;
    sizeRow.appendChild(sizeLabel);
    sizeRow.appendChild(sizeValue);
    sizeRow.appendChild(sizeRange);

    // Margin Row
    const marginRow   = document.createElement("div");
    marginRow.classList.add("option-row");
    const marginLabel = document.createElement("div");
    marginLabel.style.cssText = "margin-right: 10px; flex: 1; max-width: 115px;";
    marginLabel.textContent   = "Joystick Margin";
    const marginValue = document.createElement("div");
    marginValue.style.width   = "40px";
    marginValue.setAttribute("data-hook", "inputmargin-value");
    const marginRange = document.createElement("input");
    marginRange.classList.add("slider");
    marginRange.setAttribute("type", "range");
    marginRange.setAttribute("min", "0");
    marginRange.setAttribute("max", "35");
    marginRange.setAttribute("step", "1");
    marginRange.setAttribute("data-hook", "inputmargin-range");
    marginRange.onchange = inputMarginChange;
    marginRange.oninput  = inputMarginChange;
    marginRange.value    = margin;
    marginValue.innerText = marginRange.value;
    marginRow.appendChild(marginLabel);
    marginRow.appendChild(marginValue);
    marginRow.appendChild(marginRange);

    // Fixed Toggle
    const fixedToggle = document.createElement("div");
    fixedToggle.classList.add("toggle");
    const fixedIcon = document.createElement("i");

    if (fixed == 1) {
      fixedIcon.classList.add("icon-ok");
      marginRow.style.display = "flex";
    } else {
      fixedIcon.classList.add("icon-cancel");
      marginRow.style.display = "none";
    }

    fixedToggle.appendChild(fixedIcon);
    fixedToggle.innerHTML += "Fixed Joystick";
    fixedToggle.onclick = inputFixedChange;

    section.appendChild(fixedToggle);
    section.appendChild(marginRow);
    section.appendChild(opacityRow);
    section.appendChild(sizeRow);

    reloadJoystickRoot();
  }

  function inputOpacityChange(e) {
    localStorage.setItem("input_opacity", e.target.value);
    e.target.parentNode.children[1].innerText = e.target.value;

    if (e.type === "input") {
      joystickPanel.style.display     = "block";
      joystickEl.style.visibility     = "visible";
      joystickEl.style.transform      = "";
      chatJoystickPanel.style.display = "block";
    } else {
      joystickPanel.style.display     = "none";
      joystickEl.style.visibility     = "hidden";
      chatJoystickPanel.style.display = "none";
    }

    reloadJoystickRoot();
  }

  function inputMarginChange(e) {
    localStorage.setItem("input_margin", e.target.value);
    e.target.parentNode.children[1].innerText = e.target.value;

    if (e.type === "input") {
      joystickPanel.style.display = "block";
      joystickEl.style.visibility = "visible";
      joystickEl.style.transform  = "";
    } else {
      joystickPanel.style.display = "none";
      joystickEl.style.visibility = "hidden";
    }

    reloadJoystickRoot();
  }

  function inputFixedChange(e) {
    const icon = e.target.children[0];

    if (icon.classList.contains("icon-cancel")) {
      icon.classList.replace("icon-cancel", "icon-ok");
      getByDataHook("inputmargin-range").parentNode.style.display = "flex";
      localStorage.setItem("input_fixed", 1);
    } else {
      icon.classList.replace("icon-ok", "icon-cancel");
      joystickEl.style.visibility = "hidden";
      getByDataHook("inputmargin-range").parentNode.style.display = "none";
      localStorage.setItem("input_fixed", 0);
    }

    reloadJoystickRoot();
  }

  function inputPWMChange(e) {
    const icon = e.target.children[0];

    if (icon.classList.contains("icon-cancel")) {
      icon.classList.replace("icon-cancel", "icon-ok");
      localStorage.setItem("input_pwm", 1);
    } else {
      icon.classList.replace("icon-ok", "icon-cancel");
      joystickEl.style.visibility = "hidden";
      localStorage.setItem("input_pwm", 0);
    }

    changeJoystickDirection("");
  }

  function inputSizeChange(e) {
    localStorage.setItem("input_size", e.target.value);
    e.target.parentNode.children[1].innerText = e.target.value;

    if (e.type === "input") {
      joystickPanel.style.display = "block";
      joystickEl.style.visibility = "visible";
      joystickEl.style.transform  = "";
    } else {
      joystickPanel.style.display = "none";
      joystickEl.style.visibility = "hidden";
    }

    reloadJoystickRoot();
  }

  function reloadJoystickRoot() {
    const opacity = localStorage.getItem("input_opacity") || 0.8;
    const size    = localStorage.getItem("input_size")    || 40;
    const margin  = (localStorage.getItem("input_fixed") || 0) == 1
      ? (localStorage.getItem("input_margin") || 10)
      : 0;

    joystickRootStylesheet.innerHTML = `
      :root {
        --joystick-size: ${size}vh;
        --joystick-margin: ${margin}vh;
        --joystick-opacity: ${opacity};
      }
    `;
  }

  // --- Event Listeners do Joystick ---
  joystickPanel.addEventListener("mousedown",  joystickStartDrag);
  joystickPanel.addEventListener("touchstart", joystickStartDrag);
  joystickPanel.addEventListener("mouseup",    joystickEndDrag);
  joystickPanel.addEventListener("touchend",   joystickEndDrag);
  joystickPanel.addEventListener("mousemove",  joystickMoveStick);
  joystickPanel.addEventListener("touchmove",  joystickMoveStick);

  kickPanel.addEventListener("mousedown",  startKick);
  kickPanel.addEventListener("touchstart", startKick);
  kickPanel.addEventListener("mouseup",    endKick);
  kickPanel.addEventListener("touchend",   endKick);
}

// =============================================================================
// UTILITÁRIOS
// =============================================================================

function getByDataHook(hook) {
  return body.querySelector(`[data-hook="${hook}"]`);
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function openHaxballURL(url) {
  const code = url.replace(/^https?:\/\/(www\.)?haxball\.com\/play\?c=/, "");
  if (code.length > 0) {
    window.location.replace("https://www.haxball.com/play?c=" + code);
  }
}

function prefabMessage(text) {
  const input = body.querySelector(".chatbox-view").querySelector("input");
  input.focus();
  input.value = text;
  input.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "Enter", bubbles: true, cancelable: true, keyCode: 13, which: 13,
    })
  );
}

// =============================================================================
// LIMPEZA DO HEADER
// =============================================================================

document.querySelector(".rightbar").remove();
document.querySelector(".header").remove();

// 🎮 SISTEMA DE TOQUE PARA MOVER JOGADORES (MOBILE)
// 🎮 SISTEMA DE ARRASTE POR TOQUE PARA MOBILE (MOVER JOGADORES ENTRE TIMES)
if(void 0!==VIRTUAL_JOYSTICK){
  let draggedPlayer = null;
  let dragStartPos = {x: 0, y: 0};
  let isDraggingNow = false;
  
  body.addEventListener('touchstart', (e) => {
    const playerEl = e.target.closest('.player-list-item');
    if(playerEl) {
      draggedPlayer = playerEl;
      dragStartPos = {x: e.touches[0].clientX, y: e.touches[0].clientY};
      isDraggingNow = false;
      playerEl.style.opacity = '0.6';
      playerEl.style.backgroundColor = 'rgba(255, 200, 100, 0.5)';
    }
  }, true);
  
  body.addEventListener('touchmove', (e) => {
    if(!draggedPlayer) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const distance = Math.sqrt(Math.pow(currentX - dragStartPos.x, 2) + Math.pow(currentY - dragStartPos.y, 2));
    
    if(distance >= 20) {
      isDraggingNow = true; // Marcar que está arrastando
      
      const elementsUnder = document.elementsFromPoint(currentX, currentY);
      elementsUnder.forEach(el => {
        const teamView = el.closest('.player-list-view');
        if(teamView) {
          teamView.style.backgroundColor = 'rgba(100, 200, 100, 0.3)';
        }
      });
    }
  }, true);
  
  body.addEventListener('touchend', (e) => {
    if(!draggedPlayer) return;
    
    if(isDraggingNow) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const elementBelow = document.elementFromPoint(endX, endY);
      
      if(elementBelow) {
        const targetTeam = elementBelow.closest('.player-list-view');
        if(targetTeam) {
          const fromTeam = draggedPlayer.closest('.player-list-view').className.match(/t-(red|blue|spec)/)?.[1];
          const toTeam = targetTeam.className.match(/t-(red|blue|spec)/)?.[1];
          
          if(fromTeam && toTeam && fromTeam !== toTeam) {
            const playerName = draggedPlayer.querySelector('[data-hook="name"]')?.textContent;
            console.log(`✅ Movendo: ${playerName} de ${fromTeam} para ${toTeam}`);
            prefabMessage(`/move ${playerName} ${toTeam}`);
          }
        }
      }
    }
    
    draggedPlayer.style.opacity = '1';
    draggedPlayer.style.backgroundColor = '';
    document.querySelectorAll('.player-list-view').forEach(tv => {
      tv.style.backgroundColor = '';
    });
    draggedPlayer = null;
    isDraggingNow = false;
  }, true);
}
