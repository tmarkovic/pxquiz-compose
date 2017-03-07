import { Quiz } from '.'

let quiz

beforeEach(async () => {
  quiz = await Quiz.create({ answers: 'test', name: 'test', email: 'test', phone: 'test', motivation: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = quiz.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quiz.id)
    expect(view.answers).toBe(quiz.answers)
    expect(view.name).toBe(quiz.name)
    expect(view.email).toBe(quiz.email)
    expect(view.phone).toBe(quiz.phone)
    expect(view.motivation).toBe(quiz.motivation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = quiz.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quiz.id)
    expect(view.answers).toBe(quiz.answers)
    expect(view.name).toBe(quiz.name)
    expect(view.email).toBe(quiz.email)
    expect(view.phone).toBe(quiz.phone)
    expect(view.motivation).toBe(quiz.motivation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
