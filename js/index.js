(function(){
	//IIFE
	var $imgs = $("#imgs ul li");
	var $circles = $("#circles ol li");
	var $carousel = $("#carousel");

	$maoni = $("<li class = 'maoni'></li>").appendTo($("#imgs ul"));
	$(".close").click(function(){
		$(this).parent().fadeOut(1000);

	})
	//当页面加载完毕之后让第一个蒙版出现
	$(".mask").fadeOut(0).stop(true).fadeIn(1000);

	//将图片拆分成18张
	var arr = (function(){
		var temp = [];
		for (var i = 0; i < 3; i ++){
			for (var j = 0; j < 6; j++){
				temp.push($("<div></div>").css({
					"width": 0,
					"height": 0,
				
					"background": "url(images/slider-img2.jpg) no-repeat " + j * -138.33 + "px " + i * -143.67 + "px",
					"position": "absolute",
					"left": j * 138.33,
					"top": i * 143.67

				}).appendTo($maoni));
			}
		}
		return temp;

	})();
	var small_idx = 0;
	var big_idx = 0;
	var lock = true;
// 定时器
	var timer = setInterval(function(){
		small_idx ++;
		if (small_idx > $imgs.length -1) {
			small_idx = 0;
		}
		console.log(small_idx);

// call 改变change函数的this指向

		change.call($circles.eq(small_idx));

	} ,6000)
// 清除定时器
	$carousel.mouseenter(function(){
		clearInterval(timer);
	});
	$carousel.mouseleave(function(){
		clearInterval(timer);
		timer = setInterval(function(){
			small_idx++;
			if (small_idx >$imgs.length - 1) {
                small_idx = 0;
			};

			console.log(small_idx);

			// 要改变函数的指向呢
				change.call($circles.eq(small_idx));
		},6000)
	});


		console.log(6666)

	$circles.click(change);
	function change(){
		if (!lock) {
			return ;
		}
		lock = false;
		// 加深对锁的理解
		
		small_idx  = $(this).index();

		if (small_idx == big_idx) {
			lock= true;
			return;
		}
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".mask").eq(big_idx).stop(true).fadeOut(1000);
		$maoni.addClass("active");
		//轮换猫腻图
		$.each(arr,function(index,value){
			value.css("background-image","url(images/slider-img"+ (small_idx + 1) + ".jpg)").animate({
				"width":138.33,
				"height":143.67

			}, 300 + Math.random() * 3000);

		});

		setTimeout(function(){
			//延时器在所有的动画完成之后添加
			$.each(arr,function(index,value){
				value.css({
					"width": 0,
					"height": 0
				})
			});
			big_idx = small_idx;

			$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");


			$(".mask").eq(big_idx).fadeOut(0).fadeIn(1000);
			lock = true;
		}, 3300)



	}



})()