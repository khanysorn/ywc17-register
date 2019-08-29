import { Col, Form, Input, Typography } from 'antd'

import { Formik } from 'formik'
import { get } from 'lodash'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import * as Yup from 'yup'

import BackButton from '../../components/Form/BackButton'
import ButtonsContainer from '../../components/Form/ButtonsContainer'
import Container from '../../components/Form/FormContainer'
import NextButton from '../../components/Form/NextButton'
import QuestionContainer from '../../components/Form/QuestionContainer'
import Header from '../../components/Header'
import GeneralQuestion from '../../stores/forms/generalQuestion'
import { GENERAL_QUESTION } from '../../utils/const'
import history from '../../utils/history'

const { Title } = Typography
const { TextArea } = Input
const schema = Yup.object().shape({
  0: Yup.string().required('กรุณาตอบคำถาม'),
  1: Yup.string().required('กรุณาตอบคำถาม'),
  2: Yup.string().required('กรุณาตอบคำถาม')
})

const General = () => {
  const generalQuestionStore = useObservable(GeneralQuestion)

  // init
  useEffect(() => {
    generalQuestionStore.getAnswers()
  }, [generalQuestionStore])

  const storeValues = Object.assign({}, generalQuestionStore.formData)
  const initialValues = get(storeValues, 'answers', [])
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        await generalQuestionStore.handleSubmit({
          answers: values
        })
        actions.setSubmitting(false)
      }}
      render={({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => {
        return (
          <>
            <Header current={2} />
            <Container>
              <Title level={3} style={{ marginBottom: 28 }}>
                คำถามส่วนกลาง
              </Title>
              <Form onSubmit={handleSubmit}>
                {GENERAL_QUESTION.map((question, i) => {
                  return (
                    <QuestionContainer key={i}>
                      <Title level={4}>
                        {i + 1}. {question}
                      </Title>
                      <Form.Item
                        validateStatus={errors[i] && 'error'}
                        help={errors[i]}
                      >
                        <TextArea
                          value={values[i]}
                          onChange={handleChange}
                          autosize={{ maxRows: 8, minRows: 8 }}
                          placeholder="คำตอบ"
                          name={`${i}`}
                        />
                      </Form.Item>
                    </QuestionContainer>
                  )
                })}
                <ButtonsContainer type="flex" justify="center">
                  <Col
                    xs={24}
                    sm={12}
                    md={6}
                    style={{ textAlign: 'center', marginTop: 10 }}
                  >
                    <BackButton onClick={() => history.push('/step/contact')}>
                      {'< ย้อนกลับ'}
                    </BackButton>
                  </Col>
                  <Col
                    xs={24}
                    sm={12}
                    md={6}
                    style={{ textAlign: 'center', marginTop: 10 }}
                  >
                    <NextButton loading={isSubmitting} htmlType="submit">
                      ต่อไป >
                    </NextButton>
                  </Col>
                </ButtonsContainer>
              </Form>
            </Container>
          </>
        )
      }}
    />
  )
}

export default observer(General)
