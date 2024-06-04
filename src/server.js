import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { getAllContacts, getContactsById} from './db/services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();

            res.status(200).json({
                status: 'success',
                message: 'Successfully found contacts!',
                data: contacts,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve contacts',
                error: error.message,
            });
        }
    });


    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactsById(contactId);

            if (!contact) {
                return res.status(404).json({
                status: 'error',
                message: 'Not found',
                });
            }

            res.status(200).json({
                status: 'success',
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (error) {
            res.status(404).json({
                status: 'error',
                message: 'Failed to retrieve contacts',
                error: error.message,
            });
        }
    });

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
