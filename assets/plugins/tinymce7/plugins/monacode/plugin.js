/**
 * TinyMCE 7 Monaco Editor Plugin v3.4.2
 *
 * @version 3.4.2
 */

(function() {
    'use strict';

    var MONACO_BASE_PATH = '/assets/plugins/tinymce7/plugins/monacode/monaco/vs';

    var DEFAULT_CONFIG = {
        theme: 'vs',
        fontSize: 14,
        minimap: true,
        wordWrap: 'on',
        tabSize: 2,
        formatOnOpen: true,
        language: 'ru',
        emmet: true
    };

    function formatHtml(html) {
        var formatted = '', indent = 0, tab = '  ';
        html = html.replace(/>\s+</g, '><');
        var tokens = html.split(/(<[^>]+>)/g);
        var selfClosing = ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr','!'];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (!token.trim()) continue;
            var tagMatch = token.match(/<\/?(\!?[\w]+)/);
            if (tagMatch) {
                var tag = tagMatch[1].toLowerCase().replace('!', '');
                if (token.match(/^<\//)) {
                    indent = Math.max(0, indent - 1);
                    formatted += tab.repeat(indent) + token + '\n';
                } else if (token.match(/\/>$/) || selfClosing.indexOf(tag) > -1 || token.match(/^<!/)) {
                    formatted += tab.repeat(indent) + token + '\n';
                } else {
                    formatted += tab.repeat(indent) + token + '\n';
                    indent++;
                }
            } else if (token.trim()) {
                formatted += tab.repeat(indent) + token.trim() + '\n';
            }
        }
        return formatted.trim();
    }

    function getMonacoIframeHtml(content, config, monacoPath) {
        var emmetCode = ''
            + 'var Emmet={'
            + 'voidEls:"area base br col embed hr img input link meta param source track wbr".split(" "),'
            + 'tabSize:2,'
            + 'parse:function(a){if(!a)return"";a=a.trim();var r=this.parseExpr(a,0);return r?this.toHtml(r.node,0):""},'
            + 'parseExpr:function(s,p){var root={type:"root",children:[]};var cur=root;var i=p;while(i<s.length){var c=s[i];if(c==="("){var gr=this.parseExpr(s,i+1);if(gr){var gn={type:"group",children:gr.node.children};var mm=s.substring(gr.pos).match(/^\\*(\\d+)/);if(mm){gn.mult=parseInt(mm[1]);gr.pos+=mm[0].length}cur.children.push(gn);i=gr.pos}}else if(c===")"){return{node:root,pos:i+1}}else if(c===">"){if(cur.children.length>0){var lc=cur.children[cur.children.length-1];if(lc.type==="element")cur=lc}i++}else if(c==="+"){while(cur.parent)cur=cur.parent;i++}else if(c==="^"){if(cur.parent)cur=cur.parent;if(cur.parent)cur=cur.parent;i++}else if(/[a-zA-Z]/.test(c)){var er=this.parseEl(s,i);if(er){er.node.parent=cur;cur.children.push(er.node);i=er.pos}else i++}else i++}return{node:root,pos:i}},'
            + 'parseEl:function(s,p){var n="div",cl=[],id="",at="",tx="",mt=1;var i=p;var nm=s.substring(i).match(/^([a-zA-Z][a-zA-Z0-9\\-]*)/);if(nm){n=nm[1];i+=nm[0].length}while(i<s.length){var c=s[i];if(c==="."){var cm=s.substring(i+1).match(/^([a-zA-Z0-9_\\-]+)/);if(cm){cl.push(cm[1]);i+=1+cm[0].length}else i++}else if(c==="#"){var im=s.substring(i+1).match(/^([a-zA-Z0-9_\\-]+)/);if(im){id=im[1];i+=1+im[0].length}else i++}else if(c==="["){var j=i+1,q=null;while(j<s.length){var ch=s[j];if(q){if(ch==="\\\\"){j+=2}else if(ch===q){q=null;j++}else{j++}}else if(ch==="\\\""||ch==="\\\'"){q=ch;j++}else if(ch==="]"){break}else{j++}}at=s.substring(i+1,j);i=j+1}else if(c==="{"){var d=1,j=i+1;while(j<s.length&&d>0){if(s[j]==="{")d++;if(s[j]==="}")d--;j++}tx=s.substring(i+1,j-1);i=j}else if(c==="*"){var mm=s.substring(i+1).match(/^(\\d+)/);if(mm){mt=parseInt(mm[1]);i+=1+mm[0].length}else i++}else if(c===">"||c==="+"||c==="^"||c===")"||c==="(")break;else i++}return{node:{type:"element",name:n,classes:cl,id:id,attrs:at,text:tx,mult:mt,children:[]},pos:i}},'
            + 'indent:function(n){var t="";for(var i=0;i<n;i++)t+="  ";return t},'
            + 'toHtml:function(n,lv,num){num=num||1;var h="";var t=this.indent(lv);if(n.type==="root"){for(var i=0;i<n.children.length;i++){h+=this.toHtml(n.children[i],lv,1);if(i<n.children.length-1)h+="\\n"}}if(n.type==="group"){var m=n.mult||1;var ga=[];for(var k=0;k<m;k++){for(var i=0;i<n.children.length;i++){ga.push(this.toHtml(n.children[i],lv,k+1))}}h=ga.join("\\n")}if(n.type==="element"){var mt=n.mult||1;var el=[];for(var k=0;k<mt;k++){var num=k+1;var tn=n.name;var isVoid=this.voidEls.indexOf(tn)>-1;var as="";if(n.id)as+=\' id="\'+n.id.replace(/\\$/g,num)+\'"\';if(n.classes.length){var cs=n.classes.map(function(x){return x.replace(/\\$/g,num)}).join(" ");as+=\' class="\'+cs+\'"\'}if(n.attrs)as+=" "+n.attrs;if(isVoid){el.push(t+"<"+tn+as+" />");continue}var tx=n.text?n.text.replace(/\\$/g,num):"";var ch="";if(n.children.length>0){ch="\\n";for(var i=0;i<n.children.length;i++){ch+=this.toHtml(n.children[i],lv+1,num);if(i<n.children.length-1)ch+="\\n"}ch+="\\n"+t}el.push(t+"<"+tn+as+">"+tx+ch+"</"+tn+">")}h=el.join("\\n")}return h}'
            + '};';

        var formatCode = ''
            + 'function formatHtmlCode(html){'
            + 'var formatted="",indent=0,tab="  ";'
            + 'html=html.replace(/\\>\\s+\\</g,"><");'
            + 'var tokens=html.split(/(<[^>]+>)/g);'
            + 'var selfClosing="area base br col embed hr img input link meta param source track wbr".split(" ");'
            + 'for(var i=0;i<tokens.length;i++){'
            + 'var token=tokens[i];'
            + 'if(!token.trim())continue;'
            + 'var tagMatch=token.match(/<\\/?(!?[\\w]+)/);'
            + 'if(tagMatch){'
            + 'var tag=tagMatch[1].toLowerCase().replace("!","");'
            + 'if(token.match(/^<\\//)){'
            + 'indent=Math.max(0,indent-1);'
            + 'formatted+=tab.repeat(indent)+token+"\\n";'
            + '}else if(token.match(/\\/>$/)||selfClosing.indexOf(tag)>-1||token.match(/^<!/)){'
            + 'formatted+=tab.repeat(indent)+token+"\\n";'
            + '}else{'
            + 'formatted+=tab.repeat(indent)+token+"\\n";'
            + 'indent++;'
            + '}'
            + '}else if(token.trim()){'
            + 'formatted+=tab.repeat(indent)+token.trim()+"\\n";'
            + '}'
            + '}'
            + 'return formatted.trim();'
            + '}';

        var workerConfig = ''
            + 'window.MonacoEnvironment={'
            + 'getWorker:function(workerId,label){return null},'  // явно возвращаем null
            + 'getWorkerUrl:function(){return"data:text/javascript;charset=utf-8,"}'
            + '};';

        var mainCode = ''
            + 'require.config({paths:{vs:"' + monacoPath + '"}});'
            + 'var editor,emmetOn=' + (config.emmet !== false ? 'true' : 'false') + ';'
            + 'require(["vs/editor/editor.main"],function(){'
            + 'document.getElementById("loading").classList.add("hidden");'
            + 'editor=monaco.editor.create(document.getElementById("editor"),{'
            + 'value:' + JSON.stringify(content) + ','
            + 'language:"html",'
            + 'theme:"' + (config.theme || 'vs') + '",'
            + 'automaticLayout:true,'
            + 'minimap:{enabled:' + (config.minimap !== false) + '},'
            + 'fontSize:' + (config.fontSize || 14) + ','
            + 'wordWrap:"' + (config.wordWrap || 'on') + '",'
            + 'tabSize:' + (config.tabSize || 2) + ','
            + 'folding:true,'
            + 'scrollBeyondLastLine:false,'
            + 'renderWhitespace:"none",'
            + 'quickSuggestions:false,'
            + 'wordBasedSuggestions:"off",'
            + 'suggest:{showWords:false}'
            + '});'
            + 'editor.addCommand(monaco.KeyCode.Tab,function(){'
            + 'if(!emmetOn){editor.trigger("keyboard","type",{text:"  "});return}'
            + 'var p=editor.getPosition();'
            + 'var ln=editor.getModel().getLineContent(p.lineNumber);'
            + 'var bf=ln.substring(0,p.column-1);'
            + 'var mt=bf.match(/([a-zA-Z0-9\\.\\#\\>\\+\\^\\*\\(\\)\\[\\]\\{\\}\\-]+)$/);'
            + 'if(mt){var r=Emmet.parse(mt[1]);if(r){'
            + 'editor.executeEdits("emmet",[{range:new monaco.Range(p.lineNumber,p.column-mt[1].length,p.lineNumber,p.column),text:r}]);'
            + 'return}}'
            + 'editor.trigger("keyboard","type",{text:"  "})});'
            + 'document.getElementById("theme").onchange=function(){monaco.editor.setTheme(this.value);editor.focus()};'
            + 'document.getElementById("font").onchange=function(){editor.updateOptions({fontSize:+this.value});editor.focus()};'
            + 'document.getElementById("fmtBtn").onclick=function(){'
            + 'var v=editor.getValue();'
            + 'var f=formatHtmlCode(v);'
            + 'editor.setValue(f);'
            + 'editor.focus()};'
            + 'document.getElementById("emBtn").onclick=function(){var a=prompt("Emmet:","ul>li*3");if(a){var r=Emmet.parse(a);if(r){var p=editor.getPosition();editor.executeEdits("emmet",[{range:new monaco.Range(p.lineNumber,p.column,p.lineNumber,p.column),text:r}]);editor.focus()}}};'
            + 'editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,function(){window.parent.postMessage({type:"save",content:editor.getValue()},"*")});'
            + 'editor.addCommand(monaco.KeyCode.Escape,function(){window.parent.postMessage({type:"close"},"*")});'
            + 'editor.focus()});'
            + 'window.onmessage=function(e){if(e.data.type==="get"){window.parent.postMessage({type:"content",content:editor?editor.getValue():""},"*")}};';

        return ''
            + '<!DOCTYPE html><html><head><meta charset="UTF-8">'
            + '<style>'
            + '*{margin:0;padding:0;box-sizing:border-box}'
            + 'html,body{width:100%;height:100%;overflow:hidden;background:#1e1e1e}'
            + '.tb{display:flex;gap:8px;padding:8px 12px;height:44px;background:#2d2d2d;border-bottom:1px solid #404040;align-items:center;font-family:sans-serif}'
            + '.tb label{color:#ccc;font-size:12px}'
            + '.tb select{padding:4px 8px;border-radius:3px;border:1px solid #555;background:#3d3d3d;color:#ccc;font-size:12px}'
            + '.tb button{padding:5px 12px;border-radius:3px;border:none;background:#0e639c;color:#fff;font-size:12px;cursor:pointer}'
            + '.tb button:hover{background:#1177bb}'
            + '.tb .h{color:#666;font-size:11px;margin-left:auto}'
            + '#editor{position:absolute;top:44px;left:0;right:0;bottom:0}'
            + '#loading{position:absolute;top:44px;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background:#1e1e1e;color:#fff;font-family:sans-serif}'
            + '#loading.hidden{display:none}'
            + '</style>'
            + '<link rel="stylesheet" href="' + monacoPath + '/editor/editor.main.css">'
            + '</head><body>'
            + '<div class="tb">'
            + '<label>Тема:</label>'
            + '<select id="theme"><option value="vs-dark">Dark</option><option value="vs" selected>Light</option><option value="hc-black">High Contrast</option></select>'
            + '<label>Шрифт:</label>'
            + '<select id="font"><option value="12">12</option><option value="14" selected>14</option><option value="16">16</option></select>'
            + '<button id="fmtBtn">Формат</button>'
            + '<button id="emBtn">Emmet</button>'
            + '<span class="h">Tab=Emmet</span>'
            + '</div>'
            + '<div id="loading">Загрузка...</div>'
            + '<div id="editor"></div>'
            + '<script src="' + monacoPath + '/loader.js"><\/script>'
            + '<script>' + workerConfig + emmetCode + formatCode + mainCode + '<\/script>'
            + '</body></html>';
    }

    function openDialog(ed) {
        var cfg = {};
        for (var k in DEFAULT_CONFIG) cfg[k] = DEFAULT_CONFIG[k];
        var uc = ed.getParam('monaco_config', {});
        for (var k in uc) cfg[k] = uc[k];

        var cnt = cfg.formatOnOpen ? formatHtml(ed.getContent()) : ed.getContent();
        var id = 'm' + Date.now();
        var h = Math.min(window.innerHeight - 100, 510);
        var mp = cfg.monacoPath || MONACO_BASE_PATH;

        var html = '<style>#' + id + '{width:100%;height:' + h + 'px;background:#1e1e1e}#' + id + ' iframe{width:100%;height:100%;border:none}</style>'
            + '<div id="' + id + '"><iframe id="' + id + 'f" sandbox="allow-scripts allow-same-origin allow-modals"></iframe></div>';

        ed.windowManager.open({
            title: 'Исходный код HTML',
            size: 'large',
            body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] },
            buttons: [
                { type: 'cancel', text: 'Отмена' },
                { type: 'submit', text: 'Сохранить', primary: true }
            ],
            onSubmit: function(api) {
                var f = document.getElementById(id + 'f');
                if (f && f.contentWindow) {
                    f.contentWindow.postMessage({ type: 'get' }, '*');
                    var handler = function(e) {
                        if (e.data.type === 'content') {
                            window.removeEventListener('message', handler);
                            ed.setContent(e.data.content);
                            ed.undoManager.add();
                            api.close();
                        }
                    };
                    window.addEventListener('message', handler);
                } else {
                    api.close();
                }
            }
        });

        setTimeout(function() {
            var f = document.getElementById(id + 'f');
            if (f) {
                var d = f.contentDocument || f.contentWindow.document;
                d.open();
                d.write(getMonacoIframeHtml(cnt, cfg, mp));
                d.close();
            }
        }, 100);
    }

    tinymce.PluginManager.add('monacode', function(ed) {
        ed.addCommand('mceMonacoSource', function() { openDialog(ed); });
        ed.ui.registry.addButton('monacode', {
            icon: 'sourcecode',
            text: "HTML",
            tooltip: 'Исходный код',
            onAction: function() { ed.execCommand('mceMonacoSource'); }
        });
        ed.ui.registry.addMenuItem('monacode', {
            icon: 'sourcecode',
            text: 'Исходный код',
            onAction: function() { ed.execCommand('mceMonacoSource'); }
        });
        ed.shortcuts.add('alt+shift+h', 'Исходный код', function() { ed.execCommand('mceMonacoSource'); });

        return {
            getMetadata: function() {
                return { name: 'Monaco Editor 0.55.1', version: '3.4.0' };
            }
        };
    });

})();
