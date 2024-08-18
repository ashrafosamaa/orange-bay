import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js"

import * as programController from './program.controller.js'
import * as validator from "./program.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/', authUser('ADMIN'),
    multerMiddleHost({ extensions: allowedExtensions.image })
    .fields([{ name: 'images', maxCount: 5 }]),
    validationMiddleware(validator.addProgramValidator),
    expressAsyncHandler(programController.addProgram))

router.get('/', validationMiddleware(validator.getAllProgramsValidator),
    expressAsyncHandler(programController.getAllPrograms))

router.get('/single/:programId', validationMiddleware(validator.IDValidator),
    expressAsyncHandler(programController.getProgramById))

router.put('/:programId', authUser('ADMIN'), validationMiddleware(validator.updateProgramValidator),
    expressAsyncHandler(programController.updateProgram))

router.delete('/:programId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(programController.deleteProgram))

router.post('/schedule/:programId', authUser('ADMIN'), validationMiddleware(validator.addScheduleValidator),
    expressAsyncHandler(programController.addSchedule))

router.delete('/schedule/:programId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(programController.deleteAllSchedule))

export default router