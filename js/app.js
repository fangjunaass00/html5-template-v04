// 专门存放各种数据的model，包括用户数据，较为重要的临时变量等等，一旦某个数据会被多个函数调用，最好就将其放入其中。你可以将其认知为一个数据仓库。
var appModel = {
	loadImgArr: [
		
	],
	imgLoader: null,
	musicFlag: true,
	dataMenuShareTimelineModel: {
		title: "迪奥为你庆生 臻献生日专属惊喜",
		content: "获取你的Dior迪奥生日尊享献礼",
		imgurl: "http://alicdn.herdsric.com/diorMCD3/diorpic5/share/share-diorSw-f.png",
		link: "http://diorbd.herdsric.com/dior_userbirthday/diorSw-f/index.do",
	},
	ajaxLinkUrl: {
		// 获取微信接口权限
		gotoWechatOrderDetail: "http://diorbd.herdsric.com/dior_userbirthday/getJsSignatureJson.do",
		getUserInfo: "http://diorbd.herdsric.com/dior_userbirthday/getUserInfo.do"
	},
};

// controller负责数据的抽取和通知view去渲染，起到中转站的作用。
var appController = {
	init: function() {
		appView.init();
		//appController.getCorpJsSignatureJson();
		appModel.imgLoader = new imageLoad();
		appController.startLoading();
	},
	// 微信的启动方法
	getCorpJsSignatureJson: function() {
		$.ajax({
			type: "post",
			url: appModel.ajaxLinkUrl.gotoWechatOrderDetail,
			dataType: "json",
			data: {
				"parameter": window.location.href
			},
			success: function(data) {
				if(!!data) {
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: data.appId, // 必填，公众号的唯一标识
						timestamp: data.timestamp, // 必填，生成签名的时间戳
						nonceStr: data.noncestr, // 必填，生成签名的随机串
						signature: data.signature, // 必填，签名，见附录1
						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
					});

					wx.ready(function() {
						console.log("weixin ready")
						appController.initWechatMenuShare();
					});
				}
			},
			complete: function() {},
			error: function(data2) {

			}
		});
	},
	initWechatMenuShare: function() {
		var article = appController.getShareMessage();
		var title = article.title;
		var content = article.content;
		var link = article.link;
		var imgurl = article.imgurl;

		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: link, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {},
			cancel: function() {},
			trigger: function() {}
		});
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: content, // 分享描述
			link: link, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {},
			cancel: function() {},
			trigger: function() {}
		});
	},
	getShareMessage: function() {
		return appModel.dataMenuShareTimelineModel;
	},
	startLoading: function() {
		// 初始化loading，如果想用默认loading，只需要将这里的代码注释掉，在callback里面写上endLoading的方法即可
		//		var load = new loadingTool();
		//		load.loading()

		appModel.imgLoader.queueImage(appModel.loadImgArr).imageLoadingProgressCallback(function(a) {

				var a = Math.floor(a); // 获取当前载入图片的百分比
				// 按照当前的百分比可以执行自定义操作
				appView.setProgress(a)
			},
			function() {
				appView.endLoading();
			}
		);
	},
	setMusicFlag: function(flag) {
		appModel.musicFlag = flag;
	},
	getMusicFlag: function() {
		return appModel.musicFlag;
	}

};

// view负责渲染对应的元素
var appView = {
	$loading: $("#loading"),
	$progress: $(".progress span"),
	$s1: $("#s1"),
	$card: $(".card"),
	$nextBtn: $(".card__sec1--next-btn"),
	$bgMusicAudio: $("#main-music"),
	$music: $(".music"),
	init: function() {
		appView.resizeItems();
		appView.initNextBtn();
		appView.audioAutoPlay();
	},
	setProgress: function(per) {
		appView.$progress.html(per + "%")
	},
	endLoading: function() {
		appView.$loading.remove();
		appView.$s1.show();
	},
	resizeItems: function() {
		var re = new resizeItem();
		// re.getSystemInfo();
		// 音乐
		re.resizeLocation('.music', 569, 95);

		re.resizeItems1('.item1', 200, 200, 219, 412);
	},
	initNextBtn: function() {
		appView.$nextBtn.click(function() {
			let index = $(this).parent().parent().index();
			if(index == 2) {
				return;
			}
			appView.$card.eq(index).hide();
			appView.$card.eq(index + 1).show();
		});
	},
	audioAutoPlay: function() {
		// 自动播放
		appView.$bgMusicAudio[0].muted = true;
		document.addEventListener("WeixinJSBridgeReady", function() { //微信
			appView.$bgMusicAudio[0].play();
		}, false);

		// 为音乐添加点击事件
		appView.$music.click(function() {
			appView.toggleMusic();
		});
	},
	plyaMusic: function(name) {
		appView[name][0].muted = false;
		appView[name][0].currentTime = 0;
		appView[name][0].play();
		appView[name][0].volume = 1;
	},
	pauseMusic: function(name) {
		appView[name][0].pause();
	},
	toggleMusic: function() {
		if(appController.getMusicFlag() == true) {
			appController.setMusicFlag(false);
			appView.pauseMusic("$bgMusicAudio");
			appView.$music.removeClass("music-playing").addClass("music-pause");

		} else {
			appController.setMusicFlag(true);
			appView.plyaMusic("$bgMusicAudio");
			appView.$music.removeClass("music-pause").addClass("music-playing");
		}
	},
};

$(document).ready(function() {
	appController.init();
	//appView.plyaMusic("$bgMusicAudio");
	new horizontalHint();
});