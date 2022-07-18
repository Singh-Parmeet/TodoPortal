/* eslint-disable max-len */
import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import controller from './ToDoController';
import validation from './validation';

const router = Router();
/**
 * @swagger
 * definitions:
 *   ToDoSchema:
 *        properties:
 *             id:
 *                  type: string
 *             title:
 *                  type: string
 *             description:
 *                  type: string
 *             createdAt:
 *                  type: string
 *             deletedAt:
 *                  type: string
 *   ToDosList:
 *        type: array
 *        item:
 *        $ref: '#/definitions/ToDoSchema'
 *   ToDo:
 *        type: array
 *        $ref: '#/definitions/ToDoSchema'
 *   TodoListResponse:
 *        properties:
 *             message:
 *                  type: string
 *                  example: Success
 *             status:
 *                  type: integer
 *                  example: 200
 *             data:
 *                  $ref: '#/definitions/ToDo'
 *   TodoByIdGetResponse:
 *        properties:
 *             message:
 *                  type: string
 *                  example: Success
 *             status:
 *                  type: integer
 *                  example: 200
 *             data:
 *                  $ref: '#/definitions/ToDo'
 */

/**
 * @swagger
 * /api/todo/:
 *   get:
 *        tags: [ToDo]
 *        description: Returns all the ToDo list records
 *        parameters:
 *           - in: query
 *             name: limit
 *           - in: query
 *             name: skip
 *        responses :
 *             200:
 *                  description: Array of ToDo List
 *                  schema:
 *                       $ref: '#/definitions/TodoListResponse'
 */
router.route('/')
    .get(
        validationHandler(validation.list as any),
        controller.list,
    );
/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *        tags: [ToDo]
 *        description: Returns specific ToDo record
 *        parameters:
 *           - in: path
 *             name: id
 *             schema:
 *              type: string
 *              required: true
 *              description: originalId of the user
 *        responses :
 *             200:
 *                  description: Array of ToDo List
 *                  schema:
 *                       $ref: '#/definitions/TodoByIdGetResponse'
 */
router.route('/:id')
    .get(
        validationHandler(validation.get as any),
        controller.get,

    );
/**
 * @swagger
 * /api/todo:
 *   post:
 *        description: Added new Record in database
 *        tags: [ToDo]
 *        requestBody:
 *              description: Enter title , description .
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -title
 *                          -description
 *                        properties:
 *                            title:
 *                               type: string
 *                            description:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: Record added succesfully
 */

router.route('/')
    .post(
        validationHandler(validation.create as any),
        controller.create,
    );

/**
 * @swagger
 * /api/todo/:
 *   put:
 *     description: Update existing record
 *     tags: [ToDo]
 *     consumes:
 *         - application/json
 *     requestBody:
 *        description: Enter field for update record. You have to add status as In Progress or Completed
 *        required: true
 *        content:
 *           application/json:
 *            schema:
 *             type: object
 *             required:
 *              -id
 *             properties:
 *               id:
 *                type: string
 *               status:
 *                type: string
 *     responses:
 *         200:
 *           description: Record updated successfully
 */
router.route('/')
    .put(
        validationHandler(validation.update as any),
        controller.update,
    );
/**
 * @swagger
 * /api/todo:
 *   delete:
 *        description: Delete existing record from database
 *        tags: [ToDo]
 *        requestBody:
 *              description: Enter id.
 *              required: true
 *              content:
 *                 application/json:
 *                    schema:
 *                        type: object
 *                        required:
 *                          -id
  *                        properties:
 *                            id:
 *                               type: string
 *        responses:
 *                  200:
 *                      description: Record deleted succesfully
 */
router.route('/:id')
    .delete(
        validationHandler(validation.delete as any),
        controller.delete,
    );

export default router;
