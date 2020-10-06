import React, { useEffect } from "react";
import { connect } from "react-redux";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {
  displayAlert,
  loadTodos,
  removeTodoRequest,
  completeTodoRequest,
} from "./thunks";
import { isLoading } from "./reducers";

const TodoList = ({
  todos = [],
  isLoading,
  onRemovePressed,
  onCompletePressed,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onRemovePressed={onRemovePressed}
          onCompletePressed={onCompletePressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  isLoading: state.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletePressed: (id) => dispatch(completeTodoRequest(id)),
  onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
  startLoadingTodos: () => dispatch(loadTodos()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
