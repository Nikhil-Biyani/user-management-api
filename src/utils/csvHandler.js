import csv from "csv-parser";
import fs from "fs";
import User from '../models/user.js';

export const parseCSV = (filePath, list) => {
    return new Promise((resolve, reject) => {
        const users = [];
        const errors = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                try {
                    const user = {
                        name: row.name,
                        email: row.email,
                        properties: {},
                        list: list._id
                    };

                    list.customProperties.forEach(prop => {
                        user.properties[prop.title] = row[prop.title] || prop.fallback;
                    });

                    users.push(user);
                } catch (error) {
                    errors.push({ row, error: error.message });
                }
            })
            .on('end', () => resolve({ users, errors }))
            .on('error', (error) => reject(error));
    });
};

export default parseCSV;