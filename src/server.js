import connectDb from './config/db.js'
import app from './index.js'

const port = 8000

app.listen(port , async () => {
    await connectDb();
    console.log("app is running on port ",port)
})