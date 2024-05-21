import connectDb from './config/db.js'
import app from './index.js'

app.listen(8000 , async () => {
    await connectDb();
    console.log("app is running on port 8000")
})