
import app from './app'
import db from './db'
import sanitizedConfig from './config';

const port= sanitizedConfig.PORT; 
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    db();
});
 
