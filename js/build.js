Fliplet().then(function() {
  $('[data-about-app-id]').each(function() {
    var _this = this;
    var $el = $(this);
    var id = $el.attr('data-about-app-id');
    var data = Fliplet.Widget.getData(id);
    var loginOverlay;

    var clientData = {
      app_name: Fliplet.Env.get('appName'),
      organisation_name: Fliplet.Env.get('organizationName'),
      current_year: moment().format('YYYY')
    }

    var clientInfo = Handlebars.compile(data.infoTemplate);
    var html = clientInfo(clientData);

    loginOverlay = new Fliplet.Utils.Overlay($('template[name="overlay-about-app"]').html(), {
      showOnInit: true,
      closeAnywhere: true,
      beforeOpen: function() {
        $('.client-info').html(html);
      },
      classes: '',
      entranceAnim: 'fadeInDown',
      exitAnim: 'fadeOutUp',
      size: 'compact',
      uniqueId: 'about-app'
    });

  });
});
