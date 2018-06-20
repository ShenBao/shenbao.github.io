import $ from "jquery";

$(function () {

    var hx = 2;
    var maxHx = 4;
    var $mark = 1;

    var ShenBaoTocTree = {
        isMobile: function () {
            var ua = navigator.userAgent;
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;
            if (isMobile) {
                return true;
            } else {
                return false;
            }
        },

        queryTocTree: function () {
            var hxArray = $('.post-content > h' + hx);
            for (var i = 0; i < hxArray.length; i++) {
                hxArray
                    .eq(i)
                    .addClass('shenbao-toc-tree-hx');
            }
            hx = hx + 1;
            if (hx <= maxHx) {
                this.queryTocTree();
            } else {
                this.creatTocTree();
            }
        },

        creatTocTree: function () {
            var $tocTree = $('.shenbao-toc-tree-hx');
            if ($tocTree.length == 0 || $('.shenbao-toc-tree-catalog').length == 0) {
                $('.shenbao-toc-tree-catalog').hide();
                return;
            }
            var $tocTreeArray = [];
            for (let i = 0; i < $tocTree.length; i++) {
                var tag = $tocTree.eq(i);
                var item = {};
                item.tagName = (tag.prop("tagName"))
                    .toString()
                    .toLowerCase();
                item.id = tag.prop("id");
                item.title = tag.text();
                $tocTreeArray.push(item);
            }
            var $tocTreeHTML = '';
            for (let j = 0; j < $tocTreeArray.length; j++) {
                var $item = '<li class="shenbao-toc-tree-li ' + $tocTreeArray[j].tagName + '-nav"' +
                    'title="'+ $tocTreeArray[j].title +'">' + $tocTreeArray[j].title + '</li>';
                $tocTreeHTML += $item;
            }
            $('.shenbao-toc-tree-body').html($tocTreeHTML);
            setTimeout(this.scrollFn, 20);
            setTimeout(function () {
                $('body,html').animate({
                    'scrollTop': $(window).scrollTop() + 2
                }, 300);
            }, 500);
            this.liClick();
        },

        liClick: function () {
            //鼠标点击
            $('.shenbao-toc-tree-body li')
                .click(function () {
                    $mark = 0;
                    var $index = $(this).index();
                    $('.shenbao-toc-tree-body li').removeClass('active');
                    $(this).addClass('active');
                    var $top = $('.shenbao-toc-tree-hx')
                        .eq($index)
                        .offset()
                        .top + 5;
                    $('body,html').animate({
                        'scrollTop': $top
                    }, 300, function () {
                        $mark = 1;
                    });
                })
        },

        scrollFn: function () {
            $(window)
                .scroll(function () {
                    var $scrolltop = $(window).scrollTop();
                    if ($mark == 1) {

                        $('.shenbao-toc-tree-hx')
                            .each(function () {
                                var $index = $(this).index('.shenbao-toc-tree-hx');
                                var $divTop = 0;
                                if ($index >= $('.shenbao-toc-tree-hx').length - 1) {
                                    $divTop = $('.the-end')
                                        .offset()
                                        .top;
                                } else {
                                    $divTop = $('.shenbao-toc-tree-hx')
                                        .eq($index + 1)
                                        .offset()
                                        .top;
                                }
                                if ($divTop > $scrolltop) {
                                    $('.shenbao-toc-tree-body li').removeClass('active');
                                    $('.shenbao-toc-tree-body li')
                                        .eq($index)
                                        .addClass('active');
                                    var $tocTreeLiHeight = $('.shenbao-toc-tree-body li').height();
                                    var $tocTreeActiveHeight = $tocTreeLiHeight * $index;
                                    var scrollTop = $tocTreeActiveHeight - ($('#shenbao-toc-tree-content').height() / 2 - 15);
                                    // $("#shenbao-toc-tree-content").scrollTop(scrollTop);
                                    $('#shenbao-toc-tree-content').animate({
                                        scrollTop: scrollTop
                                    }, 10);
                                    return false;
                                }
                            });
                        var isTop = $scrolltop < $('.shenbao-toc-tree-hx')
                            .eq(0)
                            .offset()
                            .top;
                        var isBottom = $scrolltop > $('.the-end')
                            .offset()
                            .top;
                        if (isTop || isBottom) {
                            $('.shenbao-toc-tree-body li').removeClass('active');
                        }
                    }
                });
        }
    };
    ShenBaoTocTree.queryTocTree();
});