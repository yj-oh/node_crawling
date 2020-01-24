const axios   = require('axios');
const cheerio = require('cheerio');

const searchKeyword = "디지털 헬스케어";
const encodeSearchKeyword = encodeURI(searchKeyword);
const url = "https://www.google.com/search?hl=en&tbm=nws&tbs=sbd:1,nsd:1,qdr:d&q=" + encodeSearchKeyword;

const getHtml = async () => {
	try {
		return await axios.get(url);
	} catch(error) {
		console.log(error);
	}
};

getHtml().then(html => {
	const $ = cheerio.load(html.data);
	let json;
	let contents = [];
	let number = 1;

	const el = $("div").children().children().children();

	let arr = [];
	el.each(function() {
		let date = $(this).children("span.rQMQod").text();
		if (date.length !== 0) {
			arr.push(date);
		}
	});

	getJson(arr);

	function getJson(arr) {
		el.each(function () {
			let title = $(this).children(".BNeawe.vvjwJb").text();
			let press = $(this).children(".BNeawe.UPmit").text();

			if (title.length === 0) return;

			let news = {
				no    : number,
				title : title,
				press : press,
				date  : arr[number - 1]
			};

			contents.push(news);
			number++;
		});
		let article = {
			contents : contents
		};
		json = JSON.stringify(article);
		console.log(json);

		return json;
	}

});