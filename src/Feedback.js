import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import './Feedback.css';
import classNames from "classnames";
import * as Yup from 'yup'

// Input feedback
const InputFeedback = ({ error }) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const Textarea = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    placeholder,
    rows,
    ...props
}) => {
    return (
        <div>
            <textarea 
                id={id}
                placeholder={placeholder}                       
                rows={rows}   
                onChange={onChange}                   
                className={classNames("textarea-feedback")}
                {...props} 
            >
            {value}
            </textarea>
        </div>
    );
};

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id}
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames("radio-button")}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
}) => {
    const classes = classNames(
        "input-field",
        {
            "is-success": value || (!error && touched), // handle prefilled or user-filled
            "is-error": !!error && touched
        },
        className
    );

    return (
        <div className={classes}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};

class Feedback extends Component {
    render() {
        const errorMessage = "Choosing one option is required";
        const encode = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        }
        return (
            <div className="form-container">
                <Formik
                    initialValues={{
                        "form-name": "feedback",
                        rgInterest: "",
                        rgTech: "",
                        rgAge: "",
                        rgUnderstanding: "",
                        rgAsking: "",
                        rgStakeholder: "", 
                        rgOptions: "",
                        rgConsequences: "",
                        rgUtilitarism: "",
                        rgDeontology: "",
                        rgBotBefore: "",
                        textareaFeedback: ""
                    }}
                    validationSchema={Yup.object().shape({
                        rgInterest: Yup.string().required(errorMessage),
                        rgTech: Yup.string().required(errorMessage),
                        rgAge: Yup.string().required(errorMessage),
                        rgUnderstanding: Yup.string().required(errorMessage),
                        rgAsking: Yup.string().required(errorMessage),
                        rgStakeholder: Yup.string().required(errorMessage),
                        rgOptions: Yup.string().required(errorMessage),
                        rgConsequences: Yup.string().required(errorMessage),
                        rgUtilitarism: Yup.string().required(errorMessage),
                        rgDeontology: Yup.string().required(errorMessage),
                        rgBotBefore: Yup.string().required(errorMessage)
                    })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 500);
                        
                        fetch("/", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: encode({ ...this.state })
                          })
                            .then(() => alert("Success!"))
                            .catch(error => alert(error));
                    }}
                    render={({
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        errors,
                        touched,
                        isSubmitting
                    }) => (
                        <Form>
                            <p>Hi! Thank you for your interest in the ethicbot project. This form is intended to measure
                            the user experience while using the chatbot. Your feedback can make a valuable contribution  
                            to the further development of ethicbot and is much appreciated!</p>
                            <p>Before you complete the survey, please perform at least one test run with the chatbot.
                            Please also acknowledge the following guidelines which can help improving communication:</p>
                            <ol>
                                <li>Context matters to the chatbot. Whole sentences are often better processed than single words.</li>
                                <li>The flow of the conversation is generally designed as follows: First, the relevant persons are 
                                asked for, one by one. Then the options for action are considered. Also, for each option the bot should
                                ask for associated consequences.</li>
                            </ol>
                            <h3>1. Personal information</h3>
                            <RadioButtonGroup
                                id="rgBotBefore"
                                label="Have you already communicated with any type of chatbot before?"
                                value={values.rgBotBefore}
                                error={errors.rgBotBefore}
                                touched={touched.rgBotBefore}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgBotBefore"
                                    id="rgBotBefore_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgBotBefore"
                                    id="rgBotBefore_No"
                                    label="No"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgInterest"
                                label="Do you have general interest in the topic of ethics in connection with machines?"
                                value={values.rgInterest}
                                error={errors.rgInterest}
                                touched={touched.rgInterest}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgInterest"
                                    id="rgInterest_Strong"
                                    label="Strong interest"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgInterest"
                                    id="rgInterest_Slightly"
                                    label="Slight interest"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgInterest"
                                    id="rgInterest_Not"
                                    label="No interest"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgTech"
                                label="Would you describe dealing with modern technologies as an everyday occurrence for you?"
                                value={values.rgTech}
                                error={errors.rgTech}
                                touched={touched.rgTech}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgTech"
                                    id="rgTech_Strong"
                                    label="Applies strongly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgTech"
                                    id="rgTech_Slightly"
                                    label="Applies slightly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgTech"
                                    id="rgTech_Not"
                                    label="Does not apply"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgAge"
                                label="Please specify your range of age."
                                value={values.rgAge}
                                error={errors.rgAge}
                                touched={touched.rgAge}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgAge"
                                    id="rgTech_18"
                                    label="Below 18"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgAge"
                                    id="rgTech_30"
                                    label="Between 18 and 30"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgAge"
                                    id="rgTech_60"
                                    label="Between 30 and 60"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgAge"
                                    id="rgTech_Above"
                                    label="60 and above"
                                />
                            </RadioButtonGroup>
                            <h3>2. General impression</h3>
                            <RadioButtonGroup
                                id="rgUnderstanding"
                                label="During the conversation I predominantly had the impression that the chatbot &quot;understands&quot; the information I give him, i.e. can process it."
                                value={values.rgUnderstanding}
                                error={errors.rgUnderstanding}
                                touched={touched.rgUnderstanding}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgUnderstanding"
                                    id="rgUnderstanding_Strong"
                                    label="Applies strongly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgUnderstanding"
                                    id="rgUnderstanding_Slightly"
                                    label="Applies slightly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgUnderstanding"
                                    id="rgUnderstanding_Not"
                                    label="Does not apply"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgAsking"
                                label="At no time did I have problems understanding which type of input the chatbot asks me for."
                                value={values.rgAsking}
                                error={errors.rgAsking}
                                touched={touched.rgAsking}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgAsking"
                                    id="rgAsking_Strong"
                                    label="Applies strongly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgAsking"
                                    id="rgAsking_Slightly"
                                    label="Applies slightly"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgAsking"
                                    id="rgAsking_Not"
                                    label="Does not apply"
                                />
                            </RadioButtonGroup>

                            <h3>3. Individual sections</h3>
                            <RadioButtonGroup
                                id="rgStakeholder"
                                label="I was able to correctly specify all relevant persons."
                                value={values.rgStakeholder}
                                error={errors.rgStakeholder}
                                touched={touched.rgStakeholder}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgStakeholder"
                                    id="rgStakeholder_Applies"
                                    label="Applies"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgStakeholder"
                                    id="rgStakeholder_Not"
                                    label="Does not apply"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgStakeholder"
                                    id="rgStakeholder_NotAsked"
                                    label="I was not asked to specify any relevant persons"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgOptions"
                                label="I was able to specify all possible options for action correctly."
                                value={values.rgOptions}
                                error={errors.rgOptions}
                                touched={touched.rgOptions}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgOptions"
                                    id="rgOptions_Applies"
                                    label="Applies"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgOptions"
                                    id="rgOptions_Not"
                                    label="Does not apply"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgOptions"
                                    id="rgOptions_NotAsked"
                                    label="I was not asked to specify any options of action"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgConsequences"
                                label="I was able to specify all consequences of an action correctly."
                                value={values.rgConsequences}
                                error={errors.rgConsequences}
                                touched={touched.rgConsequences}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgConsequences"
                                    id="rgConsequences_Applies"
                                    label="Applies"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgConsequences"
                                    id="rgConsequences_Not"
                                    label="Does not apply"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgConsequences"
                                    id="rgConsequences_NotAsked"
                                    label="I was not asked to specify any consequences"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgUtilitarism"
                                label="The evaluation according to utilitarian ethics was plausible."
                                value={values.rgUtilitarism}
                                error={errors.rgUtilitarism}
                                touched={touched.rgUtilitarism}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgUtilitarism"
                                    id="rgUtilitarism_Applies"
                                    label="Applies"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgUtilitarism"
                                    id="rgUtilitarism_Not"
                                    label="Does not apply"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgUtilitarism"
                                    id="rgUtilitarism_NotChosen"
                                    label="I did not choose the utilitarian evaluation"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="rgDeontology"
                                label="The evaluation according to deontological ethics was plausible."
                                value={values.rgDeontology}
                                error={errors.rgDeontology}
                                touched={touched.rgDeontology}
                            >
                                <Field
                                    component={RadioButton}
                                    name="rgDeontology"
                                    id="rgDeontology_Applies"
                                    label="Applies"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgDeontology"
                                    id="rgDeontology_Not"
                                    label="Does not apply"
                                />
                                <Field
                                    component={RadioButton}
                                    name="rgDeontology"
                                    id="rgDeontology_NotChosen"
                                    label="I did not choose the deontological evaluation"
                                />
                            </RadioButtonGroup>

                            <Field
                                component={Textarea}
                                value={values.textareaFeedback}
                                id="textareaFeedback"
                                placeholder="Please leave any further feedback you might want to address here..."
                                rows="5"
                            />
                            <Field type="hidden" name="form-name" />
                            <br />
                            <button type="submit" disabled={isSubmitting}>
                            Submit
                            </button>
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export default Feedback;