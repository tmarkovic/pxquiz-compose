import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'
export Quiz, { schema } from './model'

const router = new Router()
const { answers, name, email, phone, motivation } = schema.tree

/**
 * @api {post} /quizzes Create quiz
 * @apiName CreateQuiz
 * @apiGroup Quiz
 * @apiParam answers Quiz's answers.
 * @apiParam name Quiz's name.
 * @apiParam email Quiz's email.
 * @apiParam phone Quiz's phone.
 * @apiParam motivation Quiz's motivation.
 * @apiSuccess {Object} quiz Quiz's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quiz not found.
 */
router.post('/',
  body({ answers, name, email, phone, motivation }),
  create)

/**
 * @api {get} /quizzes Retrieve quizzes
 * @apiName RetrieveQuizzes
 * @apiGroup Quiz
 * @apiUse listParams
 * @apiSuccess {Object[]} quizzes List of quizzes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /quizzes/:id Retrieve quiz
 * @apiName RetrieveQuiz
 * @apiGroup Quiz
 * @apiSuccess {Object} quiz Quiz's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quiz not found.
 */
router.get('/:id',
  show)

export default router
