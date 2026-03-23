//<?php
/**
 * TinyMCE7
 *
 * WYSYWIG for your ❤️Evolution CMS
 *
 * @category    plugin
 * @version     1.01 Beta
 * @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @package     evo
 * @internal    @events OnRichTextEditorInit,OnRichTextEditorRegister,OnInterfaceSettingsRender
 * @internal    @modx_category Manager and Admin
  * @internal    @properties {"plugins":[{"label":"plugins","type":"textarea","value":"preview searchreplace autolink autosave directionality visualblocks visualchars fullscreen image link customlink media codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons","default":"preview searchreplace autolink autosave directionality visualblocks visualchars fullscreen image link customlink media codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons","desc":""}],"toolbar":[{"label":"toolbar","type":"textarea","value":"undo redo | styles fontsize | bold italic underline strikethrough | align numlist bullist | link unlink customlink image | table media | lineheight outdent indent| forecolor backcolor removeformat | fullscreen preview |anchor codesample | visualblocks | subscript superscript searchreplace monacode","default":"undo redo | styles fontsize | bold italic underline strikethrough | align numlist bullist | link unlink customlink image | table media | lineheight outdent indent| forecolor backcolor removeformat | fullscreen preview |anchor codesample | visualblocks | subscript superscript searchreplace monacode","desc":""}],"width":[{"label":"width","type":"string","value":"100%","default":"100%","desc":""}],"height":[{"label":"height","type":"string","value":"500px","default":"500px","desc":""}],"valid_elements":[{"label":"valid_elements","type":"string","value":"","default":"*[*]","desc":""}],"paste_as_text":[{"label":"paste_as_text","type":"list","value":"false","options":"true,false","default":"true,false","desc":""}],"menubar":[{"label":"menubar","type":"list","value":"false","options":"true,false","default":"true,false","desc":""}],"quickbars_selection_toolbar":[{"label":"quickbars_selection_toolbar","type":"list","value":"true","options":"true,false","default":"true,false","desc":""}],"quickbars_insert_toolbar":[{"label":"quickbars_insert_toolbar","type":"list","value":"true","options":"true,false","default":"true,false","desc":""}],"paste_data_images":[{"label":"paste_data_images","type":"list","value":"true","options":"true,false","default":"true,false","desc":""}],"pagebuilder_file_theme":[{"label":"pagebuilder_file_theme","type":"string","value":"default.js","default":"default.js","desc":""}],"multitv_file_theme":[{"label":"multitv_file_theme","type":"string","value":"default.js","default":"default.js","desc":""}],"content_css":[{"label":"content_css","type":"string","value":"","default":"","desc":""}],"others_params":[{"label":"others_params","type":"textarea","value":"","default":"","desc":""}]}
 * @internal    @installset base
 * @reportissues https://github.com/Grinyaha/tinyMCE7_plugin_EvolutionCMS
 * @documentation README.md
 * @author      plugin author Alexander Grishin (Grinyaha)
 * @lastupdate  23/03/2026
 */

require MODX_BASE_PATH.'assets/plugins/tinymce7/plugin.tinymce7.php';