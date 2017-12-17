var storageHandler = function(gameObj, storageObj) {
    let z = parseFloat(localStorage.getItem(storageObj));
    switch (true) {
        case isNaN(z):
            localStorage.setItem(storageObj, gameObj);
            break;
        case gameObj > z:
            localStorage.setItem(storageObj, gameObj);
            break;
        case gameObj < z:
            localStorage.setItem(storageObj, gameObj);
            return gameObj;
            break;
    }
    return gameObj;
}

function loadLocalStorage() {
    if (localStorage.length > 0) {
        game.income.cash = localStorage.getItem("currentCash");
        game.income.clickWorth = parseFloat(localStorage.getItem("clickWorth"));
        game.stats.cashFromClicks = localStorage.getItem("cashFromClicks");
        game.stats.totalCashGenerated = localStorage.getItem("totalEarnedCash");
        console.log("Loaded cash storage");
        game.stats.clicks = localStorage.getItem("totalClicks");
        console.log("Loaded click storage");
        game.upgrades.perClick.total = parseFloat(localStorage.getItem("perClick_total"));
        game.upgrades.perClick.cost = parseFloat(localStorage.getItem("perClick_cost"));
        game.upgrades.perClick.value = parseFloat(localStorage.getItem("perClick_value"));
        //loaded click upgrade storage
        game.upgrades.gpu.total = parseFloat(localStorage.getItem("gpu_total"));
        game.upgrades.gpu.cost = parseFloat(localStorage.getItem("gpu_cost"));
        game.upgrades.gpu.value = parseFloat(localStorage.getItem("gpu_value"));
        //loaded gpu upgrade storage
        game.upgrades.values.perClick = parseFloat(localStorage.getItem("upgradeValue_perClick"));
        game.upgrades.values.gpu = parseFloat(localStorage.getItem("upgradeValue_gpu"));
        console.log("Loaded upgrade storage");
    }
    setLocalStorage();
}

function setLocalStorage() {
    //handle storage for clicks
    handleClickStorage();
    //handle storage for cash
    handleCashStorage();
    //handle storage for upgrades
    handleUpgradeStorage();
}

function handleCashStorage() {
    //handling current cash
    game.income.cash = round(parseFloat(game.income.cash), roundOffset);
    game.income.cash = storageHandler(game.income.cash, "currentCash");
    cashLabel.innerText = game.income.cash;
    //handles memeory for profit from click history
    game.stats.cashFromClicks = round(parseFloat(game.stats.cashFromClicks), roundOffset);
    game.stats.cashFromClicks = storageHandler(game.stats.cashFromClicks, "cashFromClicks");
    clickProfitLabel.innerText = game.stats.cashFromClicks;
    //handles memory for total earned
    game.stats.totalCashGenerated = round(parseFloat(game.stats.totalCashGenerated), roundOffset);
    game.stats.totalCashGenerated = storageHandler(game.stats.totalCashGenerated, "totalEarnedCash");
    totalProfitLabel.innerText = game.stats.totalCashGenerated;
    //handles memory for click worth
    game.income.clickWorth = storageHandler(game.income.clickWorth, "clickWorth");
    game.income.clickWorth = round(game.income.clickWorth, roundOffset);
    clickWorthLabel.innerText = game.income.clickWorth;
}

function handleClickStorage() {
    //handles memory for total click history
    game.stats.clicks = storageHandler(game.stats.clicks, "totalClicks");
    clickCount.innerText = game.stats.clicks;
}

function handleUpgradeStorage() {
    clickUpgradeStorage();
    gpuUpgradeStorage();
    upgradeValueStorage();
}

function clickUpgradeStorage() {
    let perclick = game.upgrades.perClick;
    //handles click upgrade memory
    perclick.total = storageHandler(perclick.total, "perClick_total");
    perclick.cost = storageHandler(perclick.cost, "perClick_cost");
    perclick.value = storageHandler(perclick.value, "perClick_value");
    game.upgrades.perClick = perclick;
    setUpgradeDOM(perClickUpgrade, perclick);
}

function gpuUpgradeStorage() {
    let gpu = game.upgrades.gpu;
    //handles click upgrade memory
    gpu.total = storageHandler(gpu.total, "gpu_total");
    gpu.cost = storageHandler(gpu.cost, "gpu_cost");
    gpu.value = storageHandler(gpu.value, "gpu_value");
    game.upgrades.gpu = gpu;
    setUpgradeDOM(gpuUpgrade, gpu);
}

function upgradeValueStorage() {
    let rootDir = game.upgrades.values;
    rootDir.perClick = storageHandler(rootDir.perClick, "upgradeValue_perClick");
    rootDir.gpu = storageHandler(rootDir.gpu, "upgradeValue_gpu");
}

function setUpgradeDOM(e, obj) {
    e.getElementsByClassName("upgrade-cost")[0].innerText = obj.cost;
    e.getElementsByClassName("upgrade-val")[0].innerText = obj.value;
    e.getElementsByTagName("a")[0].innerText = obj.total;
}