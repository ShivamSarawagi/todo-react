import React from 'react'
import InputToDo from './InputToDo'
import Row from './Row'
import FooterAction from './FooterAction'

class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:'',todo:[],action:{all:true,active:false,completed:false},selectAll:false};
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPressRow = this.handleKeyPressRow.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleFooterAction = this.handleFooterAction.bind(this);
        this.handleActiveState = this.handleActiveState.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
    }

    syncSelectAll(arr){
        var activeCount = 0;
        arr.forEach((item)=>{
            if(item.active){
                activeCount++;
            }
        });
        if(activeCount && this.state.selectAll){
            this.setState({selectAll:false});
        }else if(!activeCount && arr.length){
            this.setState({selectAll:true});
        }
    }

    handleChange(e){
        this.setState({value:e.target.value});
    }

    handleKeyPress(e){
        if (e.key === 'Enter') {
            var timeStamp = new Date();
            var newToDo = [...this.state.todo, {value:e.target.value, edit:false, id:timeStamp.getTime()+'', active:true}];
            this.setState({ todo: newToDo, value:'' });
            this.syncSelectAll(newToDo);
        }
    }

    handleKeyPressRow(e, index){
        if (e.key === 'Enter') {
            var arr = [...this.state.todo];
            arr[index].value = e.target.value;
            arr[index].edit = false;
            this.setState({ todo:arr });
        }
    }

    handleEdit(e, index){
        var arr = [...this.state.todo];
        arr[index].edit = true;
        this.setState({ todo:arr });
    }

    handleDelete(e, index){
        var arr = [...this.state.todo];
        arr.splice(index,1);
        this.setState({ todo:arr });
        this.syncSelectAll(arr);
    }

    handleSelectAll(){
        if(this.state.todo.length){
            const arr = this.state.todo.map((item) =>{
                item.active=this.state.selectAll;
                return item;
            });
            const selectState = !this.state.selectAll
            this.setState({ todo:arr, selectAll:selectState });
            this.syncSelectAll(arr);
        }
    }

    handleFooterAction(key){
        var obj = Object.assign({},this.state.action);
        obj[key]=true;
        for(var k in obj){
            if(obj.hasOwnProperty(k) && k!==key){
                obj[k]=false;
            }
        }
        this.setState({action:obj});
    }

    handleActiveState(e, index){
        var arr = [...this.state.todo];
        arr[index].active=!arr[index].active;
        this.setState({ todo:arr });
        this.syncSelectAll(arr);
    }

    handleClearCompleted(){
        const arr = this.state.todo.filter((item) =>item.active);
            debugger;
        this.setState({todo:arr,selectAll:false});
    }

    render(){
        return (
            <div>
                <InputToDo value={this.state.value} 
                            selectAll={this.state.selectAll}
                            onClick={this.handleSelectAll} 
                            onChange={this.handleChange} 
                            onKeyPress={this.handleKeyPress}/>
                <ul>
                    {
                        this.state.todo.map(function(item,index) {
                            return <Row item={item} 
                                        index={index}
                                        action={this.state.action} 
                                        onChange={this.handleActiveState} 
                                        onKeyPress={this.handleKeyPressRow} 
                                        onDoubleClick={this.handleEdit} 
                                        onClick={this.handleDelete}/>
                        }, this)
                    }
                </ul>
                <FooterAction todo={this.state.todo} 
                              action={this.state.action} 
                              onClick={this.handleFooterAction}
                              onClickClear={this.handleClearCompleted}/>
            </div>
        )
    }
}

export default ToDo