/**
 * SHADOW MUSCLE - SYSTEM ENGINE v4.0
 * Thème : Solo Leveling / RPG
 */

class ShadowMuscle {
    constructor() {
        this.initData();
        this.init();
    }

    initData() {
        const saved = localStorage.getItem('shadow_muscle_save');
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            this.data = {
                level: 1,
                xp: 0,
                stats: { force: 10, endurance: 10, mental: 10, discipline: 10, aura: 10 },
                streak: 0,
                lastDate: null,
                badges: [],
                history: []
            };
        }

        this.BADGES_DB = [
            { id: 'first_step', name: 'Éveil', desc: 'Première mission complétée', icon: '⚔️', type: 'mission', req: 1 },
            { id: 'bronze_rank', name: 'Rank E', desc: 'Atteindre le niveau 5', icon: '🥉', type: 'level', req: 5 },
            { id: 'silver_rank', name: 'Rank C', desc: 'Atteindre le niveau 15', icon: '🥈', type: 'level', req: 15 },
            { id: 'gold_rank', name: 'Rank A', desc: 'Atteindre le niveau 30', icon: '🥇', type: 'level', req: 30 },
            { id: 'shadow_lord', name: 'Monarque', desc: 'Atteindre le niveau 50', icon: '👑', type: 'level', req: 50 },
            { id: 'consistent', name: 'Régularité', desc: 'Série de 7 jours', icon: '🔥', type: 'streak', req: 7 }
        ];

        this.MISSIONS = [
            { id: 'pompes', title: '100 Pompes', xp: 40, stat: 'force' },
            { id: 'squats', title: '100 Squats', xp: 40, stat: 'force' },
            { id: 'abdos', title: '100 Abdos', xp: 40, stat: 'discipline' },
            { id: 'run', title: '10km Course', xp: 100, stat: 'endurance' },
            { id: 'lecture', title: 'Lecture 30min', xp: 30, stat: 'mental' },
            { id: 'meditation', title: 'Méditation 10min', xp: 30, stat: 'aura' }
        ];
    }

    init() {
        this.setupTabs();
        this.renderAll();
        this.setupEventListeners();
        this.checkStreak();
        this.requestNotify();
        console.log("System : Initialized. System: Arise.");
    }

    setupTabs() {
        // Active le bon panel au clic sur un onglet
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = 'tab-' + btn.dataset.tab;

                // Retirer 'active' de tous les boutons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                // Retirer 'active' de tous les panels
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

                // Ajouter 'active' au bouton cliqué
                btn.classList.add('active');
                // Ajouter 'active' au panel correspondant
                const panel = document.getElementById(tabId);
                if (panel) panel.classList.add('active');
            });
        });
    }

    renderAll() {
        this.renderStatus();
        this.renderPortails();
        this.renderArtefacts();
        this.renderGrimoire();
    }

    renderStatus() {
        const levelEl = document.getElementById('user-level');
        if (levelEl) levelEl.textContent = this.data.level;

        const nextXP = this.data.level * 150;
        const percent = Math.min((this.data.xp / nextXP) * 100, 100);
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.width = percent + '%';

        const xpEl = document.querySelector('.xp-text');
        if (xpEl) xpEl.textContent = this.data.xp + ' / ' + nextXP + ' XP';

        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = Object.entries(this.data.stats).map(([key, val]) =>
                `<div class="stat-item"><span class="stat-name">${key.toUpperCase()}</span><span class="stat-val">${val}</span></div>`
            ).join('');
        }
    }

    renderPortails() {
        const container = document.getElementById('missions-container');
        if (container) {
            container.innerHTML = this.MISSIONS.map(m =>
                `<div class="mission-card">
                    <div class="mission-info">
                        <h3>${m.title}</h3>
                        <span class="xp-badge">+${m.xp} XP</span>
                    </div>
                    <button class="complete-btn" onclick="app.completeMission('${m.id}')">COMPLÉTER</button>
                </div>`
            ).join('');
        }
    }

    renderArtefacts() {
        const container = document.getElementById('badges-container');
        if (container) {
            container.innerHTML = this.BADGES_DB.map(b => {
                const owned = this.data.badges.includes(b.id);
                return `<div class="badge-card ${owned ? 'owned' : 'locked'}">
                    <span class="badge-icon">${b.icon}</span>
                    <div class="badge-info">
                        <span class="badge-name">${b.name}</span>
                        <span class="badge-desc">${b.desc}</span>
                    </div>
                </div>`;
            }).join('');
        }
    }

    renderGrimoire() {
        const container = document.getElementById('history-container');
        if (container) {
            if (this.data.history.length === 0) {
                container.innerHTML = '<p class="empty-history">Aucune aventure pour le moment. Lance-toi !</p>';
            } else {
                container.innerHTML = this.data.history.slice(-14).reverse().map(h =>
                    `<div class="history-entry">
                        <span class="history-date">[${h.date}]</span>
                        <span class="history-text">${h.text}</span>
                        <span class="history-xp">+${h.xp} XP</span>
                    </div>`
                ).join('');
            }
        }
    }

    completeMission(id) {
        const m = this.MISSIONS.find(x => x.id === id);
        if (!m) return;
        this.data.xp += m.xp;
        this.data.stats[m.stat]++;
        this.addHistory('Mission accomplie : ' + m.title, m.xp);
        this.checkLevelUp();
        this.checkBadges();
        this.save();
        this.renderAll();
        this.showRPMessage('Mission accomplie. Vous avez gagné ' + m.xp + ' XP et +1 en ' + m.stat + '.');
    }

    checkLevelUp() {
        const nextXP = this.data.level * 150;
        if (this.data.xp >= nextXP) {
            this.data.level++;
            this.data.xp -= nextXP;
            Object.keys(this.data.stats).forEach(s => this.data.stats[s] += 2);
            this.showRPMessage('LEVEL UP ! Niveau ' + this.data.level + '. Vos limites ont été repoussées.');
            this.checkLevelUp();
        }
    }

    checkBadges() {
        this.BADGES_DB.forEach(b => {
            if (this.data.badges.includes(b.id)) return;
            let met = false;
            if (b.type === 'level' && this.data.level >= b.req) met = true;
            if (b.type === 'mission' && this.data.history.length >= b.req) met = true;
            if (b.type === 'streak' && this.data.streak >= b.req) met = true;
            if (met) {
                this.data.badges.push(b.id);
                this.showRPMessage('NOUVEL ARTEFACT : ' + b.name + ' ! ' + b.icon);
            }
        });
    }

    addHistory(text, xp) {
        const date = new Date().toLocaleDateString('fr-FR');
        this.data.history.push({ date, text, xp });
    }

    save() {
        localStorage.setItem('shadow_muscle_save', JSON.stringify(this.data));
    }

    checkStreak() {
        const today = new Date().toLocaleDateString();
        if (this.data.lastDate === today) return;
        this.data.streak++;
        this.data.lastDate = today;
        this.save();
    }

    showRPMessage(msg) {
        const div = document.createElement('div');
        div.className = 'rp-overlay';
        div.innerHTML = `<div class="rp-box"><p>${msg}</p><button onclick="this.closest('.rp-overlay').remove()">OK</button></div>`;
        document.body.appendChild(div);
    }

    setupEventListeners() {}

    requestNotify() {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
}

const app = new ShadowMuscle();
