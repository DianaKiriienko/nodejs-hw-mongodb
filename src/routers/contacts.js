import { Router } from 'express';
import {
    getContactsByIdController,
    getContactsController,
    createContactController,
    deleteContactController,
    updateContactController,
    patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { creaContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController) );

router.get('/contacts/:contactId', isValidId(), ctrlWrapper(getContactsByIdController));

router.post('/contacts', validateBody(creaContactSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId(), ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', isValidId(), validateBody(creaContactSchema), ctrlWrapper(updateContactController));

router.patch('/contacts/:contactId', isValidId(), validateBody(updateContactSchema), ctrlWrapper(patchContactController));

 export default router;
