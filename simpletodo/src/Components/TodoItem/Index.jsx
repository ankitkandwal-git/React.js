import './Index.css'

const TodoItem = props =>{
    const {todoDetails,onChangeDelete} = props
    const {title} = todoDetails
    const onDeleteTodo = id =>{
        console.log(id)
        onChangeDelete(id)
    }
    return(
        <li className="list-item">
            <p className="title">{title}</p>
            <button type="button" className="delete-btn" onClick={onDeleteTodo}>Delete</button>
        </li>

    )
}
export default TodoItem 