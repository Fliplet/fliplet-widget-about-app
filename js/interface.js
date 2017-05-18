var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData(widgetId) || {};
var organizationId = Fliplet.Env.get('organizationId');
var infoTemplate = $('#template-info').html();

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
      if ("infoTemplate" in data && data.infoTemplate !== "") {
        tinymce.get('appInfo').setContent(data.infoTemplate);
      } else {
        tinymce.get('appInfo').setContent(infoTemplate);
      }
    });
  }
});

$('form').submit(function(event) {
  event.preventDefault();
  data.enabled = $('[name="enable_about"]:checked').val();
  data.infoTemplate = tinymce.get('appInfo').getContent() || infoTemplate;

  Fliplet.Widget.save(data).then(function() {
    Fliplet.Widget.complete();
  });
});

// Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function() {
  $('form').submit();
});

// FUNCTIONS
function init() {
  var enableToggle = data.enabled ? data.enabled : 'no-show';
  $('[name="enable_about"][value="' + enableToggle + '"]').prop('checked', true).trigger('change');
}

// ATTACH EVENT LISTENERS
$('[name="enable_about"]').on('change', function() {
  var value = $(this).val();

  if (value === 'show') {
    $('.app-information').addClass('show');
  } else {
    $('.app-information').removeClass('show');
  }
});

init();
