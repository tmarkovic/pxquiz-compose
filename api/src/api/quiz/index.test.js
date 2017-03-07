import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Quiz } from '.'

const app = () => express(routes)

let quiz

beforeEach(async () => {
  quiz = await Quiz.create({})
})

test('POST /quizzes 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ answers: 'test', name: 'test', email: 'test', phone: 'test', motivation: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.answers).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.motivation).toEqual('test')
})

test('GET /quizzes 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /quizzes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${quiz.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(quiz.id)
})

test('GET /quizzes/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})
