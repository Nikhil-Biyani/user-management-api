import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    customProperties: [
        {
            title: { type: String, required: true },
            fallback: { type: String, required: true }
        }
    ]
});

const List = mongoose.model('List', ListSchema);
export default List;
