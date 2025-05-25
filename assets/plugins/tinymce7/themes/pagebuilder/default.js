

function tmce_init(selector) {
    return {
        license_key: "gpl",
        schema: "html5",
        language: localStorage.getItem('tiny_lang'),
        language_url: "/assets/plugins/tinymce7/langs/ru.js",
        selector: selector,
        plugins: 'searchreplace quickbars nonbreaking code',
        toolbar: 'undo redo | styles | bold italic underline strikethrough | link image | searchreplace image table code',
        menubar: false
    };
}


