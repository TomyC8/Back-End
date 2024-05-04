import express from 'express';

const router = express.Router();

router.get('/', (req, res => {
    res.sender('index', {}); //De momento sólo renderizamos la vista, no pasamos un objeto.
}))

export default router;