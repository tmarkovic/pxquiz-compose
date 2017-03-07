import React from 'react'

const QuestionTitle = (props) => {
    return (
        <h2 className="hero__byline">{props.question}</h2>
    )
}

QuestionTitle.propTypes = {
    question: React.PropTypes.string.isRequired
}
export default QuestionTitle