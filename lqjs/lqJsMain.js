$(function(){
/*
 * 首页
 */
// 设定日期
	var curDate = new Date();
	$("#year").html(curDate.getFullYear());
	$("#month").html(curDate.getMonth()+1);
	$("#day").html(curDate.getDate());

// 动态获取系统时间
	function current(){ 
		var d=new Date(),str=''; 
		str +=d.getHours()+' : '; 
		str +=d.getMinutes()+' : '; 
		str +=d.getSeconds(); 
		return str; 
	} 
	setInterval(function(){$("#curTime").html(current)},1000); 

	//通过调用新浪IP地址库接口查询用户当前所在国家、省份、城市、运营商信息
	// $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
    //		$("#city").html(", "+remote_ip_info.city);
    //	});

// 顶部微信操作
	$(".weixinIco").hover(function() {
		$(".wxErweima").show();
		$(".wxErweima").hover(function() {
			$(this).show();
		},function() {
			$(this).hide();
		})
	}, function() {
		$(".wxErweima").hide();
	})

// 搜索框效果
	$("#searchOver").focus(function(){
		$(this).attr('value','');
	}).blur(function(){
		$(this).attr('value','试着搜索一下吧');
	})

// 常用网址盒子隐藏
	$(".freqWebtn").click(function() {
		$('.freqWebHide').toggle();
		$(".freqWebHide").hover(function() {
			$(this).show();
		},function() {
			$(this).hide();
		})
	})

// 导航栏效果
	$(".navBox > li.navli").hover(function(){
		$(this).children('.navh3').addClass('navSeclected');
		$(this).children('.menuChildBox').show();
	},function(){
		$(this).children('.navh3').removeClass('navSeclected');
		$(this).children('.menuChildBox').hide();
	})
	$("li.menuChild").hover(function(){
		$(this).css("z-index","96").siblings('li.menuChild').css("z-index","95");
		$(this).find('.depTh2').removeClass('depTh2').addClass('depTh2_hover')
							   .css({'color':'white','textDecoration':'none'});
		$(this).find('.itemBox').removeClass('itemBox').addClass('itemBox_hover');
	},function(){
		$(this).find('.depTh2_hover').removeClass('depTh2_hover').addClass('depTh2')
							   .css('color','#00B1C1');
		$(this).find('.itemBox_hover').removeClass('itemBox_hover').addClass('itemBox');
	})

// 焦点图轮播效果
	var smallPicLen = $(".SmallPicList > li").length; //焦点图图片个数（小图）
	var iNow = 0;
	var t = null;	
	//右下角两组小图切换
	$("a.focusNextBtn").click(function(){ 
		var totalLength = $(".SmallPicList").width();
		var singleLength = $(".focusSmallPic").width()+3;
		var showLength = parseInt($(".SmallPicList").css("left"));	
		if(showLength==0){
			$(".SmallPicList").css("left",-(singleLength*7)+"px");
		}
		if(showLength== -totalLength/2){
			$(".SmallPicList").css("left","0px");
		}
		clearInterval(t);
	})
	// 鼠标移入停止轮播与移出开启轮播
	$(".msVedioFocus").mouseover(function(){
		clearInterval(t);
	})
	$(".msVedioFocus").mouseout(function(){
		timeFocus();
	})
	// 焦点图轮播切换函数
	function focusPicChange(index){
		var smallPicNum = $(".SmallPicList").find("li.focusSmallPic").length;
		for(var i=0;i<smallPicNum;i++){
			$(".focusPicList > li").eq(i).removeClass('focusPicHover');
			$(".focusTitleList >").eq(i).find("a").removeClass('focusTitleHover');
			$(".SmallPicList > li").eq(i).find("a").removeClass('smallPicHover');
		}
		$(".focusPicList > li").eq(index).addClass('focusPicHover');
		$(".focusTitleList > li").eq(index).find("a").addClass('focusTitleHover');
		$(".SmallPicList > li").eq(index).find("a").addClass('smallPicHover');
	}
	// 鼠标移入小图切换大图及标题
	$(".focusSmallPic").hover(function(){
		iNow = $(this).index();
		for(var j=0;j<smallPicLen;j++){
			$(".focusTitleList > li").eq(j).find("a").removeClass('focusTitleHover');
		}
		focusPicChange(iNow);
	},function(){
		return false;
	})
	// 自动轮播切换效果
	for(var i=0;i<smallPicLen;i++){
		$(".SmallPicList > li").eq(i).index(i);
		$(".SmallPicList > li").eq(i).find("a").mouseover = function(){
			iNow  = $(this).index();
			focusMove(iNow);
		}
	}
	timeFocus();// 默认自动运行轮播
	// 轮播切换定时器函数
	function timeFocus(){
		t=setInterval(function(){
			iNow++;
			if(iNow>smallPicLen-1){
				iNow=0;
			}
			for(var j=0;j<smallPicLen;j++){
				$(".focusTitleList > li").eq(j).find("a").removeClass('focusTitleHover');
			}
			focusMove(iNow);
		},2000)
	}
	// 切换函数
	function focusMove(index){
		var totalLength = $(".SmallPicList").width();
		var singleLength = $(".focusSmallPic").width()+3;
		var showLength = parseInt($(".SmallPicList").css("left"));	
		if(iNow>6){
			$(".SmallPicList").css("left",-(singleLength*7)+"px");	
		}
		if(iNow<6){
			$(".SmallPicList").css("left","0px");
		}
		for(var n=0;n<smallPicLen;n++){
			$(".focusPicList > li").eq(n).removeClass('focusPicHover');
			$(".focusTitleList >").eq(n).find("a").removeClass('focusTitleHover');
			$(".SmallPicList > li").eq(n).find("a").removeClass('smallPicHover');
		}
		$(".focusPicList > li").eq(index).addClass('focusPicHover');
		$(".focusTitleList > li").eq(index).find("a").addClass('focusTitleHover');
		$(".SmallPicList > li").eq(index).find("a").addClass('smallPicHover');
	}

// 圆形焦点图片展示效果
	$(".bpShow > li").hover(function(){
		var bpShowPicNum = $(".bpShow > li").length;
		for(var i=0;i<bpShowPicNum;i++){
			$(".bpShow > li").eq(i).removeClass("bpShowActive").find("img").removeClass("bpLinkActive")
			.parent("li").find("a").removeClass("bpMarkActive");
		}
		$(this).addClass("bpShowActive").find("img").addClass("bpLinkActive")
			.parent("li").find("a").addClass("bpMarkActive");
	},function(){
		$(this).removeClass("bpShowActive").find("img").removeClass("bpLinkActive")
			.parent("li").find("a").removeClass("bpMarkActive");
	})

/*
 * 图片频道页面
 */
// 图片频道页图片轮播效果
	var pcPicLen = $(".pc_pics").length;
	var pcTimer = null;
	var pcNow = 0;
	//鼠标移入停止轮播与移出开启轮播
	$(".pc_picFocus").mouseover(function(){
		$(".pc_picGoto").css("display","block");
		clearInterval(pcTimer);
	})
	$(".pc_picFocus").mouseout(function(){
		$(".pc_picGoto").css("display","none");
		pcFocus();
	})
	// 鼠标移入小图标切换大图
	$(".pc_icons").hover(function(){
		pcNow = $(this).index();
		pcMove(pcNow);
	},function(){
		return false;
	})
	// 左右图片切换按钮
	$(".pc_back").click(function(){
		pcNow--;
		if(pcNow < 0){
			pcNow = pcPicLen-1;
		}		
		pcMove(pcNow);
	})
	$(".pc_forward").click(function(){
		pcNow++;
		if(pcNow > pcPicLen-1){
			pcNow = 0;
		}
		pcMove(pcNow);
	})
	// 默认自动运行轮播
	pcFocus();
	// 轮播切换定时器函数
	function pcFocus(){
		pcTimer = setInterval(function(){
			pcNow++;
			if(pcNow>pcPicLen -1){
				pcNow=0;
			}
			pcMove(pcNow);
		},3000)
	}		
	// 焦点图轮播切换函数
	function pcMove(index){
		for(var i=0;i<pcPicLen;i++){
			$(".pc_icons").eq(i).removeClass("pc_icoActive");
			$(".pc_pics").eq(i).hide();
		}
		$(".pc_icons").eq(index).addClass("pc_icoActive");
		$(".pc_pics").eq(index).fadeIn(1200);
	}

/*
 * 软件下载详情页面
 */
 	var scInow = 0;
 	function scSoftPicMove(index){
 		for(var i=0;i<4;i++){
			$(".sc_softPicList").eq(i).hide();
		}
		$(".sc_softPicList").eq(index).show();
 	}
 	$(".sc_softPicForward").click(function(){
 		scInow++;	
 		if (scInow > 3) {
 			scInow = 0;
 		};
 		scSoftPicMove(scInow);
 	})
  	$(".sc_softPicBack").click(function(){
 		scInow--;
 		if (scInow < 0) {
 			scInow = 3;
 		};
 		scSoftPicMove(scInow);
 	})











})