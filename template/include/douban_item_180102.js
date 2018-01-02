//By ImMmMm.com 20180102
$(document).ready(function(){
    $('.douban_item').each(function(){
        var id = $(this).attr('date-dbid').toString()
        if (id.length < 9){
            var url= "https://api.douban.com/v2/movie/subject/"+id
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSONP',
                success: function (data) {
                    var db_casts = "";
                    for(var i in data.casts){
                        db_casts += data.casts[i].name+" ";
                    }
                    $('#db'+id).html("<div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='"+data.alt+"'>《"+data.title+"》</a></h4><time class='post-preview--date'>"+data.rating.average+"分 / 导演："+data.directors[0].name+" / 主演："+db_casts+" / "+data.year+"</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.summary+"</section></div></div><div class='post-preview--image' style='background-image:url("+data.images.large+");'></div>");
                }
            });
        }else if (id.length > 9){
            var url= "https://api.douban.com/v2/book/isbn/"+id
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSONP',
                success: function (data) {
                    $('#db'+id).html("<div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='"+data.alt+"'>《"+data.title+"》"+data.subtitle+"</a></h4><time class='post-preview--date'>"+data.rating.average+"分 / "+data.author[0]+" / "+data.publisher+" / "+data.pubdate+"</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.summary+"</section></div></div><div class='post-preview--image' style='background-image:url("+data.images.large+");'></div>");
                }
            });
        }else{
            console.log("出错"+ id)
        }
        //alert(id)
    });
});