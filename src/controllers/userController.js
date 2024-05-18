import User from "../models/user.js";
import List from "../models/list.js";
import csvHandler from "../utils/csvHandler.js";


export const uploadUsers = async(req, res) => {
    const listId = req.params.listId;
    const filePath = req.file.path;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const { users, errors } = await csvHandler.parseCSV(filePath, list);
        const addedUsers = await User.insertMany(users);
        const notAddedCount = errors.length;

        res.status(200).json({
            addedCount: addedUsers.length,
            notAddedCount,
            totalCount: await User.countDocuments({ list: listId }),
            errors
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendEmail = async(req, res) => {
    const listId = req.params.listId;
    const { subject, body } = req.body;

    try {
        const users = await User.find({ list: listId, unsubscribed: false });
        const emailPromises = users.map(user => emailUtil.sendEmail(user, subject, body));

        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unsubscribeUser = async(req, res) => {
    const userId = req.params.userId;

    try {
        await User.findByIdAndUpdate(userId, { unsubscribed: true });
        res.status(200).json({ message: 'User unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};