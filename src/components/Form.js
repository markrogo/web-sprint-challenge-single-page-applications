import React, { useState, useEffect } from "react";
import { Router, Switch } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string()
        .min (2, "must include at least two characters")
        .required ("Name must be at least 2 characters"),
    size: yup.string().required ("Select a size from the menu"),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    onions: yup.boolean(),
    salami: yup.boolean(),
    instructions: yup.string()


})

export default function Form () {
    // const [formState, setFormState] = useState ({
    //     name: "",
    //     size: "",
    //     pepperoni: false,
    //     sausage: false,
    //     onions: false,
    //     salami: false,
    //     instructions: ""
    // });

    const blankState = {
   
        name: "",
        size: "",
        pepperoni: false,
        sausage: false,
        onions: false,
        salami: false,
        instructions: ""
    };

const [formState, setFormState] = useState(blankState); 

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);

   
    
    const [errorState, setErrorState] = useState ({
        name: "",
        size: "",
        pepperoni: false,
        sausage: false,
        onions: false,
        salami: false,
        instructions: ""
    });

    const validate = e => {
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
          .reach(formSchema, e.target.name)
          .validate(value)
          .then(valid => {
            setErrorState({
              ...errorState,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrorState({
              ...errorState,
              [e.target.name]: err.errors[0]
            });
          });
      };

      const inputChange = e => {
        e.persist();
        // console.log("input changed!", e.target.value, e.target.checked);
        validate(e);
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
      };

      const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => console.log(response))
          .catch(err => console.log(err));
        setFormState (blankState);
      };

  return (
      <>
    <form onSubmit={formSubmit}>
        <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errorState.name.length > 2 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
        </label>
         <label htmlFor="size">
        What size pizza would you like?
        <select
          value={formState.size}
          name="size"
          id="size"
          onChange={inputChange}
        >
            <option value ="">Select a size from the dropdown</option>            
            <option value="12-inch">12 inch</option>
            <option value="14-inch">14 inch</option>
            <option value="16-inch">16 inch</option>
            <option value="20-inch">20 inch</option>
            </select>
            {errorState.size.length > 0 ? (
                     <p className="error">{errorState.size}</p>
                ) : null}
        </label>

        <label htmlFor="pepperoni">
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        Pepperoni 
    
      </label>
      <label htmlFor="sausage">
        <input
          type="checkbox"
          id="sausage"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />
        Sausage
      </label>
      <label htmlFor="onions">
        <input
          type="checkbox"
          id="onions"
          name="onions"
          checked={formState.onions}
          onChange={inputChange}
        />
        Onions
      </label>
      <label htmlFor="salami">
        <input
          type="checkbox"
          id="salami"
          name="salami"
          checked={formState.salami}
          onChange={inputChange}
        />
        Salami
      </label>


        <label htmlFor="instructions">
        Any special instructions (half topping, etc.)?
        <textarea
          name="instructions"
          id="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
       
      </label>
      <button disabled={buttonDisabled}>Order</button>
    </form>

  <pre>Here's what you ordered: {JSON.stringify(formState)}</pre>
  </>
  );
};

