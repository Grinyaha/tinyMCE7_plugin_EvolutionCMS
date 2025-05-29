

function tmce_init(selector,lang) {
    return {
        license_key: "gpl",
        schema: "html5",
        language: lang,
        language_url: "/assets/plugins/tinymce7/langs/"+lang+".js",
        selector: selector,
        relative_urls: false,
        document_base_url: "/",
        plugins: 'searchreplace quickbars nonbreaking code link customlink',
        external_plugins: {
            "customlink": "/assets/plugins/tinymce7/plugins/customlink/plugin_modified.js"
        },
        toolbar: 'undo redo | styles | bold italic underline strikethrough | link image | searchreplace image table code',
        menubar: false
    };
}


