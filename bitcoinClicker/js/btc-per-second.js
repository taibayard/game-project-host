var timeOffset = 10;
var timr = 1000/timeOffset;
function addBtc(){
	setInterval(function(){
		let z = game.income.cash;
		game.income.cash += game.upgrades.values.gpu/timeOffset;
		game.stats.totalCashGenerated += game.upgrades.values.gpu/timeOffset;
		if(z != game.income.cash && isNaN(z) === false && z != null && localStorage.length > 0){
			setLocalStorage();
		}
	},timr)
}