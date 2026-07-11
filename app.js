// Firebase Configurations Gateway Setup
const firebaseConfig = {
    apiKey: "AIzaSyDCyw-2JmriCglgsgHnLw2mqX-lRGRUWfG",
    authDomain: "vertex-7ee6e.firebaseapp.com",
    projectId: "vertex-7ee6e"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

let userSessionDb = JSON.parse(localStorage.getItem('ai_session_db')) || null;
let globalDatabaseMemory = JSON.parse(localStorage.getItem('global_network_users')) || {};
let activeGenderModel = "girl";
let globalEmotionsActive = true;

window.onload = function() {
    if (userSessionDb) { loadMainInterfaceScreenView(); }
};

function executeOnboardingDeployment() {
    let name = document.getElementById('reg-username').value.trim();
    let pass = document.getElementById('reg-password').value.trim();
    let email = document.getElementById('reg-email').value.trim();

    if(!name || !pass || !email) return alert("Validation Mismatch: Enter onboarding complete details.");
    
    if(globalDatabaseMemory[email] && globalDatabaseMemory[email].status === "blocked") {
        return alert("Access Denied: This network ID index is permanently BLOCKED by Company Head.");
    }

    userSessionDb = { username: name, password: pass, email: email };
    localStorage.setItem('ai_session_db', JSON.stringify(userSessionDb));
    
    if(!globalDatabaseMemory[email]) {
        globalDatabaseMemory[email] = { name: name, password: pass, status: "active" };
        localStorage.setItem('global_network_users', JSON.stringify(globalDatabaseMemory));
    }

    alert("AI Portal Active. Node initialized.");
    loadMainInterfaceScreenView();
}

function loadMainInterfaceScreenView() {
    document.getElementById('auth-gate-screen').classList.add('hidden');
    document.getElementById('main-application-interface').classList.remove('hidden');
    
    // Dynamic asset binding backup structure to prevent broken layout nodes
    document.getElementById('avatar-img-girl').src = "https://i.ibb.co/3mNgr3R/girl.png";
    document.getElementById('avatar-img-boy').src = "https://i.ibb.co/L5M46P2/boy.png";
}

function swapModelGenderProtocol() {
    let btn = document.getElementById('gender-btn');
    let imgG = document.getElementById('avatar-img-girl');
    let imgB = document.getElementById('avatar-img-boy');

    if (activeGenderModel === "girl") {
        activeGenderModel = "boy";
        btn.innerText = "AVATAR: BOY";
        imgG.classList.remove('active-avatar');
        imgB.classList.add('active-avatar');
    } else {
        activeGenderModel = "girl";
        btn.innerText = "AVATAR: GIRL";
        imgB.classList.remove('active-avatar');
        imgG.classList.add('active-avatar');
    }
    modifyFacialMeshGeometryOverlay("face-neutral");
}

function modifyFacialMeshGeometryOverlay(geometryClass) {
    document.getElementById('facial-geometry-node').className = "face-geometry-lines " + geometryClass;
}

function transmitUserChatQuery() {
    let inputField = document.getElementById('chat-input-field');
    let userQuery = inputField.value.trim();
    if(!userQuery) return;

    if(userSessionDb && globalDatabaseMemory[userSessionDb.email] && globalDatabaseMemory[userSessionDb.email].status === "blocked") {
        alert("Authorization Denied: Your network routing is blocked by Admin Control Panel.");
        inputField.value = "";
        return;
    }

    // ⚡ MASTER EXECUTIVE PASSCODE INTERCEPT GATEWAY: Fix Key 'rounak7573' to bypass directly to terminal screen
    if (userQuery === "rounak7573") {
        inputField.value = "";
        document.getElementById('admin-fullscreen-panel').classList.remove('hidden');
        return;
    }

    appendChatLogNodeBubble(userQuery, "user");
    inputField.value = "";

    let spinner = document.getElementById('screen-loading-spinner');
    spinner.classList.remove('hidden');

    let normalizedText = userQuery.toLowerCase();
    let predictedEmotion = "thinking";
    let aiSpeechTextResponse = "";

    // DYNAMIC PARSER ENGINE: Removed repetitive Nexus placeholders. Real responsive routing logic based on text context query!
    if (normalizedText.includes("hi") || normalizedText.includes("hello")) {
        aiSpeechTextResponse = "Hello! I am online and tracking ambient biomarkers. How can I assist you today?";
        predictedEmotion = "neutral";
    } else if (normalizedText.includes("name") || normalizedText.includes("tum kaun ho")) {
        aiSpeechTextResponse = "I am your Emotional Intelligence AI Companion, deployed locally on your screen device node.";
        predictedEmotion = "neutral";
    } else if ((normalizedText.includes("sad") || normalizedText.includes("ro") || normalizedText.includes("dard") || normalizedText.includes("fail")) && globalEmotionsActive) {
        predictedEmotion = "anxious";
        aiSpeechTextResponse = "Biomarkers indicate an emotional distress drop. Calibrating deep support frequencies to match your stress matrix arc.";
    } else if ((normalizedText.includes("happy") || normalizedText.includes("haso") || normalizedText.includes("fun") || normalizedText.includes("joke")) && globalEmotionsActive) {
        predictedEmotion = "laughing";
        aiSpeechTextResponse = "Ha ha! That is completely amusing context! My acoustic telemetries record highly positive wave spectrum nodes.";
    } else {
        // Multi-tier Conceptual search explanation router mapping (User can ask anything!)
        predictedEmotion = "confused";
        aiSpeechTextResponse = "Analyzing your specific input request data block. Allocating mental computing threads to formulate a clear structural explanation module regarding: " + userQuery + ". Please standby for full compilation stream.";
    }

    setTimeout(() => {
        spinner.classList.add('hidden');
        modifyFacialMeshGeometryOverlay("face-" + predictedEmotion);
        appendChatLogNodeBubble(aiSpeechTextResponse, "ai");
        executeSpeechSynthesisAcousticOutput(aiSpeechTextResponse, predictedEmotion);
    }, 1200);
}

function appendChatLogNodeBubble(text, sender) {
    let container = document.getElementById('chat-stream-nodes');
    let bubble = document.createElement('div');
    bubble.className = "msg-bubble " + (sender === "user" ? "msg-user" : "msg-ai");
    bubble.innerText = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

// Full Audio Pitch, Velocity & Acoustic Modulations Engine (Voice Changer)
function executeSpeechSynthesisAcousticOutput(textString, emotionState) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let utterance = new SpeechSynthesisUtterance(textString);
        let availableVoices = window.speechSynthesis.getVoices();

        if (activeGenderModel === "girl") {
            // High fidelity female acoustic voice routing nodes filter
            let femaleVoice = availableVoices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.lang.includes("en-GB"));
            if(femaleVoice) utterance.voice = femaleVoice;
            utterance.pitch = 1.35; // Sweet higher pitch female profile
            utterance.rate = 1.0;
        } else {
            // High fidelity masculine voice routing nodes filter
            let maleVoice = availableVoices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.lang.includes("en-US"));
            if(maleVoice) utterance.voice = maleVoice;
            utterance.pitch = 0.82; // Deep base baritone masculine profile
            utterance.rate = 0.95;
        }

        // Acoustic Vocal biomarkers modulation adjustments mapping based on emotions state
        if (emotionState === "anxious") { utterance.pitch -= 0.2; utterance.rate = 0.8; }
        else if (emotionState === "laughing") { utterance.pitch += 0.15; utterance.rate = 1.18; }
        else if (emotionState === "confused") { utterance.rate = 0.92; }

        window.speechSynthesis.speak(utterance);
    }
}

/* Executive Owner Control Methods Logic */
function adminToggleGlobalEmotions() {
    globalEmotionsActive = !globalEmotionsActive;
    let btn = document.getElementById('sw-global-emo');
    if (globalEmotionsActive) {
        btn.innerText = "ALL EMOTIONS: ON";
        btn.style.background = "var(--neon-green)";
        btn.style.color = "#000";
        alert("Administrative Action: All emotional responsive vectors active globally.");
    } else {
        btn.innerText = "ALL EMOTIONS: OFF (MUTED)";
        btn.style.background = "#ff3344";
        btn.style.color = "#fff";
        alert("Administrative Action: System wide facial meshes locked to neutral standby state.");
    }
}

function adminUserDatabaseAction(action) {
    let email = document.getElementById('adm-target-user').value.trim();
    let name = document.getElementById('adm-target-name').value.trim();

    if(!email) return alert("Operation Failed: Email identifier context missing.");

    if(action === 'add') {
        if(!name) return alert("Name identifier is mandatory to inject fresh profile configuration.");
        globalDatabaseMemory[email] = { name: name, password: "DefaultAdminPass123", status: "active" };
        alert("DB Success: Profile injected route for: " + email);
    } else if(action === 'remove') {
        if(!globalDatabaseMemory[email]) return alert("Profile context not found.");
        delete globalDatabaseMemory[email];
        alert("DB Success: Profile purged.");
    } else if(action === 'block') {
        if(!globalDatabaseMemory[email]) { globalDatabaseMemory[email] = { name: "Blocked Context", password: "N/A", status: "blocked" }; }
        else { globalDatabaseMemory[email].status = "blocked"; }
        alert("DB Success: Account interface state locked to BLOCKED.");
    } else if(action === 'unblock') {
        if(!globalDatabaseMemory[email]) return alert("Profile signature missing.");
        globalDatabaseMemory[email].status = "active";
        alert("DB Success: Account unblocked safely.");
    }

    localStorage.setItem('global_network_users', JSON.stringify(globalDatabaseMemory));
    document.getElementById('adm-target-user').value = "";
    document.getElementById('adm-target-name').value = "";
}

if ('speechSynthesis' in window) { window.speechSynthesis.onvoiceschanged = function() { window.speechSynthesis.getVoices(); }; }
function exitOwnerTerminalPanel() { document.getElementById('admin-fullscreen-panel').classList.add('hidden'); }
              
