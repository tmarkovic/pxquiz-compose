import mongoose, { Schema } from 'mongoose'

const quizSchema = new Schema({
  answers: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true

  },
  phone: {
    type: String,
    required: true

  },
  motivation: {
    type: String,
    required: true

  }
}, {
  timestamps: true
})

quizSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      answers: this.answers,
      name: this.name,
      email: this.email,
      phone: this.phone,
      motivation: this.motivation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Quiz', quizSchema)

export const schema = model.schema
export default model
