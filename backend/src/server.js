const app = require('./app')
const PORT = process.env.PORT || 3333;

app.listen(PORT, ()=>{
    console.log(
    `
    Server Running on PORT ${PORT}       
    link: http://127.0.0.1:${PORT}
    `)
})
