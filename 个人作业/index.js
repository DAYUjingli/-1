// 首页下拉框
$("#hide").hide();
$("#xiala").mouseenter(function(){
    $("#hide").slideDown();
});
$("#con").mouseleave(function(){
    $("#hide").slideUp();
})

// 轮播图
var pics = ["1.jpg","2.jpg","3.jpg","4.jpg","1.jpg"];

    pics.forEach(function(e,i){
        $("<div></div>")
        .css({
            height:"100%",
            width:"100%",
            "background-image":"url("+e+")",
            "background-size":"100% 100%",
            left:i*1300+"px"
        })
        .addClass("lbt-item")
        .appendTo($("#inner"));
    });

    //创建白点
    for(var i = 0;i<pics.length-1;i++){
        $("<li></li>")
        .appendTo($("#points"))
        .attr("index",i)
        .on("click",function(){
            var index = $(this).attr("index")*1;
            gotoPage(index);
        });
    }
    //.eq()方法，获取jq对象中第n个元素并放入一个新的jq对象。返回这个新的jq对象。
    $("#points li").eq(0).addClass("high-lighted");

    //记录当前显示第几张
    var currentPage = 0;

    function previous(){
        $("#points li").eq(currentPage).removeClass("high-lighted");
        currentPage--;
        if(currentPage<0){
            currentPage=0;
        }
        $("#points li").eq(currentPage).addClass("high-lighted");

        $("#inner").css("left",-currentPage*1300+"px");
    }

    function next(){
        // $("#inner").css("transition","all 0.7s");

        $("#points li").eq(currentPage).removeClass("high-lighted");
        currentPage++;
        $("#points li").eq(currentPage).addClass("high-lighted");
        
        if(currentPage>=pics.length){
            currentPage = 0;
        }
        
        $("#inner").css("left",-currentPage*1300+"px");
        if(currentPage==pics.length-1){
            // 当切换最后一张图片时，等切换动画昨晚，立刻回到第0张。
            currentPage = 0;
            $("#points li").eq(currentPage).addClass("high-lighted");
            setTimeout(function(){
                $("#inner").css("transition","none");
                $("#inner").css("left",0);

                //保证图片已经回到第一张之后在添加过渡效果。
                setTimeout(function(){
                    $("#inner").css("transition","all 0.7s");
                },30);
            },700);
        }
    }

    //切换到第几页
    function gotoPage(page){
        $("#points li").eq(currentPage).removeClass("high-lighted");
        currentPage = page;
        $("#points li").eq(currentPage).addClass("high-lighted");
        $("#inner").css("left",-currentPage*800+"px");
    }

    var timer = setInterval(next,4000);

    $("#inner").css("left","0");

    //------------------------------------------

    //mousemove事件，鼠标指针在元素上移动时触发。
    $("#lbt").on("mousemove",function(e){
        // console.log(e.pageX);
        // console.log($("#lbt").width());
        if(e.pageX>=$("#lbt").width()/2+$("#lbt").offset().left){
            $("#right").show();
            $("#left").hide();
        }else{
            $("#left").show();
            $("#right").hide();
        }
    });

    $("#lbt").on("mouseleave",function(){
        $("#left").hide();
        $("#right").hide();
    });

    $("#right").on("click",function(){
        if(this.isMoving){
            return;
        }
        next();
        clearInterval(timer);
        timer = setInterval(next,4000);

        var that = this;
        that.isMoving = true;
        setTimeout(function(){
            that.isMoving = false;
        },700);
    });

    $("#left").on("click",function(){
        previous();
        clearInterval(timer);
        timer = setInterval(next,4000);
    })
