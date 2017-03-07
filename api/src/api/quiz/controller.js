import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Quiz } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Quiz.create(body)
    .then((quiz) => quiz.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Quiz.find(query, select, cursor)
    .then((quizzes) => quizzes.map((quiz) => quiz.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Quiz.findById(params.id)
    .then(notFound(res))
    .then((quiz) => quiz ? quiz.view() : null)
    .then(success(res))
    .catch(next)
