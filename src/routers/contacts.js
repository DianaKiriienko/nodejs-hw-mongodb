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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/', authenticate);

router.use('/:contactId', isValidId('contactId'));

router.get('/', ctrlWrapper(getContactsController) );

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/', validateBody(creaContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', validateBody(creaContactSchema), ctrlWrapper(updateContactController));

router.patch('/:contactId',validateBody(updateContactSchema), ctrlWrapper(patchContactController));

 export default router;
