import React from 'react'

class Row extends React.Component {
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleActiveState = this.handleActiveState.bind(this);
    }

    handleActiveState(e){
        this.props.onChange(e,this.props.index);
    }

    handleDelete(e) {
        this.props.onClick(e,this.props.index);
    }

    handleKeyPress(e) {
        this.props.onKeyPress(e,this.props.index);
    }

    handleEdit(e){
        this.props.onDoubleClick(e,this.props.index);
    }

    render(){
        function visibility(that){
            if(that.props.action['active']){
                return that.props.item.active;
            }else if(that.props.action['completed']){
                return !that.props.item.active;
            }else{
                return true;
            }
        }

        return (
                <li key={this.props.item.id} className={visibility(this)?'':'hide'}>
                    <div className={this.props.item.edit?'hide':''}>
                        <div className={'row-item'}>
                            <input type='checkbox' 
                                    onChange={this.handleActiveState} 
                                    checked={!this.props.item.active}/>
                        </div>
                        <div className={'row-item'} 
                            onDoubleClick={this.handleEdit} 
                            style={!this.props.item.active?{textDecoration:'line-through'}:{}}>
                            {this.props.item.value}
                        </div>
                        <div className={'row-item text-right'} onClick={this.handleDelete}>x</div>
                    </div>
                    <input type='text' 
                            className={this.props.item.edit?'':'hide'} 
                            defaultValue={this.props.item.value} 
                            onKeyPress={this.handleKeyPress}/>
                </li>
        )
    }
}

export default Row