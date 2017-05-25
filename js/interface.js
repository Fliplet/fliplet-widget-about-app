var infoTemplate = $('#template-info').html();

var onTinyMCEReady = new Promise(function(resolve) {
  document.addEventListener('tinymce.init', resolve, false);
})

// TinyMCE INIT
tinymce.init({
  selector: '#appInfo',
  theme: 'modern',
  plugins: [
    'advlist lists link image charmap hr',
    'searchreplace insertdatetime table textcolor colorpicker code'
  ],
  toolbar: 'formatselect | fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | blockquote subscript superscript | table charmap hr | removeformat | code',
  menubar: false,
  statusbar: true,
  inline: false,
  resize: true,
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

  var template = tinymce.get('appInfo').getContent().trim() || infoTemplate.trim();
  
  Fliplet.App.Settings.set({
    about: { template: template }
  }).then(function () {
    Fliplet.Widget.complete();
  })
});

// Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function() {
  $('form').submit();
});

// FUNCTIONS
function init() {
  onTinyMCEReady.then(function () {
    var about = Fliplet.App.Settings.get('about');
    var template = about && about.template;
    if (template) {
      tinymce.get('appInfo').setContent(template);
    } else {
      tinymce.get('appInfo').setContent(infoTemplate);
    }
  });
}

// INIT
init();
