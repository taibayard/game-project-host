const coin = document.getElementsByClassName("bitcoin-wrapper")[0];
/*stats*/
const clickCount = document.getElementsByClassName("click-count")[0].getElementsByTagName("a")[0];
const cashLabel = document.getElementsByClassName("current-cash")[0].getElementsByTagName("a")[0];
const clickProfitLabel = document.getElementsByClassName("click-profit")[0].getElementsByTagName("a")[0];
const totalProfitLabel = document.getElementsByClassName("total-profit")[0].getElementsByTagName("a")[0];
const clickWorthLabel = document.getElementsByClassName("click-worth")[0].getElementsByTagName("a")[0];
/*upgrades*/
const perClickUpgrade = document.getElementsByClassName("per-click-upgrade")[0];
const gpuUpgrade = document.getElementsByClassName("gpu-upgrade")[0];
/*game data*/
let roundOffset = 4;
let game = {
    income: {
        cash: 0,
        clickMultiplier: 1,
        clickWorth: 0.001
    },
    stats: {
        clicks: 0,
        cashFromClicks: 0,
        totalCashGenerated: 0
    },
    upgrades: {
        values: {
            perClick: 0,
            gpu: 0
        },
        perClick: {
            total: 0,
            cost: 0.005,
            value: 0.001
        },
        gpu: {
            total: 0,
            cost: 1,
            value: 0.050
        }
    }
}

var round = function(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var coinClick = function() {
    game.income.cash += (game.income.clickWorth * game.income.clickMultiplier)
    game.stats.cashFromClicks += (game.income.clickWorth * game.income.clickMultiplier);
    game.stats.totalCashGenerated += (game.income.clickWorth * game.income.clickMultiplier);
    game.stats.clicks++;
    setLocalStorage();
}
var upgradeClick = function(u, el, d) {
    let upgrade = game.upgrades[u];
    upgrade.total++;
    if (upgrade.total >= 10) {
        upgrade.cost += upgrade.cost * 1.05;
        upgrade.cost = round(upgrade.cost, roundOffset);
        upgrade.value += upgrade.value * 1;
        upgrade.value = round(upgrade.value, roundOffset);
    } else {
        upgrade.cost += upgrade.cost * 1.05;
        upgrade.cost = round(upgrade.cost, roundOffset);
        upgrade.value += upgrade.value * 0.2;
        upgrade.value = round(upgrade.value, roundOffset);
    }
    el.getElementsByClassName("upgrade-cost")[0].innerText = upgrade.cost;
    el.getElementsByTagName("a")[0].innerText = upgrade.total;
    el.getElementsByClassName("upgrade-val")[0].innerText = upgrade.value;
    game.income.cash = d;
    cashLabel.innerText = d;
    game.upgrades.values[u] += upgrade.value;
    return upgrade;
}

function setClickAnimation(e) {
    e.style.setProperty("transform", "scale(1.1)");
}

function resetClickAnimation(e) {
    e.style.setProperty("transform", "scale(1)");
}

function addEvents() {
    coin.addEventListener("mousedown", function() {
        setClickAnimation(this);
        coinClick();
    })
    coin.addEventListener("mouseup", function() {
        resetClickAnimation(this);
    })
    perClickUpgrade.addEventListener("click", function() {
        let diff = round((game.income.cash - game.upgrades.perClick.cost), roundOffset);
        if (diff >= 0) {
            game.upgrades.perClick = upgradeClick("perClick", this, diff);
            game.income.clickWorth += game.upgrades.perClick.value;
            setLocalStorage();
        }
    })
    gpuUpgrade.addEventListener("click", function() {
        let diff = round((game.income.cash - game.upgrades.gpu.cost), roundOffset);
        if (diff >= 0) {
            game.upgrades.gpu = upgradeClick("gpu", this, diff);
            setLocalStorage();

        }
    })

}
window.onload = function() {
    loadLocalStorage();
    addEvents();
    addBtc();
}