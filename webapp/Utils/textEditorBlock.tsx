import * as React from 'react';
import TextEditor from './textEditor'

const defaultProps = {
    content: { html: '', text: '' },
    options: {
        buttons: [
            'header1',
            'header2',
            'bold',
            'italic',
            'underline',
            'anchor',
            'quote',
            'unorderedlist',
            'orderedlist'
        ],
        firstHeader: 'h1',
        secondHeader: 'h2',
        diffLeft: 0,
        diffTop: -10,
        disableDoubleReturn: true
    }
}

interface TextEditorBlock{
    props: any,
    state: any,
    editor: any,
    container: any,
    defaultProps: any,
}
class TextEditorBlock extends React.Component {
    static defaultProps;

    shouldComponentUpdate(props, state) {
        return false
    }

    componentDidMount() {
        this.editor = new (TextEditor as any)(this.container, this.props.options);
    }

    componentWillUnmount() {
        this.editor.deactivate()
    }

    render() {
        return (
            <div className="col-block-medium">
                <div
                    className="col-medium"
                    onBlur={this._onBlur.bind(this)}
                    role="textarea"
                    aria-multiline="true"
                    ref={el => (this.container = el)}
                    dangerouslySetInnerHTML={{ __html: this.props.content.html }}
                />
                {this.props.children}
            </div>
        )
    }

    _onBlur() {
        this.props.onChange({
            text: this.container.textContent,
            html: this.container.innerHTML
        })
    }
}

TextEditorBlock.defaultProps = defaultProps;

export default TextEditorBlock;