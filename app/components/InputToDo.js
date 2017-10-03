import React from 'react'

class InputToDo extends React.Component {
    render(){
        return (<div className={'input-todo'}>
                    <div className={ this.props.selectAll?'select-all':'' } onClick={this.props.onClick}>v</div>
                    <input type="text" value={this.props.value} onChange={this.props.onChange} onKeyPress={this.props.onKeyPress} />
                </div>
            )
    } 
}

export default InputToDo