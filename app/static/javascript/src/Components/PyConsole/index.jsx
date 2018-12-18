import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { baseUrl } from "../../resources/constants";
import AceEditor from 'react-ace';
import axios from 'axios';
import { handleSettingsChange } from "../../resources/redux/actions/settings";



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



const styles = theme => ({
    root: {
        padding: 10,
        height: '85vh',
        overflowY: 'auto'
    },
    card: {
        marginBottom: 10,
    },
    inputField: {
        width: '100%'
    },
    lineInput: {
        [theme.breakpoints.down('xs')]: {
            // padding: theme.spacing.unit,
        },
    },
    cardContent: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    textField: {
        width: '100%',
        paddingLeft: 130,
        paddingRight: 100,
        [theme.breakpoints.down('xs')]: {
            minHeight: '10px',
            paddingLeft: 50,
            paddingRight: 50,
        },
    }

})

export class PyConsole extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            code: { '0': `"""""".join([1, 2, 3, 4])` },
            codeOutput: { '0': `1234` },
            settings: {
                ...props.settings
            },
            rows: [1]
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


    onCodeChanged = (code, index) => this.setState({ code: { ...this.state.code, [index]: code } })

    onLoad = (editor, index) => {
        editor.on('change', (arg, activeEditor) => {
            const aceEditor = activeEditor;
            const newHeight = aceEditor.getSession().getScreenLength() *
                (aceEditor.renderer.lineHeight + aceEditor.renderer.scrollBar.getWidth());
            aceEditor.container.style.height = `${newHeight}px`;
            aceEditor.resize();
        });
    };

    onEnterPressed = event => {
        if (event.key === 'Enter' && event.shiftKey) {
            //Do whatever when esc is pressed
            const rows = Object.keys(this.state.code).length
            console.log(rows)
            this.setState({
                rows: [...this.state.rows, rows],
            })
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onEnterPressed, false);
        // const customMode = new CustomSqlMode();
        // console.log(this.refs.aceEditor.editor)
        // this.refs.aceEditor.editor.getSession().setMode(customMode);
    }


    selectedRow = false;
    selectedRowNo = null;
    intent = null;
    onBeforeLoad = (ace, index) => {
        let langTools = ace.acequire('ace/ext/language_tools');
        let editor = ace.edit(`editor${index}`)
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
                    console.log(intent)
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
        const { classes } = this.props;
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
            <div className={classes.root}>
                {this.state.rows.map((item, index) => <Card key={index} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        {/* <TextField
                            defaultValue="Bare"
                            margin="normal"
                            className={classes.inputField}
                            variant="outlined"
                        /> */}
                        <Typography variant={'body1'} className={classes.lineInput}>
                            In [{index + 1}]
                        </Typography>
                        <AceEditor
                            mode={language}
                            ref={'aceEditor' + index.toString()}
                            theme={(theme === 'dark') ? "monokai" : "crimson_editor"}
                            name={"editor" + index.toString()}
                            splits={splits}
                            orientation={orientation}
                            value={this.state.code[index.toString()]}
                            onLoad={editor => this.onLoad(editor, index)}
                            onChange={code => this.onCodeChanged(code, index)}
                            debounceChangePeriod={1}
                            onBeforeLoad={ace => this.onBeforeLoad(ace, index.toString())}
                            focus={true}
                            showPrintMargin={true}
                            fontSize={fontSize}
                            wrapEnabled
                            showGutter
                            highlightActiveLine={true}
                            height={'20px'}
                            style={{ width: '80%' }}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                tabSize: tabSize,
                                showGutter: false,
                                showLineNumbers: false,
                                animatedScroll: true,
                                useWorker: true
                            }}
                            editorProps={{ $blockScrolling: 'Infinity' }}
                        />
                    </CardContent>
                    {this.state.codeOutput[index.toString()] && <TextField
                        defaultValue={this.state.codeOutput[index.toString()]}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />}
                </Card>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
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

const mapDispatchToProps = {
    handleSettingsChange
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PyConsole))
