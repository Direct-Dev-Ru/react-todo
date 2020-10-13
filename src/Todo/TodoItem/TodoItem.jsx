import React, {useContext} from "react";
import PropTypes from "prop-types";
import Context from "../../context";

const styles = {
	li: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: ".5rem 1rem",
		border: "1px solid #ccc",
		borderRadius: "4px",
		marginBottom: ".5rem",
	},
	input: {
		marginRight: "1rem",
	},
};

function TodoItem({ todo, idx, onChange }) {

    // Получили из контекста функцию - пришла из App
    const {removeTodo} = useContext(Context); 
    
    const classes = [];

    if (todo.completed){
        classes.push('done');
    }
	return (
		<li style={styles.li}>
			<span className={classes.join(' ')}>
				<input
                    type="checkbox"
                    checked = {todo.completed}
					style={styles.input}
					onChange={() => onChange(todo.id)}
				/>
				<strong>{idx + 1}.</strong>
				&nbsp;&nbsp;
				{todo.title}
			</span>
            {/* removeTodo.bind(null, todo.id) - отложенный вызов просто removeTodo.(todo.id) 
            нельзя писать иначе при рендеринге удалится все изначально - аналог - стрелоч функция*/}
			<button className="rm" onClick={removeTodo.bind(null, todo.id)}>&times;</button>
		</li>
	);
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	idx: PropTypes.number,
	onChange: PropTypes.func.isRequired,
};

export default TodoItem;
