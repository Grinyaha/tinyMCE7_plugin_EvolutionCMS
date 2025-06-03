<?php
if(!defined('MODX_BASE_PATH')){die('What are you doing? Get out of here!');}

switch (evo()->event->name) {

case 'OnRichTextEditorRegister':
evo()->event->output('TinyMCE7'); // Имя редактора
break;

case 'OnRichTextEditorInit':
if ($editor == 'TinyMCE7') {

$others_params = "";
if(!empty($params['others_params'])) $others_params = $params['others_params'].",";

//evo()->logEvent(1,1,"<pre>".print_r(, true)."</pre>",'FOR EVO4_1x !!!');
//language
if(evo()->getConfig('manager_language')=="ru" || evo()->getConfig('manager_language')=="russian-UTF8" || evo()->getConfig('manager_language')=="russian") {
    $lang = "ru";
}
else $lang = evo()->getConfig('manager_language');

$initvs = [];
foreach(evo()->event->params['elements'] as $id) {
$initvs[] = "#".$id;
}
$initvs = implode(',', $initvs);
$output = '

<script src="/assets/plugins/tinymce7/tinymce.min.js"></script>

<script>
    let editorCallback = null;
    let currentFieldId = null;

    function openFileManagerForTinyMCE(field_type, callback) {
        editorCallback = callback;

        const width = window.innerWidth * 1;
        const height = window.innerHeight * 0.6;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        // Используем сохранённый ID
        const fieldId = currentFieldId || "default_field_id";

        const url = "/manager/media/browser/filemanager/browser.php?Type="+field_type+"&field_id=" + encodeURIComponent(fieldId) + "&popup=1&relative_url=1";

        window.open(url, "Responsive Filemanager", "width=" + width + ",height=" + height + ",resizable=yes,scrollbars=yes,left="+left+",top="+top);
    }


    function SetUrl(url) {
        if (editorCallback) {
            editorCallback(url);
            editorCallback = null; // очищаем после использования
        }
    }




    tinymce.init({
        license_key: "gpl",
        schema: "html5",
        valid_elements: "'.$params['valid_elements'].'",
        selector: "'.$initvs.'",
        paste_as_text: '.$params['paste_as_text'].',
        height: "'.$params['height'].'",
        width: "'.$params["width"].'",
        //max_height: "'.$params['max_height'].'",
        relative_urls: false,
        document_base_url: "/",
        plugins: "'.$params['plugins'].'",
        //base_url: "/assets/plugins/tinymce7",
        external_plugins: {
            "customlink": "/assets/plugins/tinymce7/plugins/customlink/plugin_modified.js"
        },
        toolbar: "'.$params['toolbar'].'",
        menubar: '.$params['menubar'].',
        content_css: "'.$params['content_css'].'",
        language: "'.$lang.'",
        language_url: "/assets/plugins/tinymce7/langs/'.$lang.'.js",
        //content_style:
        quickbars_selection_toolbar: '.$params['quickbars_selection_toolbar'].',
        quickbars_insert_toolbar: '.$params['quickbars_insert_toolbar'].',
        '.$others_params.'

/////plugin IMAGE

        image_class_list: [
            { title: "Responsive", value: "img-responsive" },
            { title: "Rounded", value: "img-rounded" },
            { title: "Shadow", value: "img-shadow" }
        ],
        image_advtab: true,

        setup: function(editor) {
            editor.on("OpenWindow", function(e) {
                const dialog = document.querySelector(".tox-dialog");
                if (!dialog) return;

                setTimeout(() => {
                    const firstInput = dialog.querySelector(\'input[type="url"], input[type="text"]\');
                    if (firstInput) {
                        currentFieldId = firstInput.id; // Сохраняем ID прямо сюда
                        //console.log("ID первого поля (предположительно Source):", currentFieldId);
                    }
                }, 50);
            }),
            editor.on("PostProcess", function (e) {
            if (e.content) {
                e.content = e.content.replace(/<iframe(.*?)sandbox=".*?"(.*?)>/g, "<iframe$1$2>");
            }
        });

        },

        // Подключение своего file_picker_callback
        file_picker_types: "file image media",

        file_picker_callback: function(callback, value, meta) {
            let rfmTypeParameter;

            if (meta.filetype === "image") {
                rfmTypeParameter = "images";
            } else if (meta.filetype === "file" || meta.filetype === "media") {
                rfmTypeParameter = "files";
            } else {
                // Обработка неизвестных типов файлов, если необходимо
                console.warn("Неизвестный тип файла в file_picker_callback: " + meta.filetype);
                return;
            }

            openFileManagerForTinyMCE(rfmTypeParameter, callback);
        }
    });

</script>
';
evo()->event->output($output);
}
break;
}
