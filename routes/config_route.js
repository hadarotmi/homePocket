const usersR=require("./users")
const incomesR=require("./incomes")
const expensesR=require("./expenses")
const budgetsR=require("./budgets")


exports.routesInit=(app)=>{
    app.use("/users",usersR)
    app.use("/incomes",incomesR)
    app.use("/expenses",expensesR)
    app.use("/budgets",budgetsR)
}
