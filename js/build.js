Fliplet().then(function() {
  var $el = $('[data-about-app-id]:eq(0)');
  var id = $el.attr('data-about-app-id');
  var data = Fliplet.Widget.getData(id);

  var clientData = {
    app_name: Fliplet.Env.get('appName'),
    organisation_name: Fliplet.Env.get('organizationName'),
    current_year: moment().format('YYYY')
  }

  var clientInfo = Handlebars.compile(data.infoTemplate);
  var clientInfoHtml = clientInfo(clientData);

  var aboutOverlay = new Fliplet.Utils.Overlay($('template[name="overlay-about-app"]').html(), {
    showOnInit: false,
    closeAnywhere: true,
    entranceAnim: 'fadeInDown',
    exitAnim: 'fadeOutUp',
    size: 'compact',
    uniqueId: 'about-app'
  }, function overlayInitialised(el) {
    $(el.overlay).find('.client-info').html(clientInfoHtml);
  });

  window.Fliplet = window.Fliplet || {};
  var Fliplet = window.Fliplet;

  function open() {
    aboutOverlay.open();
  }

  function close() {
    aboutOverlay.close();
  }

  function get() {
    return aboutOverlay;
  }

  Fliplet.About = (function() {
    return {
      get: get,
      open: open,
      close: close
    }
  })();
});
