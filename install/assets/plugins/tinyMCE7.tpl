//<?php
/**
 * TinyMCE7
 *
 *
 * @category    plugin
 * @version     0.8 Beta
 * @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @package     Evolution
 * @internal    @events OnRichTextEditorInit,OnRichTextEditorRegister,OnInterfaceSettingsRender
 * @internal    @modx_category Manager and Admin
 * @internal    @properties {"plugins":[{"label":"plugins","type":"textarea","value":"preview searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link customlink media codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons","default":"preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons","desc":""}],"toolbar":[{"label":"toolbar","type":"textarea","value":"undo redo | styles fontsize | bold italic underline strikethrough | align numlist bullist | link unlink customlink image | table media | lineheight outdent indent| forecolor backcolor removeformat | code fullscreen preview |anchor codesample | visualblocks | subscript superscript searchreplace","default":"undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | anchor codesample","desc":""}],"width":[{"label":"width","type":"string","value":"100%","default":"100%","desc":""}],"height":[{"label":"height","type":"string","value":"500px","default":"500px","desc":""}],"content_css":[{"label":"content_css","type":"string","value":"/editor-styles.css","default":"","desc":""}],"valid_elements":[{"label":"valid_elements","type":"string","value":"","default":"*[*]","desc":""}],"paste_as_text":[{"label":"paste_as_text","type":"list","value":"false","options":"true,false","default":"true,false","desc":""}],"menubar":[{"label":"menubar","type":"list","value":"false","options":"true,false","default":"true,false","desc":""}],"quickbars_selection_toolbar":[{"label":"quickbars_selection_toolbar","type":"list","value":"true","options":"true,false","default":"true,false","desc":""}],"quickbars_insert_toolbar":[{"label":"quickbars_insert_toolbar","type":"list","value":"true","options":"true,false","default":"true,false","desc":""}],"pagebuilder_file_theme":[{"label":"pagebuilder_file_theme","type":"string","value":"default.js","default":"default.js","desc":""}],"multitv_file_theme":[{"label":"multitv_file_theme","type":"string","value":"default.js","default":"default.js","desc":""}],"others_params":[{"label":"others_params","type":"textarea","value":"","default":"","desc":""}]}
 * @internal    @installset base
 * @reportissues https://github.com/Grinyaha/tinyMCE7_plugin_EvolutionCMS
 * @documentation README.md
 * @author      plugin author Grinyaha
 * @lastupdate  25/05/2025
 */

switch (evo()->event->name) {

case 'OnRichTextEditorRegister':
evo()->event->output('TinyMCE7'); // Имя редактора
break;

case 'OnRichTextEditorInit':
if ($editor == 'TinyMCE7') {

$others_params = "";
if(!empty($params['others_params'])) $others_params = $params['others_params'].",";


//language
if(evo()->getConfig('manager_language')=="ru" || evo()->getConfig('manager_language')=="russian-UTF8" || evo()->getConfig('manager_language')=="russian") $lang = "ru";
else $lang = "en";

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
        plugins: "'.$params['plugins'].'",
        base_url: "/assets/plugins/tinymce7",
        external_plugins: {
            "customlink": "/assets/plugins/tinymce7/plugins/customlink/plugin_modified.js"
        },
        toolbar: "'.$params['toolbar'].'",
        menubar: '.$params['menubar'].',
        content_css: "'.$params['content_css'].'",
        language: "ru",
        language_url: "/assets/plugins/tinymce7/langs/ru.js",
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