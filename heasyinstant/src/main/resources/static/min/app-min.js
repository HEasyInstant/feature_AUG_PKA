!function($,i,n){$(i).ready(function(){$(".mobile-navigation").append($(".main-navigation .menu").clone()),$(".menu-toggle").click(function(){$(".mobile-navigation").slideToggle()}),$(".graduates").flexslider({animation:"slide",smoothHeight:!0,controlNav:!1,directionNav:!0,prevText:'<i class="fa fa-angle-left"></i>',nextText:'<i class="fa fa-angle-right"></i>'})}),$(n).load(function(){})}(jQuery,document,window);