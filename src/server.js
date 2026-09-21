const app = require("./app");

const PUERTO = process.env.MIPUERTO || 3000;

app.listen(PUERTO, () =>{
    console.log(`SERVIDOR FUNCIONANDO http://localhost:${PUERTO}`);
})