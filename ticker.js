//by johnerfx (MIT Licensed)
function checkTicker() {
    var ticker = new XMLHttpRequest();
	ticker.open("GET", "https://api.coinmarketcap.com/v1/ticker/", true);
	ticker.onreadystatechange = function() {
	if (ticker.readyState == 4 && ticker.status == 200) {
    jsonresponse=JSON.parse(ticker.responseText);
		for (i=0;i<jsonresponse.length;i++) {
			if (jsonresponse[i]['id']=='ethereum') {
				var eth_btc=jsonresponse[i]['price_btc'];
				var eth_usd=jsonresponse[i]['price_usd'];
				var eth_percent24h=jsonresponse[i]['percent_change_24h'];
        var eth_marketcap=jsonresponse[i]['market_cap_usd'];
			}
			else if (jsonresponse[i]['id']=='ethereum-classic') {
        var etc_btc=jsonresponse[i]['price_btc'];
				var etc_usd=jsonresponse[i]['price_usd'];
				var etc_percent24h=jsonresponse[i]['percent_change_24h'];
        var etc_marketcap=jsonresponse[i]['market_cap_usd'];
			}
		}
    var sum_usd = eth_usd+etc_usd;
    var sum_btc = eth_btc+etc_btc;
		var eth_etc = etc_usd/eth_usd;
		var lines=["Ethereum(blue) and Etherum Classic(green) price ticker with summary(red).\nPrice taken from 'www.coinmarketcap.com'\n"];
		lines.push("ETHUSD "+eth_usd.toFixed(4).toString()+"$\n");
		lines.push("ETCUSD "+etc_usd.toFixed(4).toString()+"$\n");
		lines.push("USD sum "+sum_usd.toFixed(4).toString()+"$\n");
    lines.push("\n");
		lines.push("ETHBTC "+eth_btc.toFixed(8).toString()+"BTC\n");
		lines.push("ETCBTC "+etc_btc.toFixed(8).toString()+"BTC\n");
		lines.push("USD sum "+sum_btc.toFixed(8).toString()+"BTC\n");
		lines.push("\n");
    lines.push("ETH Marketcap "+eth_marketcap.toLocaleString(window.navigator.language,{ style: 'currency', currency: 'USD'})+"\n");
		lines.push("ETC Marketcap "+etc_marketcap.toLocaleString(window.navigator.language,{ style: 'currency', currency: 'USD'})+"\n");
		lines.push("\n");    
		lines.push("ETCETH="+eth_etc.toFixed(8).toString()+"ETH\n");
		lines.push("ETCETH="+(eth_etc*100).toFixed(2)+"%\n");
		lines.push("\n");
		lines.push(Date());
		var title_lines="";
		for (j=0;j<lines.length;j++) {
			title_lines=title_lines+lines[j];
		}
		chrome.browserAction.setTitle({title:title_lines});
		draw(etc_usd.toFixed(1),eth_usd.toFixed(1),sum_usd.toFixed(1));
		}
	}
ticker.send();
}
function draw(etc_usd,eth_usd,sum_usd) {
	var canv=document.createElement('canvas');
	canv.setAttribute("id", "canvashtml");
	var ctx =canv.getContext('2d');
	ctx.font = "bold 6.2pt Courier";
	ctx.fillStyle = 'blue';
	ctx.fillText(eth_usd, 0, 6);
	ctx.fillStyle = 'green';
	ctx.fillText(etc_usd, 0, 12);
	ctx.fillStyle = 'red';
	ctx.fillText(sum_usd, 0, 18);
	var icon = ctx.getImageData(0, 0, 19,19);
	chrome.browserAction.setIcon({imageData:icon});
	canv.remove();
}
chrome.browserAction.onClicked.addListener(function(activeTab)
    {
          chrome.runtime.reload();
    });
window.setInterval(checkTicker, 240000); //4 minutes
checkTicker();
