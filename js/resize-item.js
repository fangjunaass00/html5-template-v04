function resizeItem(pattern) {
	pattern = pattern || 'pattern1';
	var obj = {
		designWidth: null,
		designHeight: null
	};

	switch(pattern) {
		case 'pattern1':
			obj.designWidth = 640;
			obj.designHeight = 1038;
			break;
		case 'pattern2':
			obj.designWidth = 640;
			obj.designHeight = 1236;
			break;
	}
	
	this.const_image_width = obj.designWidth;
	this.const_image_height = obj.designHeight;
	this.winWidth = 0;
	this.winHeight = 0;
	this.getSystemInfo();
}

resizeItem.prototype.getSystemInfo = function() {

	// 获取窗口宽度
	if(window.innerWidth) {
		this.winWidth = window.innerWidth.toFixed(2);
	} else if((document.body) && (document.body.clientWidth)) {
		this.winWidth = document.body.clientWidth.toFixed(2);
	}

	// 获取窗口高度
	if(window.innerHeight) {
		this.winHeight = window.innerHeight.toFixed(2);
	} else if((document.body) && (document.body.clientHeight)) {
		this.winHeight = document.body.clientHeight.toFixed(2);
	}
	// 通过深入Document内部对body进行检测，获取窗口大小
	if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		this.winHeight = document.documentElement.clientHeight.toFixed(2);
		this.winWidth = document.documentElement.clientWidth.toFixed(2);
	}
};

// 按照屏幕比例元素进行[变形]缩放，包括位置，大小
// [20,30,40,40]=》[30,60，60,80]（width，left值*1.5，height,top*2）
resizeItem.prototype.resizeItems1 = function(item, width, height, left, top) {
	$(item).css({
		"width": (width / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"height": (height / this.const_image_height * this.winHeight).toFixed(2)+"px",
		"left": (left / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"top": ((top / this.const_image_height) * this.winHeight).toFixed(2)+"px"
	});
};

// 不进行任何缩放，直接使用原尺寸
// [20,30,40,40]=》[20,30,40,40]
resizeItem.prototype.resizeItems2 = function(item, width, height, left, top) {
	$(item).css({
		"width": width.toFixed(2)+"px",
		"height": height.toFixed(2)+"px",
		"left": left.toFixed(2)+"px",
		"top": top.toFixed(2)+"px"
	});
};

// 素材居中放置，宽度按照屏幕宽度计算，高度按照元素材的宽高比计算，水平居中，垂直按照屏幕高度计算
// [20,30,40,40]=》[30,45,305,50]（width,height*1.5,top*1.25）
resizeItem.prototype.resizeItems3 = function(item, width, height, top) {
	var nWidth = width / this.const_image_width * this.winWidth;
	var nHeight = height / width * nWidth;
	var nleft = (this.winWidth - nWidth) / 2;
	var nTop = top / this.const_image_height * this.winHeight;

	$(item).css({
		"width": nWidth.toFixed(2)+"px",
		"height": nHeight.toFixed(2)+"px",
		"left": nleft.toFixed(2)+"px",
		"top": nTop.toFixed(2)+"px"
	});
};

// 尺寸和高度按照指定赋值，左边距和高度按照计算
resizeItem.prototype.resizeItems4 = function(item, width, height, left, top) {
	$(item).css({
		"width": width.toFixed(2)+"px",
		"height": height.toFixed(2)+"px",
		"left": (left / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"top": ((top / this.const_image_height) * this.winHeight).toFixed(2)+"px"
	});
};

// 尺寸和高度按照指定赋值，左边距和底部按照计算
resizeItem.prototype.resizeItems5 = function(item, width, height, left, bottom) {
	$(item).css({
		"width": (width / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"height": (height / this.const_image_height * this.winHeight).toFixed(2)+"px",
		"left": (left / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"bottom": ((top / this.const_image_height) * this.winHeight).toFixed(2)+"px"
	});
};

// 素材居中放置，宽度和高度按照屏幕宽度计，水平居中，垂直按照屏幕高度计算
resizeItem.prototype.resizeItems6 = function(item, width, height, top) {

	var nWidth = width / this.const_image_width * this.winWidth;
	var nHeight = height / this.const_image_height * this.winHeight;
	var nleft = (this.winWidth - nWidth) / 2;
	var nTop = top / this.const_image_height * this.winHeight;

	$(item).css({
		"width": nWidth.toFixed(2)+"px",
		"height": nHeight.toFixed(2)+"px",
		"left": nleft.toFixed(2)+"px",
		"top": nTop.toFixed(2)+"px"
	});
};

// 指定素材的尺寸和位置
resizeItem.prototype.resizeItems7 = function(item, width, height) {
	$(item).css({
		"width": (width / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"height": (height / this.const_image_height * this.winHeight).toFixed(2)+"px"
	});
};

// 重置元素位置，根据原图的位置比例
resizeItem.prototype.resizeLocation = function(item, left, top) {
	$(item).css({
		"left": (left / this.const_image_width * this.winWidth).toFixed(2)+"px",
		"top": ((top / this.const_image_height) * this.winHeight).toFixed(2)+"px"
	});
};

resizeItem.prototype.getDeviceWidth = function(width, wholewidth) {
	if(!arguments[1]) wholewidth = this.winWidth;
	return (width / this.const_image_width * wholewidth).toFixed(2)+"px";
};

resizeItem.prototype.getDeviceHeight = function(height, wholeHeight) {
	if(!arguments[1]) wholeHeight = this.winHeight;
	return (height / this.const_image_height * wholeHeight).toFixed(2)+"px";
};