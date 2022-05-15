import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.post('/', controller.addUser);

export default router;