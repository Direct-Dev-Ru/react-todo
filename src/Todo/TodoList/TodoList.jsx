import React from "react";
import PropTypes from "prop-types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

const styles = {
	ul: {
		listStyle: "none",
		textAlign: "left",
		fontSize: "25px",
		margin: "40px",
	},
};

function TodoList(props) {
	let todos = props.todos;

	return (
		<div className="todolist__wrapper">
            <h2>TODO List:</h2>
			<ul style={styles.ul}>
				{props.todos.map((todo, idx) => {
					return <TodoItem todo={todo} idx={idx} key={todo.id} onChange={props.onToggle} />;
				})}
			</ul>
		</div>
	);
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
	onToggle: PropTypes.func.isRequired,
};

export default TodoList;
