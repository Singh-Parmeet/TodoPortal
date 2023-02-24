import { Router } from 'express';
import { SystemResponse } from './libs/response-handler';
import todoRouter from './modules/todo/router';
// import ToDoService from './modules/todo/ToDoService';
import formRouter from './modules/form/router';

const appInfo = require('../package.json');

const router = Router();
/**
 * @swagger
 * /api/version:
 *   get:
 *     tags:
 *       - General
 *     description: Get Version
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Version Response
 *         schema:
 *           type: object
 *           properties:
 *             version:
 *               type: string
 *               description: Version of the API.
 *             description:
 *               type: string
 *               description: Description of the API.
 *             name:
 *               type: string
 *               description: Name of the API.
 */
router.get('/version', (req, res) => {
    try {
        const { version, name, description } = appInfo;
        return res.json({
            description,
            name,
            version,
        });
    } catch (err) {
        return res.send(SystemResponse.internalServerError);
    }
});

/**
 * @swagger
 * /api/health-check:
 *   get:
 *     tags:
 *       - General
 *     description: Health Check for Kuberenetes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: I am OK
 */
router.get('/health-check', (req, res) => {
    res.send('I am OK');
});

router.use('/todo', todoRouter);

router.use('/form', formRouter);

export default router;
