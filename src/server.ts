import {app} from './app'
const port=3333

app.listen(port,()=>{
    console.log('SERVIDOR: ',`http://localhost:${port}`)

})