import React from 'react';

class FooterAction extends React.Component{
    constructor(props){
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }
    
    handleAction(e){
        this.props.onClick(e.currentTarget.dataset.key);
    }

    render(){
        function getActive(that){
            var count=0;
            that.props.todo.forEach(function(item){
                if(item.active){
                    count++;
                }
            });
            return count;
        }
        return (
            <div className={'footer-action'}>
                <div className={'align-inline count'}><span>{getActive(this) + ' items left'}</span></div>
                <div className={'align-inline actions'}>
                    <div className={'align-inline ' + (this.props.action.all ? 'selected' : '')} 
                         data-key='all' 
                         onClick={this.handleAction}>
                         <span>All</span>
                    </div>
                    <div className={'align-inline ' + (this.props.action.active ? 'selected' : '')} 
                         data-key='active' 
                         onClick={this.handleAction}>
                         <span>Active</span>
                    </div>
                    <div className={'align-inline ' + (this.props.action.completed ? 'selected' : '')}
                         data-key='completed' 
                         onClick={this.handleAction}>
                         <span>Completed</span>
                    </div>
                </div>
                <div className={'align-inline count clear'} onClick={this.props.onClickClear}><span>Clear completed</span></div>
            </div>
        )  
    }
}

export default FooterAction