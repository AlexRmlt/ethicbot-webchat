import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import './Feedback.css';
import classNames from "classnames";
import * as Yup from 'yup'

// Input feedback
const InputFeedback = ({ error }) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const NumberInput = ({
    field: { name, value, onChange, onBlur },
    error, 
    touched,
    id,
    label,
    className,
    min,
    max,
    ...props
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
                <input 
                    id={id}
                    name={name}
                    type="number"
                    min={min}
                    max={max}
                    onChange={onChange}                   
                    className={classNames("input-number")}
                    {...props} 
                />
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};

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
                name={name}
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
        const errorMessageAge = "Please enter a valid age";
        const encode = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        }
        return (
            <div className="form-container">
                <Formik
                    initialValues={{
                        PI_BotBefore: "",
                        PI_Interest: "",
                        PI_Tech: "",
                        PI_English: "",
                        PI_inputAge: "",

                        GI_EaseOfUse: "",
                        GI_EasyToUnderstand: "",
                        GI_UsefulMessages: "",
                        GI_Repetitive: "",
                        GI_Interesting: "",
                        GI_Learned: "",
                        GI_Maintain: "",
                        GI_Robust: "",

                        IS_Stakeholder: "",
                        IS_Options: "",
                        IS_Consequences: "",
                        IS_Utilitarism: "",
                        IS_Deontology: "",

                        EB_Tone: "",
                        EB_Privacy: "",
                        EB_Trust: "",
                        textareaFeedback: ""
                    }}
                    validationSchema={Yup.object().shape({
                        PI_BotBefore: Yup.string().required(errorMessage),
                        PI_Interest: Yup.string().required(errorMessage),
                        PI_Tech: Yup.string().required(errorMessage),
                        PI_English: Yup.string().required(errorMessage),
                        PI_inputAge: Yup.number().min(1, errorMessageAge).max(99, errorMessageAge).required(errorMessageAge),

                        GI_EaseOfUse: Yup.string().required(errorMessage),
                        GI_EasyToUnderstand: Yup.string().required(errorMessage),
                        GI_UsefulMessages: Yup.string().required(errorMessage),
                        GI_Repetitive: Yup.string().required(errorMessage),
                        GI_Interesting: Yup.string().required(errorMessage),
                        GI_Learned: Yup.string().required(errorMessage),
                        GI_Maintain: Yup.string().required(errorMessage),
                        GI_Robust: Yup.string().required(errorMessage),

                        IS_Stakeholder: Yup.string().required(errorMessage),
                        IS_Options: Yup.string().required(errorMessage),
                        IS_Consequences: Yup.string().required(errorMessage),
                        IS_Utilitarism: Yup.string().required(errorMessage),
                        IS_Deontology: Yup.string().required(errorMessage),

                        EB_Tone: Yup.string().required(errorMessage),
                        EB_Privacy: Yup.string().required(errorMessage),
                        EB_Trust: Yup.string().required(errorMessage),
                        textareaFeedback: Yup.string().required(errorMessage)
                    })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 500);
                        
                        fetch("/", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: encode({ "form-name": "feedback", ...values })
                          })
                            .then(() => alert("Thanks, your feedback has been submitted!"))
                            .catch(error => alert(error));
                        actions.resetForm();
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
                                id="PI_BotBefore"
                                label="Have you already communicated with any type of chatbot before?"
                                value={values.PI_BotBefore}
                                error={errors.PI_BotBefore}
                                touched={touched.PI_BotBefore}
                            >
                                <Field
                                    component={RadioButton}
                                    name="PI_BotBefore"
                                    id="PI_BotBefore_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="PI_BotBefore"
                                    id="PI_BotBefore_No"
                                    label="No"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="PI_Interest"
                                label="Do you have general interest in the topic of ethics in connection with machines?"
                                value={values.PI_Interest}
                                error={errors.PI_Interest}
                                touched={touched.PI_Interest}
                            >
                                <Field
                                    component={RadioButton}
                                    name="PI_Interest"
                                    id="PI_Interest_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="PI_Interest"
                                    id="PI_Interest_No"
                                    label="No"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="PI_Tech"
                                label="Would you describe yourself as tech-savvy?"
                                value={values.PI_Tech}
                                error={errors.PI_Tech}
                                touched={touched.PI_Tech}
                            >
                                <Field
                                    component={RadioButton}
                                    name="PI_Tech"
                                    id="PI_Tech_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="PI_Tech"
                                    id="PI_Tech_No"
                                    label="No"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="PI_English"
                                label="Are you a native English speaker?"
                                value={values.PI_Tech}
                                error={errors.PI_Tech}
                                touched={touched.PI_Tech}
                            >
                                <Field
                                    component={RadioButton}
                                    name="PI_English"
                                    id="PI_English_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="PI_English"
                                    id="PI_English_No"
                                    label="No"
                                />
                            </RadioButtonGroup>

                            <Field
                                component={NumberInput}
                                value={values.PI_inputAge}
                                error={errors.PI_inputAge}
                                touched={touched.PI_inputAge}
                                label="Please specify your age."
                                id="PI_inputAge"
                                name="PI_inputAge"
                                min="1"
                                max="99"
                            />
                            <h3>2. General impression</h3>
                            <RadioButtonGroup
                                id="GI_EaseOfUse"
                                label="I found it easy to converse with the chatbot."
                                value={values.GI_EaseOfUse}
                                error={errors.GI_EaseOfUse}
                                touched={touched.GI_EaseOfUse}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EaseOfUse"
                                    id="GI_EaseOfUse_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="GI_EasyToUnderstand"
                                label="I found it easy to understand the chatbot."
                                value={values.GI_EasyToUnderstand}
                                error={errors.GI_EasyToUnderstand}
                                touched={touched.GI_EasyToUnderstand}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_EasyToUnderstand"
                                    id="GI_EasyToUnderstand_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                           <RadioButtonGroup
                                id="GI_UsefulMessages"
                                label="I considered the messages from the chatbot to be useful."
                                value={values.GI_UsefulMessages}
                                error={errors.GI_UsefulMessages}
                                touched={touched.GI_UsefulMessages}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_UsefulMessages"
                                    id="GI_UsefulMessages_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                           <RadioButtonGroup
                                id="GI_Repetitive"
                                label="I found the conversation often repetitive."
                                value={values.GI_Repetitive}
                                error={errors.GI_Repetitive}
                                touched={touched.GI_Repetitive}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Repetitive"
                                    id="GI_Repetitive_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                           <RadioButtonGroup
                                id="GI_Interesting"
                                label="I found it interesting to interact with the chatbot."
                                value={values.GI_Interesting}
                                error={errors.GI_Interesting}
                                touched={touched.GI_Interesting}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Interesting"
                                    id="GI_Interesting_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="GI_Learned"
                                label="I learned something from conversing with the chatbot."
                                value={values.GI_Learned}
                                error={errors.GI_Learned}
                                touched={touched.GI_Learned}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Learned"
                                    id="GI_Learned_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="GI_Maintain"
                                label="The chatbot is able to maintain a discussion."
                                value={values.GI_Maintain}
                                error={errors.GI_Maintain}
                                touched={touched.GI_Maintain}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Maintain"
                                    id="GI_Maintain_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                           <RadioButtonGroup
                                id="GI_Robust"
                                label="I consider the chatbot to be capable of responding to unexpected input."
                                value={values.GI_Robust}
                                error={errors.GI_Robust}
                                touched={touched.GI_Robust}
                            >
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="GI_Robust"
                                    id="GI_Robust_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <h3>3. Individual sections</h3>
                            <RadioButtonGroup
                                id="IS_Stakeholder"
                                label="I was able to correctly specify all relevant persons."
                                value={values.IS_Stakeholder}
                                error={errors.IS_Stakeholder}
                                touched={touched.IS_Stakeholder}
                            >
                                <Field
                                    component={RadioButton}
                                    name="IS_Stakeholder"
                                    id="IS_Stakeholder_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Stakeholder"
                                    id="IS_Stakeholder_No"
                                    label="No"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Stakeholder"
                                    id="IS_Stakeholder_NotAsked"
                                    label="I was not asked to specify any relevant persons"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="IS_Options"
                                label="I was able to specify all possible options for action correctly."
                                value={values.IS_Options}
                                error={errors.IS_Options}
                                touched={touched.IS_Options}
                            >
                                <Field
                                    component={RadioButton}
                                    name="IS_Options"
                                    id="IS_Options_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Options"
                                    id="IS_Options_No"
                                    label="No"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Options"
                                    id="IS_Options_NotAsked"
                                    label="I was not asked to specify any options of action"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="IS_Consequences"
                                label="I was able to specify all consequences of an action correctly."
                                value={values.IS_Consequences}
                                error={errors.IS_Consequences}
                                touched={touched.IS_Consequences}
                            >
                                <Field
                                    component={RadioButton}
                                    name="IS_Consequences"
                                    id="IS_Consequences_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Consequences"
                                    id="IS_Consequences_No"
                                    label="No"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Consequences"
                                    id="IS_Consequences_NotAsked"
                                    label="I was not asked to specify any consequences"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="IS_Utilitarism"
                                label="The evaluation according to utilitarian ethics was plausible."
                                value={values.IS_Utilitarism}
                                error={errors.IS_Utilitarism}
                                touched={touched.IS_Utilitarism}
                            >
                                <Field
                                    component={RadioButton}
                                    name="IS_Utilitarism"
                                    id="IS_Utilitarism_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Utilitarism"
                                    id="IS_Utilitarism_No"
                                    label="No"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Utilitarism"
                                    id="IS_Utilitarism_NotChosen"
                                    label="I did not choose the utilitarian evaluation"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="IS_Deontology"
                                label="The evaluation according to deontological ethics was plausible."
                                value={values.IS_Deontology}
                                error={errors.IS_Deontology}
                                touched={touched.IS_Deontology}
                            >
                                <Field
                                    component={RadioButton}
                                    name="IS_Deontology"
                                    id="IS_Deontology_Yes"
                                    label="Yes"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Deontology"
                                    id="IS_Deontology_No"
                                    label="No"
                                />
                                <Field
                                    component={RadioButton}
                                    name="IS_Deontology"
                                    id="IS_Deontology_NotChosen"
                                    label="I did not choose the deontological evaluation"
                                />
                            </RadioButtonGroup>

                            <h3>4. Ethics and behaviour</h3>
                            <RadioButtonGroup
                                id="EB_Tone"
                                label="The tone of the chatbot was friendly and respectful."
                                value={values.EB_Tone}
                                error={errors.EB_Tone}
                                touched={touched.EB_Tone}
                            >
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Tone"
                                    id="EB_Tone_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="EB_Privacy"
                                label="The chatbot has at no time asked any questions that are inappropriate or invasive of privacy."
                                value={values.EB_Privacy}
                                error={errors.EB_Privacy}
                                touched={touched.EB_Privacy}
                            >
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Privacy"
                                    id="EB_Privacy_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                                id="EB_Trust"
                                label="The chatbot made a trustworthy impression on me."
                                value={values.EB_Trust}
                                error={errors.EB_Trust}
                                touched={touched.EB_Trust}
                            >
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_SA"
                                    label="Strongly agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_A"
                                    label="Agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_SWA"
                                    label="Somewhat agree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_SWD"
                                    label="Somewhat disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_D"
                                    label="Disagree"
                                />
                                <Field
                                    component={RadioButton}
                                    name="EB_Trust"
                                    id="EB_Trust_SD"
                                    label="Strongly disagree"
                                />
                            </RadioButtonGroup>

                            <br /><hr />
                            <Field
                                component={Textarea}
                                value={values.textareaFeedback}
                                id="textareaFeedback"
                                name="textareaFeedback"
                                placeholder="Please leave any further feedback you might want to address here..."
                                rows="5"
                            />
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