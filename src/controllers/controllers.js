import fs from "fs";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import List from "../models/models.js";
import nodemailer from "nodemailer";

export const createList = async(req, res) => {
    const { title, properties } = req.body;
    const list = await new List({ title, properties });
    await list.save();
    res.status(200).json({list});
}

export const addUsers = async(req, res) => {
    const {listId} = req.params;
    const list = await List.findById(listId);

    if(!list) {
        res.status(404).json({message: "List not found"});
    }

    const results = [];
    const errors = [];
    const addedEmails = new Set(list.users.map(user => user.email));
    const defaultValues = list.properties.reduce((acc, prop) => {
        acc[prop.title] = prop.defaultValue;
        return acc;
    }, {});

    fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => {
      const { name, email, ...props } = data;
      if (!name || !email || addedEmails.has(email)) {
        errors.push({ ...data, error: 'Missing required fields or duplicate email' });
      } else {
        addedEmails.add(email);
        const properties = { ...defaultValues, ...props };
        list.users.push({ name, email, properties });
      }
    })
    .on('end', async () => {
      await list.save();
      fs.unlinkSync(req.file.path); // Clean up the uploaded CSV file

      // Create error CSV if there are errors
      if (errors.length > 0) {
        const errorCsvWriter = createObjectCsvWriter({
          path: 'uploads/errors.csv',
          header: [
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            ...list.properties.map(prop => ({ id: prop.title, title: prop.title })),
            { id: 'error', title: 'Error' }
          ]
        });

        await errorCsvWriter.writeRecords(errors);

        return res.status(400).send({
          message: 'Some users were not added due to errors.',
          addedCount: list.users.length - errors.length,
          errorCount: errors.length,
          total: list.users.length,
          errorFile: 'uploads/errors.csv'
        });
      } else {
        res.status(200).send({
          message: 'All users were added successfully.',
          addedCount: list.users.length,
          errorCount: 0,
          total: list.users.length
        });
      }
    });
}

export const sendEmail = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;
    const list = await List.findById(listId);
  
    if (!list) return res.status(404).json({message: "List not found"});
  
    const transporter = nodemailer.createTransport({ /* Transport options */ });
  
    list.users.forEach(user => {
      const emailBody = body.replace(/\[([^\]]+)\]/g, (_, prop) => user.properties[prop] || '');
      transporter.sendMail({
        from: 'youremail@example.com',
        to: user.email,
        subject,
        text: emailBody
      });
    });
  
    res.status(200).send('Emails sent');
};