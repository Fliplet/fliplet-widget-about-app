var infoTemplate = $('#template-info').html();

var onTinyMCEReady = new Promise(function(resolve) {
  document.addEventListener('tinymce.init', resolve, false);
});

var about = Fliplet.App.Settings.get('about');

if (!about) {
  $('.about-warning').removeClass('hidden');
}

// TinyMCE INIT
tinymce.init({
  selector: '#appInfo',
  plugins: [
    'lists advlist image charmap hr code',
    'searchreplace wordcount insertdatetime table textcolor colorpicker'
  ],
  toolbar: [
    'formatselect |',
    'bold italic underline strikethrough |',
    'forecolor backcolor |',
    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
    'blockquote subscript superscript | table insertdatetime charmap hr |',
    'removeformat | code'
  ].join(' '),
  menubar: false,
  statusbar: false,
  min_height: 300,
  setup: function(editor) {
    editor.on('init', function() {
      var event = new Event('tinymce.init');
      document.dispatchEvent(event);
    });
  }
});

$('form').submit(function(event) {
  event.preventDefault();

  var template = tinymce.get('appInfo').getContent().trim();

  Fliplet.App.Settings.set({
    about: {
      template: template
    }
  }).then(function() {
    Fliplet.Widget.save();
  });
});

// Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function() {
  $('form').submit();
});

// FUNCTIONS
function init() {
  onTinyMCEReady.then(function() {
    var template = about && about.template;

    if (about && about.hasOwnProperty('template')) {
      tinymce.get('appInfo').setContent(about.template);
    } else {
      tinymce.get('appInfo').setContent(infoTemplate);
    }

    Fliplet.Widget.autosize();
  });
}

// INIT
init();
