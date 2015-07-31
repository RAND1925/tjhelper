// ==UserScript==
// (C) Paul Potseluev, Stepan Kiryushkin
// @name        TJ
// @namespace   TJ
// @include     https://tjournal.ru/*
// @version     1
// @grant       none
// @description thread navigation helper for TJ club
// @description:ru Расширение упращяет навигацию в обсуждениях в клубе TJ
TJComments = {
  d: $(document),
  b: $('html, body'),
  up_icon: 'https://maxcdn.icons8.com/windows8/PNG/26/Arrows/up_circular-26.png',
  down_icon: 'https://maxcdn.icons8.com/windows8/PNG/26/Arrows/down_circular-26.png',

  init: function() {
    this.createAnchors();

    $('.b-comment__up').click(function(e) {
      e.preventDefault();

      var $this     = $(this),
          $previous = $this.prev(),
          parent_id = $previous.data('parent-id'),
          $parent   = $('#commentBox' + parent_id),
          $children = $this.parents('.b-comment');

      TJComments.scrollTo($parent);
      TJComments.createBack($parent, $children);
    });

    TJComments.d.on('click', '.b-comment__down', function(e) {
      e.preventDefault();

      var $this       = $(this),
          children_id = $this.data('children-id'),
          $children   = $('#commentBox' + children_id);

      $this.remove();
      TJComments.scrollTo($children);
    });
  },

  scrollTo: function($element) {
    TJComments.b.animate({ scrollTop: $element.offset().top }, 500)
    $element.effect("highlight", { color: 'rgba(217,239,55,0.1)' }, 1500);
  },
   
  createAnchors: function() {
    var html =  '<a href="#" class="b-comment__up">' +
                  '&nbsp;&nbsp;<img src="' + this.up_icon + '" width="12px" style="top:3px;position:relative;">' +
                '</a>';

    $('.b-comment__datetime.highlightParent').after(html);
  },

  createBack: function($parent, $children) {
    var html =  '<a href="#" class="b-comment__down" data-children-id="' + $children.data('id') + '">' +
                  '&nbsp;&nbsp;<img src="' + this.down_icon + '" width="12px" style="top:3px;position:relative;">' +
                '</a>';

    $parent.find('.b-comment__datetime').after(html);
  }
}

TJComments.d.ready(function() {
  TJComments.init();
});

function illuminate($parentId) {
  var html =  '<div class="b-illuminate" style="margin-left:6px;width:6px;height:6px;background:#ffb833;' +
  '-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;"></div>';
  $parentId = '#commentBox' + $parentId;
  $($parentId).find('.icon-star').append(html);
  $parentId = $($parentId).find('.b-comment__datetime ').attr('data-parent-id');
  if ($parentId != 0) {
    illuminate($parentId);
  }
}

function hide() {
  $('div.b-illuminate').remove();
}

/*
function makeSignature () {
  var $id;
  var html;
  var  $commentsSecondLvl = $('.b-comment__up').parents(".b-comment__wrapper");
  $($commentsSecondLvl).each( function () {
    $id = $(this).find('.icon-star').attr('data-objectid');
    html = '<a class="tjhelper" href="#tjhelper' + $id + '">Посмотреть дискуссию</a>';
    $(this).find('.b-comment__reply-button').append(html);
  });
}
*/

function makeSignature () {
  var $parentId;
  var $parentIdValue;
  var $name;
  var html;
  var  $commentsSecondLvl = $('.b-comment__up').parents(".b-comment__wrapper");
  $($commentsSecondLvl).each( function () {
    $parentIdValue = $(this).find('.b-comment__datetime ').attr('data-parent-id');
    $parentId = '#commentBox' + $parentIdValue;
    $name = $($parentId).find('.b-comment__user').find("span").get(0);
    $name = $($name).html();
    html = '<a href="#comment'+ $parentIdValue + '"style="margin-left:-12px;">To ' + $name + '  </a>';
    $(this).find('.b-comment__datetime').find("a").prepend(html);
  });
}

$(document).ready( function(){  
  makeSignature();
  $('.b-comment__wrapper').mouseover( function(e) {
  var $parentId;
  var id;
  if(!($('div').is(".b-illuminate"))) {
    $parentId = $(this).find('.icon-star').attr('data-objectid');
    illuminate($parentId);
  }
  });
  
  $('.b-comment__wrapper').mouseleave( function(e) {
      hide();
  });
});


// ==/UserScript==
// (C) Paul Potseluev, Stepan Kiryushkin