
import React,{useReducer,createContext} from "react";
import contextReducer from "./contextReducer"

const initialState= JSON.parse(localStorage.getItem("transactions")) ||[];
export const ExpenseTrackerContext =createContext(initialState);

export const Provider=({children})=>{

    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const deleteTransaction=(id)=>{
        dispatch({type:"DELETE_TRANSACTION",payload: id})
    }

    const addTransaction=(transaction)=>{
        dispatch({type:"ADD_TRANSACTION",payload: transaction})
    }

    const balance = transactions.reduce((acc,curVall)=>curVall.type==="Expense"?acc-curVall.amount:acc+curVall.amount,0);
    
    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction ,addTransaction,transactions,balance
        }} >
            {children}
        </ExpenseTrackerContext.Provider>
    )
}

