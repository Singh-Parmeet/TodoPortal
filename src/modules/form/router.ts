/* eslint-disable max-len */
import { Router } from 'express';
// import { fork } from 'child_process';
import controller from './FormController';

const router = Router();

router.route('/cron')
    .get(
        controller.cron,
    );
router.route('/streams')
    .get(
        controller.streams,
    );
router.route('/')
    .get(
        controller.list,
    );
// router.post('/', (req, res) => {
//     const data1 = req.body;
//     const create = fork('dist/src/modules/form/Form.js');
//     create.send(data1);
//     create.on('message', (data) => {
//         console.log('------------------>', data);
//         return res.send(data);
//     });
// });
router.route('/')
    .post(
        controller.create,
    );

export default router;
