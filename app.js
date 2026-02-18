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
            // === BOXE ===
            { id: 'shadow_boxing', title: '15 min Shadow Boxing', xp: 200, stat: 'aura' },
            { id: 'sac_de_frappe', title: '3 rounds Sac de Frappe (3 min)', xp: 220, stat: 'aura' },
            { id: 'corde_a_sauter', title: '10 min Corde à Sauter', xp: 180, stat: 'endurance' },
            // === MUSCU HAUT DU CORPS ===
            { id: 'pompes', title: '100 Pompes', xp: 200, stat: 'force' },
            { id: 'tractions', title: '50 Tractions', xp: 250, stat: 'force' },
            { id: 'dips', title: '80 Dips (triceps)', xp: 210, stat: 'force' },
            { id: 'developpe_couche', title: '4x10 Développé Couché', xp: 230, stat: 'force' },
            { id: 'tirage_vertical', title: '4x12 Tirage Vertical', xp: 220, stat: 'force' },
            { id: 'rowing_haltere', title: '4x10 Rowing Haltère', xp: 215, stat: 'force' },
            // === MUSCU BAS DU CORPS ===
            { id: 'squats', title: '4x15 Squats Barre', xp: 230, stat: 'endurance' },
            { id: 'fentes', title: '3x12 Fentes Marchées', xp: 200, stat: 'endurance' },
            { id: 'mollets', title: '4x20 Extensions Mollets', xp: 170, stat: 'endurance' },
            // === ABDOS & GAINAGE ===
            { id: 'abdos', title: '150 Abdominaux', xp: 180, stat: 'discipline' },
            { id: 'gainage', title: '5 min Gainage Total', xp: 175, stat: 'mental' },
            { id: 'russian_twist', title: '3x20 Russian Twist', xp: 170, stat: 'discipline' },
            // === CARDIO ===
            { id: 'course', title: '5 km Course', xp: 240, stat: 'endurance' },
            { id: 'burpees', title: '50 Burpees', xp: 220, stat: 'endurance' },
            { id: 'hiit', title: '20 min HIIT', xp: 250, stat: 'endurance' }
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
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                const tabId = 'tab-' + tabName;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
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
        const levelEl = document.getElementById('currentLevel');
        if (levelEl) levelEl.textContent = this.data.level;
        const rankEl = document.getElementById('rank');
        if (rankEl) rankEl.textContent = this.getRankName(this.data.level);
        const streakEl = document.getElementById('streakCount');
        if (streakEl) streakEl.textContent = this.data.streak;
        const nextXP = this.data.level * 500;
        const percent = Math.min((this.data.xp / nextXP) * 100, 100);
        const fill = document.getElementById('xpProgress');
        if (fill) fill.style.width = percent + '%';
        const xpText = document.getElementById('xpText');
        if (xpText) xpText.textContent = `${this.data.xp} / ${nextXP} XP`;
        for (const [stat, val] of Object.entries(this.data.stats)) {
            const el = document.getElementById(stat);
            if (el) el.textContent = val;
        }
    }

    getRankName(level) {
        if (level >= 50) return 'S - Shadow Monarch';
        if (level >= 30) return 'A - National';
        if (level >= 15) return 'B - Élite';
        if (level >= 5) return 'C - Chasseur';
        return 'E - Débutant';
    }

    renderPortails() {
        const dailyContainer = document.getElementById('dailyMissions');
        if (dailyContainer) {
            dailyContainer.innerHTML = this.MISSIONS.map(m => `
                <div class="mission">
                    <span>${m.title} <span class="xp-badge">+${m.xp} XP</span></span>
                    <button class="mission-btn" onclick="app.completeMission('${m.id}')">COMPLÉTER</button>
                </div>
            `).join('');
        }
    }

    renderArtefacts() {
        const container = document.getElementById('badgesContainer');
        if (container) {
            container.innerHTML = this.BADGES_DB.map(b => {
                const owned = this.data.badges.includes(b.id);
                return `
                    <div class="badge-card ${owned ? '' : 'locked'}">
                        <span class="badge-icon">${b.icon}</span>
                        <div class="badge-name">${b.name}</div>
                        <div class="badge-desc">${b.desc}</div>
                    </div>
                `;
            }).join('');
        }
    }

    renderGrimoire() {
        const container = document.getElementById('historyContainer');
        if (container) {
            if (this.data.history.length === 0) {
                container.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;">Aucun historique pour le moment.</p>';
            } else {
                container.innerHTML = this.data.history.slice(-10).reverse().map(h => `
                    <div class="history-day success">
                        <span class="history-date">[${h.date}] ${h.text}</span>
                        <span>+${h.xp} XP</span>
                    </div>
                `).join('');
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
        this.showRPMessage(`Mission terminée. +${m.xp} XP gagnés.`);
    }

    addHistory(text, xp) {
        const date = new Date().toLocaleDateString('fr-FR');
        this.data.history.push({ date, text, xp });
    }

    checkLevelUp() {
        const nextXP = this.data.level * 500;
        if (this.data.xp >= nextXP) {
            this.data.xp -= nextXP;
            this.data.level++;
            for (const stat in this.data.stats) {
                this.data.stats[stat] += 2;
            }
            this.showLevelUp(this.data.level);
            this.checkLevelUp();
        }
    }

    showLevelUp(level) {
        const popup = document.getElementById('levelUpPopup');
        const text = document.getElementById('levelUpText');
        if (popup && text) {
            text.textContent = `Niveau ${level} atteint ! Tes stats augmentent.`;
            popup.classList.remove('hidden');
        }
    }

    checkBadges() {
        this.BADGES_DB.forEach(b => {
            if (this.data.badges.includes(b.id)) return;
            let met = false;
            if (b.type === 'level' && this.data.level >= b.req) met = true;
            if (b.type === 'mission' && this.data.history.length >= b.req) met = true;
            if (met) {
                this.data.badges.push(b.id);
                this.showBadgePopup(b);
            }
        });
    }

    showBadgePopup(badge) {
        const popup = document.getElementById('badgePopup');
        const text = document.getElementById('badgePopupText');
        if (popup && text) {
            text.innerHTML = `Artefact Débloqué : ${badge.icon} ${badge.name}<br>${badge.desc}`;
            popup.classList.remove('hidden');
        }
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
        const container = document.getElementById('rpMessages');
        if (container) {
            container.innerHTML = `<p class="rp-message">${msg}</p>`;
        }
    }

    setupEventListeners() {
        const closeLevel = document.getElementById('closePopup');
        if (closeLevel) closeLevel.onclick = () => document.getElementById('levelUpPopup').classList.add('hidden');
        const closeBadge = document.getElementById('closeBadgePopup');
        if (closeBadge) closeBadge.onclick = () => document.getElementById('badgePopup').classList.add('hidden');
        const addBtn = document.getElementById('addMission');
        if (addBtn) {
            addBtn.onclick = () => {
                const input = document.getElementById('newMission');
                if (input && input.value) {
                    this.completeMissionCustom(input.value);
                    input.value = '';
                }
            };
        }
    }

    completeMissionCustom(name) {
        this.data.xp += 150;
        this.addHistory('Mission Perso : ' + name, 150);
        this.checkLevelUp();
        this.save();
        this.renderAll();
        this.showRPMessage('Mission personnalisée terminée. +150 XP.');
    }

    requestNotify() {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
}
const app = new ShadowMuscle();
