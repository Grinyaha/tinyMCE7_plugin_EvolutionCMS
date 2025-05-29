

function tmce_mtvinit(selector,lang) {

    return {
        license_key: "gpl",
        schema: "html5",
        language: lang,
        language_url: "/assets/plugins/tinymce7/langs/"+lang+".js",
        selector: selector,
        relative_urls: false,
        document_base_url: "/",
        plugins: 'searchreplace quickbars nonbreaking code link customlink',
        toolbar: 'undo redo | styles | bold italic underline strikethrough | link image | searchreplace image table code',
        menubar: false,
        setup: function(editor) {
            editor.on('change keyup', function() {
                var content = editor.getContent();
                //$("#"+$(this).attr('id')).show(0);
                jQuery("#"+jQuery(this).attr('id')).val(content).trigger('input').trigger('change');
            });
        },
    };
}




