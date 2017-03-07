import React, { Component } from 'react';

const lengthValidator = (value, length) => value.length < length;

const requiredValidator = (value) => value && value.length === 0;

const emailValidator = (value) => !value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const phoneValidator = (value) => !value.match(/^(0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/);

function validate(name, email, phone, motivation) {
    // true means invalid, so our conditions got reversed
    return {
        name: lengthValidator(name, 5) || requiredValidator(name),
        email: emailValidator(email),
        phone: phoneValidator(phone),
        motivation: motivation.length === 0 || motivation.length < 10
    };
}

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            email: '',
            phone: '',
            motivation: ''
        };

        this.state = this.initialState;
    }

    canBeSubmitted() {
        const errors = validate(this.state.name, this.state.email, this.state.phone, this.state.motivation);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }
    updateName(e) {
        this.setState({
            name: e.target.value
        });
    }
    updateMail(e) {
        this.setState({
            email: e.target.value
        });
    }
    updatePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
    updateMotivation(e) {
        this.setState({
            motivation: e.target.value
        });

    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submitQuiz(this.state);

    }

    render() {
        if (this.props.isLoading) {
        }
        const errors = validate(this.state.name, this.state.email, this.state.phone, this.state.motivation);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return (
            <div className="container">
                <div className="row start-xs">
                    <label className="">Namn</label>
                    <input type="text" name="field1" value={this.state.name} className={`col-xs-12 ${errors.name ? "error" : "valid"}`} onChange={this.updateName.bind(this)} placeholder="Förnamn Efternamn" />
                </div>
                <div className="row start-xs">
                    <label className="">E-post<span className="required"></span></label>
                    <input type="email" name="field3" value={this.state.email} className={`col-xs-12 ${errors.email ? "error" : "valid"}`} onChange={this.updateMail.bind(this)} placeholder="min@mail.cx" />
                </div>
                <div className="row start-xs">
                    <label className="">Telefonnummer<span className="required"></span></label>
                    <input type="phone" name="field3" value={this.state.phone} className={`col-xs-12 ${errors.phone ? "error" : "valid"}`} onChange={this.updatePhone.bind(this)} placeholder="0712345678" />
                </div>

                <div className="row start-xs">
                    <label className="">Motivering</label>
                    <textarea name="field5" id="field5" value={this.state.motivation} maxLength="200" className={`col-xs-12 ${errors.motivation ? "error" : "valid"}`} onChange={this.updateMotivation.bind(this)} placeholder="Motivera varför just du skall få hänga med på en all-inclusive after work"></textarea>
                </div >

                <div className="row start-xs">
                    <button className={`btn btn-warning btn-lg col-xs ${this.props.error ? "error" : ""}`} disabled={isDisabled} onClick={this.handleSubmit.bind(this)}>{this.props.isLoading ? <i className="fa fa-circle-o-notch fa-spin fa-lg fa-fw"></i> : "Skicka in"}</button>
                </div>
            </div>
        );
    }
};

export default ContactForm;