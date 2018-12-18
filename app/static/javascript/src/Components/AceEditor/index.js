import axios from 'axios';
import { baseUrl } from "../../resources/constants";
import React, { Component } from 'react';
import { split as SplitEditor } from 'react-ace';
import connect from "react-redux/es/connect/connect";
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/theme/crimson_editor';
import 'brace/theme/dracula';
import 'brace/theme/eclipse';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow_night_blue';
import 'brace/theme/tomorrow_night_eighties';

export class AceEditor extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            code: [`def foo():
  #do_some_stuff() here
  return None

class Bar:
  def __init__(self):
    if True:
      print("True")
    else:
      print("False")

# A comment`, `def foo():
  #do_some_stuff() here
  return None

class Bar:
  def __init__(self):
    if True:
      print("True")
    else:
      print("False")

# A comment`],
            settings: {
                ...props.settings
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                settings: {
                    ...nextProps.settings
                }
            })
        }
    }


    onCodeChanged = (code) => this.setState({ code: code })

    onLoad = editor => {
        // console.log(editor)
        window.addEventListener('resize', () => {
            editor.resize();
        });
    };

    componentDidMount() {
        // const customMode = new CustomSqlMode();
        // console.log(this.refs.aceEditor.editor)
        // this.refs.aceEditor.editor.getSession().setMode(customMode);
    }


    selectedRow = false;
    selectedRowNo = null;
    intent = null;
    onBeforeLoad = ace => {
        let langTools = ace.acequire('ace/ext/language_tools');
        let editor = ace.edit('editor')
        // console.log(ace)
        let classRef = this;
        editor.$blockScrolling = 'Infinity'
        editor.setOptions({ enableBasicAutocompletion: true, enableLiveAutocompletion: true });
        // let snippetManager = ace.acequire("ace/snippets").snippetManager
        // console.log(snippetManager)
        // ace.define("ace/snippets/python", ["require", "exports", "module"], (e, t, n) => {
        //     console.log(t)
        //     t.snippetText = 'snippet #!\n	#!/usr/bin/env python\nsnippet load\n	import ${1:kill}\n', t.scope = "python"
        // })
        let customCompleter = {
            getCompletions: async function (editor, session, pos, prefix, callback) {
                let completions = []
                let data = []
                if (prefix.length === 0) {
                    callback(null, []);
                    return
                }
                if (prefix.startsWith('--')) {
                    classRef.selectedRow = true
                    classRef.selectedRowNo = pos.row

                } else if (pos.row !== classRef.selectedRowNo) {
                    classRef.selectedRowNo = null
                    classRef.selectedRow = null
                    classRef.intent = null
                }
                if (classRef.selectedRow) {
                    const intent = session.getLine(pos.row).replace("--", "").replace("#", "").trim()
                    if (intent) {
                        const res = await axios.get(`${baseUrl}/api/snippets/${intent}`)
                        data = res.data.data;
                        data.forEach((item) => {
                            completions.push({
                                // caption: intent,
                                type: 'snippet',
                                meta: 'snippet',
                                // name: item.command,
                                value: item.command,
                                snippet: `${item.command}\n${item.snippet}`
                            })
                        })
                    }
                }
                return callback(null, completions)
            }
        };

        langTools.addCompleter(customCompleter);

    }
    render() {
        const {
            theme,
            language,
            tabSize,
            fontSize,
            // lazyMode,
            lineNumbers,
            splits,
            orientation
        } = this.state.settings;

        return (
                <SplitEditor
                    mode={language}
                    ref={'aceEditor'}
                    theme={(theme === 'dark') ? "monokai" : "crimson_editor"}
                    name="editor"
                    splits={splits}
                    orientation={orientation}
                    value={this.state.code}
                    onLoad={this.onLoad}
                    onChange={this.onCodeChanged}
                    debounceChangePeriod={1}
                    onBeforeLoad={this.onBeforeLoad}
                    focus={true}
                    showPrintMargin={true}
                    fontSize={fontSize}
                    wrapEnabled={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    width="100%"
                    height="90%"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        tabSize: tabSize,
                        showGutter: true,
                        showLineNumbers: lineNumbers,
                        animatedScroll: true,
                        useWorker: true
                    }}
                    editorProps={{ $blockScrolling: 'Infinity' }}
                />
        )
    }
}

const mapStateToProps = state => ({
    settings: {
        theme: state.settings.theme,
        tabSize: state.settings.tabSize,
        fontSize: state.settings.fontSize,
        lazyMode: state.settings.lazyMode,
        lineNumbers: state.settings.lineNumbers,
        splits: state.settings.splits,
        language: state.settings.language,
        orientation: state.settings.orientation
    }
})

export default connect(mapStateToProps)(AceEditor)
