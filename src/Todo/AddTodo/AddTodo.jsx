import React, { useState } from "react";
import Context from "../../context"; // для передачи функций и данных по всем уровням вложенности
import "./AddTodo.css";
import PropTypes from "prop-types";

//Own hook
function useInputValue(defaultValue = "") {
	const [value, setValue] = useState(defaultValue);

	return {
		bind: {
			value: value,
			onChange: (event) => setValue(event.target.value),
		},
		clear: () => setValue(""),
		value: () => value,
	};
}

function AddTodo({ onCreate }) {
	// деструктуризация состояния - задаем переменной value пустое значение
	// setvalue - становится методом для установки этого значения
	const [value, setValue] = useState("");

	//Через свой хук
	const input = useInputValue("");

	function submitHandler(event) {
		event.preventDefault();

		/* if (value.trim()){
            onCreate(value);
            setValue('');
        } */

		if (input.value().trim()) {
            onCreate(input.value());
            input.clear();
		}
	}

	const el = (
		<div className="addTodo__block">
			<form onSubmit={submitHandler}>
				{/* 				<input value={value} type="text" name="title" id="todoTitle" placeholder="Enter todo title" 
                    onChange={(event) => {
                        setValue(event.target.value)
                    }}/> */}
				<input {...input.bind} />
				<button type="submit">Add Todo</button>
			</form>
		</div>
	);

	return el;
}

AddTodo.propTypes = {
	onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
