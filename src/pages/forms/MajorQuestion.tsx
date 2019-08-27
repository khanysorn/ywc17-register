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
import MajorQuestion from '../../stores/forms/majorQuestion'
import history from '../../utils/history'

const { Title } = Typography
const { TextArea } = Input
const schema = Yup.object().shape({
  0: Yup.string().required('กรุณาตอบคำถาม'),
  1: Yup.string().required('กรุณาตอบคำถาม'),
  2: Yup.string().required('กรุณาตอบคำถาม')
})

const Major = () => {
  const majorQuestionStore = useObservable(MajorQuestion)

  // init
  useEffect(() => {
    majorQuestionStore.getAnswers()
  }, [majorQuestionStore])

  const storeValues = Object.assign({}, majorQuestionStore.formData)
  const initialValues = get(storeValues, 'answers', [])
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={true}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        await majorQuestionStore.handleSubmit({
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
                คำถามประจำสาขา
              </Title>
              <Form onSubmit={handleSubmit}>
                <QuestionContainer>
                  <Title level={4}>1. คำถามจ้า</Title>
                  <Form.Item
                    validateStatus={errors[0] && 'error'}
                    help={errors[0]}
                  >
                    <TextArea
                      value={values[0]}
                      onChange={handleChange}
                      autosize={{ maxRows: 8, minRows: 8 }}
                      placeholder="อธิบายเหตุการณ์เหล่านั้น"
                      name="0"
                    />
                  </Form.Item>
                </QuestionContainer>
                <QuestionContainer>
                  <Title level={4}>2. คำถามจ้า</Title>
                  <Form.Item
                    validateStatus={errors[1] && 'error'}
                    help={errors[1]}
                  >
                    <TextArea
                      value={values[1]}
                      onChange={handleChange}
                      autosize={{ maxRows: 8, minRows: 8 }}
                      placeholder="อธิบายเหตุการณ์เหล่านั้น"
                      name="1"
                    />
                  </Form.Item>
                </QuestionContainer>
                <QuestionContainer>
                  <Title level={4}>3. คำถามจ้า</Title>
                  <Form.Item
                    validateStatus={errors[2] && 'error'}
                    help={errors[2]}
                  >
                    <TextArea
                      value={values[2]}
                      onChange={handleChange}
                      autosize={{ maxRows: 8, minRows: 8 }}
                      placeholder="อธิบายเหตุการณ์เหล่านั้น"
                      name="2"
                    />
                  </Form.Item>
                </QuestionContainer>
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

export default observer(Major)
