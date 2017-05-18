Fliplet().then(function() {
  $('[data-about-app-id]').each(function() {
    var _this = this;
    var $el = $(this);
    var id = $el.attr('data-about-app-id');
    var data = Fliplet.Widget.getData(id);
  });
});
