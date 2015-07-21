$(function() {
  
    //クリックしたときのファンクションをまとめて指定
    $('.tab li').click(function() {
        //.index()を使いクリックされたタブが何番目かを調べ、
        //indexという変数に代入します。
        var index = $('.tab li').index(this);
      
        //コンテンツを一度すべて非表示にし、
        $('.tabContent li').css('display','none');
      
        //クリックされたタブと同じ順番のコンテンツを表示します。
        $('.tabContent li').eq(index).css('display','block');
      
        //一度タブについているクラスselectを消し、
        $('.tab li').removeClass('active');
      
        //クリックされたタブのみにクラスselectをつけます。
        $(this).addClass('active')
    });
});

