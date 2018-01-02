//批量读取豆瓣的图书和电影
//by justin 20120316 DIY by lmm 20170807
//http://www.cnblogs.com/justinw/archive/2012/03/16/2402309.html

//--dbapi.begin--
var $ = jQuery;
var dbapi = {
	appendScript:function(url){
		if ((url)&&(url.length > 0))
			$("<script/>").attr("src",url).attr("charset","utf-8").appendTo($("head")[0]);
	},
	/**
	 * 解析json数据为数组
	 */
	parseJSON:function(json){
		var items=[];
			$.each(json.entry,function(i,item){
				var link = {};
				link.title = item["db:subject"]["title"]["$t"];
				link.link = item["db:subject"]["link"][1]["@href"];//硬编码
				link.src = item["db:subject"]["link"][2]["@href"];//硬编码
				items.push(link);
			});			
		return items;
	},
	render:function(items){
		var html='';		
		$.each(items,function(i,item){
			html+='<a href="'
				+item.link+'" target="_blank"><img src="'
				+item.src+'" alt="'+item.title
				+'" title="'+item.title+'" /></a>';
		});
		return html;
	},
	/**
	 * todo: bookurl 和 movieurl 可以合并简化
	 */
	movieurl:function(stus,begin,end){
		return this.allurl("movie",stus,begin,end);
	},
	bookurl:function(stus,begin,end){
		return this.allurl("book",stus,begin,end);
	},
	allurl:function  (typ,stus,begin,end) {
		if (end ===0) return;
		if(!dbapi[typ + stus +"_SHOW"]){
			dbapi[typ + stus +"_SHOW"] = function (json) {
				var mainplace = $("#"+this.opts.place);
				if (mainplace.length ===0){
					mainplace = $("<div/>").attr("id",this.opts.place).prependTo($("body"));
				}
				if ($("#"+typ+stus).length === 0){
					var title = this.defaults[typ+stus+"title"]?this.defaults[typ+stus+"title"]:
							     ">>>"+typ.toUpperCase() +"-"+stus.toUpperCase()+">>>";
					$("<h3/>").addClass("douban-title").text(title).appendTo(mainplace);
					$("<div/>").attr("id",typ+stus).addClass("douban-list").appendTo(mainplace);					
				}					
				$("#"+typ+stus).append(this.render(this.parseJSON(json)));				
			}
		}
		return this.apiurl(typ,this.opts.user,stus,begin,end);
	},
	apiurl:function(typ,user,stus,begin,end){
		var url = "https://api.douban.com/people/"+user+"/collection?alt=xd&&apikey=0df993c66c0c636e29ecbb5344252a4a&app_name=doubanmovie&cat="+typ+"&start-index="+
			begin+"&max-results="+end+"&status="+stus+"&callback=dbapi."+typ+stus+"_SHOW";
		return url;
	},
	/**
	 * 将num按50分段生成数组集合
	 * @param  {[type]} num 显示项目的个数
	 * @return {[type]} 按50分段的数组
	 */	
	fixNum:function(num){
	    var len = num;		
		var index = 1;
		var fixnums=[];
		if (50>len> 0){
			fixnums.push({begin:index,end:len})
		}else{
			while (len > 0) {
				fixnums.push({begin:index,end:index+49})
				len -= 50;
				index +=50;
			};	
		}
		return fixnums;
	},
	/**
	 * 根据配置项显示豆瓣的图书和电影
	 * @param  {[Object]} options [可选配置项]
	 */
	show:function(options){
		this.opts = $.extend({}, this.defaults, options);
		var books = [];
		var movies = [];
		$.each(this.opts.movie,function (i,item) {
			movies.push({stus:item.stus,indexs:dbapi.fixNum(item.maxnum)});	
		});
		$.each(this.opts.book,function (i,item) {
			books.push({stus:item.stus,indexs:dbapi.fixNum(item.maxnum)});	
		});
		$.each(movies,function(i,item){	
			$.each(item.indexs,function(t,idx){
				setTimeout(dbapi.appendScript(dbapi.movieurl(item.stus,idx.begin,idx.end)),100);
			});				
		});	
		$.each(books,function(i,item){	
			$.each(item.indexs,function(t,idx){
				setTimeout(dbapi.appendScript(dbapi.bookurl(item.stus,idx.begin,idx.end)),100);
			});				
		});
	},
	/**
	 * 可选配置项
	 * @type {Object}
	 * todo:可以进一步把book和movie合并到一起，通过类型区分。
	 */
	defaults:{
		place:"douban",
		user:"",
		movie:[{stus:"watched",maxnum:18}],
		book:[{stus:"read",maxnum:18}],
		moviewatchedtitle:"看过...",
		bookreadtitle:"读过..."
	}
}
//--dbapi.end--