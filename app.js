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
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                document.querySelectorAll('.tab-btn, .tab-panel').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(tab).classList.add('active');
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
        
        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = Object.entries(this.data.stats).map(([key, val]) => 
                '<div class="stat-card"><div class="stat-label">' + key.toUpperCase() + '</div><div class="stat-value">' + val + '</div></div>'
            ).join('');
        }
    }

    renderPortails() {
        const container = document.getElementById('missions-container');
        if (container) {
            container.innerHTML = this.MISSIONS.map(m => 
                '<div class="mission-card"><div class="mission-info"><h3>' + m.title + '</h3><p>+' + m.xp + ' XP | +1 ' + m.stat + '</p></div>' +
                '<button class="btn-action" onclick="app.completeMission(\'' + m.id + '\')">COMPLÉTER</button></div>'
            ).join('');
        }
    }

    renderArtefacts() {
        const container = document.getElementById('badges-container');
        if (container) {
            container.innerHTML = this.BADGES_DB.map(b => {
                const owned = this.data.badges.includes(b.id);
                return '<div class="artefact-card ' + (owned ? '' : 'locked') + '"><div class="artefact-icon">' + b.icon + '</div>' +
                       '<div class="artefact-name">' + b.name + '</div><div class="artefact-desc">' + b.desc + '</div></div>';
            }).join('');
        }
    }

    renderGrimoire() {
        const container = document.getElementById('history-container');
        if (container) {
            container.innerHTML = this.data.history.slice(-14).reverse().map(h => 
                '<div class="history-item"><span>[' + h.date + ']</span><span>' + h.text + '</span><span style="color:var(--neon-blue)">+' + h.xp + ' XP</span></div>'
            ).join('');
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
        div.innerHTML = '<div class="rp-box"><p>' + msg + '</p><button onclick="this.parentElement.parentElement.remove()">ACCEPTER</button></div>';
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
