import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect("mongodb+srv://ankitdhilpe123:qRr9S7qxo26ioh5P@cluster0.qey54.mongodb.net/Blog-website");
        console.log(`Database Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB; 