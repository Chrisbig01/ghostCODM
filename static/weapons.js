
const weapons = [
    {
        id: "kilo141",
        name: "Kilo 141",
        category: "AR",
        label: "ASSAULT RIFLE",
        role: "VERSATILE",
        symbol: "K",
        description: "A balanced rifle for flexible engagements.",
        stats: { damage: 72, accuracy: 78, range: 75, mobility: 68, control: 76 },
        recommendation: {
            multiplayer: {
                title: "Balanced Operator",
                text: "A versatile example build for controlling lanes and supporting your squad."
            },
            br: {
                title: "Long-range Support",
                text: "An example setup focused on stability and sustained engagements."
            }
        },
        attachments: {
            Muzzle: ["Default", "Compensator", "Suppressor"],
            Barrel: ["Default", "Extended Barrel", "Light Barrel"],
            Optic: ["Default", "Red Dot Sight", "Holographic Sight"],
            Underbarrel: ["Default", "Foregrip", "Tactical Foregrip"],
            Stock: ["Default", "Stable Stock", "Light Stock"]
        }
    },
    {
        id: "qq9",
        name: "QQ9",
        category: "SMG",
        label: "SUBMACHINE GUN",
        role: "AGGRESSIVE",
        symbol: "Q",
        description: "A fast weapon concept for close-range combat.",
        stats: { damage: 68, accuracy: 70, range: 48, mobility: 91, control: 64 },
        recommendation: {
            multiplayer: {
                title: "Close-Quarters Assault",
                text: "An example setup for fast movement and aggressive objective play."
            },
            br: {
                title: "Mobile Flanker",
                text: "An example close-range setup for repositioning and supporting pushes."
            }
        },
        attachments: {
            Muzzle: ["Default", "Suppressor", "Compensator"],
            Barrel: ["Default", "Light Barrel", "Extended Barrel"],
            Laser: ["Default", "Tactical Laser", "Aim Laser"],
            Ammunition: ["Default", "Extended Magazine", "Fast Reload Magazine"],
            Stock: ["Default", "Light Stock", "Stable Stock"]
        }
    },
    {
        id: "dlq33",
        name: "DL Q33",
        category: "Sniper",
        label: "SNIPER RIFLE",
        role: "PRECISION",
        symbol: "D",
        description: "A precision weapon concept for long-range coverage.",
        stats: { damage: 96, accuracy: 88, range: 94, mobility: 48, control: 62 },
        recommendation: {
            multiplayer: {
                title: "Precision Anchor",
                text: "An example setup for holding sightlines and covering your team."
            },
            br: {
                title: "Long-range Overwatch",
                text: "An example setup for observation and ranged squad support."
            }
        },
        attachments: {
            Muzzle: ["Default", "Suppressor", "Compensator"],
            Barrel: ["Default", "Extended Barrel", "Light Barrel"],
            Optic: ["Default", "Default Scope", "Alternate Scope"],
            Stock: ["Default", "Stable Stock", "Light Stock"],
            Perk: ["Default", "Faster Reload", "Stability Perk"]
        }
    },
    {
        id: "m4",
        name: "M4",
        category: "AR",
        label: "ASSAULT RIFLE",
        role: "CONTROL",
        symbol: "M",
        description: "A controllable rifle concept for steady engagements.",
        stats: { damage: 66, accuracy: 84, range: 76, mobility: 70, control: 85 },
        recommendation: {
            multiplayer: {
                title: "Steady Defender",
                text: "An example build for holding objectives and maintaining accuracy."
            },
            br: {
                title: "Squad Defender",
                text: "An example build for consistent support during team engagements."
            }
        },
        attachments: {
            Muzzle: ["Default", "Compensator", "Suppressor"],
            Barrel: ["Default", "Extended Barrel", "Light Barrel"],
            Optic: ["Default", "Red Dot Sight", "Holographic Sight"],
            Underbarrel: ["Default", "Foregrip", "Tactical Foregrip"],
            Ammunition: ["Default", "Extended Magazine", "Fast Reload Magazine"]
        }
    }
];

const state = {
    mode: "multiplayer",
    category: "all",
    search: "",
    weaponId: "kilo141",
    builds: {}
};

const weaponList = document.getElementById("weapon-list");
const attachmentList = document.getElementById("attachment-list");

function currentWeapon() {
    return weapons.find(weapon => weapon.id === state.weaponId) || weapons[0];
}

function buildKey() {
    return `${state.mode}:${state.weaponId}`;
}

function currentBuild() {
    const weapon = currentWeapon();
    const key = buildKey();

    if (!state.builds[key]) {
        state.builds[key] = Object.fromEntries(
            Object.keys(weapon.attachments).map(slot => [slot, "Default"])
        );
    }

    return state.builds[key];
}

function renderWeaponList() {
    const filtered = weapons.filter(weapon => {
        const matchesCategory =
            state.category === "all" || weapon.category === state.category;

        const matchesSearch =
            weapon.name.toLowerCase().includes(state.search.toLowerCase()) ||
            weapon.label.toLowerCase().includes(state.search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    document.getElementById("weapon-count").textContent =
        `${filtered.length} WEAPON${filtered.length === 1 ? "" : "S"}`;

    weaponList.innerHTML = "";

    if (filtered.length === 0) {
        weaponList.innerHTML =
            '<p class="empty-results">No weapons found. Try another search or category.</p>';
        return;
    }

    filtered.forEach(weapon => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "weapon-option";

        if (weapon.id === state.weaponId) {
            button.classList.add("selected");
        }

        const symbol = document.createElement("span");
        symbol.className = "weapon-symbol";
        symbol.textContent = weapon.symbol;

        const info = document.createElement("span");
        const name = document.createElement("strong");
        name.textContent = weapon.name;

        const type = document.createElement("small");
        type.textContent = weapon.label;

        info.append(name, type);
        button.append(symbol, info);

        button.addEventListener("click", () => {
            state.weaponId = weapon.id;
            renderAll();
        });

        weaponList.appendChild(button);
    });
}

function renderStats() {
    const weapon = currentWeapon();

    const labels = {
        damage: "stat-damage",
        accuracy: "stat-accuracy",
        range: "stat-range",
        mobility: "stat-mobility",
        control: "stat-control"
    };

    Object.entries(labels).forEach(([key, elementId]) => {
        document.getElementById(elementId).textContent = weapon.stats[key];
        document.getElementById(`bar-${key}`).style.width =
            `${weapon.stats[key]}%`;
    });
}

function renderAttachments() {
    const weapon = currentWeapon();
    const build = currentBuild();

    attachmentList.innerHTML = "";

    Object.entries(weapon.attachments).forEach(([slot, options]) => {
        const wrapper = document.createElement("div");
        wrapper.className = "attachment-slot";

        const label = document.createElement("label");
        const selectId = `attachment-${slot.toLowerCase()}`;
        label.htmlFor = selectId;
        label.textContent = slot.toUpperCase();

        const select = document.createElement("select");
        select.id = selectId;
        select.setAttribute("aria-label", `${slot} attachment`);

        options.forEach(option => {
            const item = document.createElement("option");
            item.value = option;
            item.textContent = option;

            if (option === build[slot]) {
                item.selected = true;
            }

            select.appendChild(item);
        });

        select.addEventListener("change", () => {
            build[slot] = select.value;
            updateBuildName();
        });

        wrapper.append(label, select);
        attachmentList.appendChild(wrapper);
    });

    document.getElementById("slot-counter").textContent =
        `${Object.keys(weapon.attachments).length} SLOTS`;

    updateBuildName();
}

function updateBuildName() {
    const build = currentBuild();
    const chosen = Object.values(build).filter(value => value !== "Default");

    let name = "Balanced Operator";

    if (chosen.length === 0) {
        name = "Default Configuration";
    } else if (chosen.some(value => value.includes("Suppressor"))) {
        name = "Stealth Configuration";
    } else if (chosen.some(value => value.includes("Light"))) {
        name = "Agile Configuration";
    } else if (chosen.some(value => value.includes("Foregrip"))) {
        name = "Control Configuration";
    } else {
        name = "Custom Operator";
    }

    document.getElementById("build-name").textContent = name;
}

function renderRecommendation() {
    const weapon = currentWeapon();
    const recommendation = weapon.recommendation[state.mode];

    document.getElementById("recommendation-title").textContent =
        recommendation.title;

    document.getElementById("recommendation-text").textContent =
        recommendation.text;
}

function renderAll() {
    const weapon = currentWeapon();

    renderWeaponList();

    document.getElementById("weapon-category").textContent = weapon.label;
    document.getElementById("weapon-name").textContent = weapon.name;
    document.getElementById("weapon-description").textContent =
        weapon.description;
    document.getElementById("weapon-role").textContent = weapon.role;
    document.getElementById("weapon-mode").textContent =
        state.mode === "multiplayer" ? "MULTIPLAYER BUILD" : "BATTLE ROYALE BUILD";
    document.getElementById("weapon-emblem").textContent = weapon.symbol;

    document.querySelectorAll(".mode-btn").forEach(button => {
        button.classList.toggle("selected", button.dataset.mode === state.mode);
    });

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.category === state.category
        );
    });

    renderStats();
    renderAttachments();
    renderRecommendation();
}

document.querySelectorAll(".mode-btn").forEach(button => {
    button.addEventListener("click", () => {
        state.mode = button.dataset.mode;
        renderAll();
    });
});

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        state.category = button.dataset.category;
        renderAll();
    });
});

document.getElementById("weapon-search").addEventListener("input", event => {
    state.search = event.target.value;
    renderWeaponList();
});

document.getElementById("reset-build").addEventListener("click", () => {
    delete state.builds[buildKey()];
    renderAttachments();
});

renderAll();
