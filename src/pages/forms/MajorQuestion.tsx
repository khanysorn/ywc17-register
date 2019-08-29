import { Col, Form, Input, Typography } from 'antd'

import { Formik } from 'formik'
import { get } from 'lodash'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import BackButton from '../../components/Form/BackButton'
import ButtonsContainer from '../../components/Form/ButtonsContainer'
import Container from '../../components/Form/FormContainer'
import NextButton from '../../components/Form/NextButton'
import QuestionContainer from '../../components/Form/QuestionContainer'
import UploadArea from '../../components/Form/UploadArea'
import Header from '../../components/Header'
import Contact from '../../stores/forms/contact'
import MajorQuestion from '../../stores/forms/majorQuestion'
import { MAJOR, MAJOR_QUESTION } from '../../utils/const'
import history from '../../utils/history'

const { Title } = Typography
const { TextArea } = Input

const TitleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

const MajorText = styled.span`
  font-size: 1.6rem;
  color: #e1426f;
  font-weight: 600;
`

const MajorTitle = () => {
  const contactStore = useObservable(Contact)
  useEffect(() => {
    contactStore.getAnswers()
  }, [contactStore])

  return (
    <MajorText>สาขา {MAJOR((contactStore.formData as any).major)}</MajorText>
  )
}

const Major = () => {
  const majorQuestionStore = useObservable(MajorQuestion)
  const contactStore = useObservable(Contact)

  // init
  useEffect(() => {
    majorQuestionStore.getAnswers()
    contactStore.getAnswers()
  }, [majorQuestionStore, contactStore])
  const storeValues = Object.assign({}, majorQuestionStore.formData)
  const initialValues = get(storeValues, 'answers', [])

  const schema =
    MAJOR_QUESTION((contactStore.formData as any).major).length === 4
      ? Yup.object().shape({
          0: Yup.string().required('กรุณาตอบคำถาม'),
          1: Yup.string().required('กรุณาตอบคำถาม'),
          2: Yup.string().required('กรุณาตอบคำถาม'),
          3: Yup.string().required('กรุณาตอบคำถาม')
        })
      : Yup.object().shape({
          0: Yup.string().required('กรุณาตอบคำถาม'),
          1: Yup.string().required('กรุณาตอบคำถาม'),
          2: Yup.string().required('กรุณาตอบคำถาม')
        })

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
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
            <Header current={3} />
            <Container>
              <TitleContainer>
                <Title level={3} style={{ marginBottom: 28 }}>
                  คำถามประจำสาขา
                </Title>
                <MajorTitle />
              </TitleContainer>
              <Form onSubmit={handleSubmit}>
                {MAJOR_QUESTION((contactStore.formData as any).major).map(
                  (question, i) => {
                    if (
                      (contactStore.formData as any).major === 'design' &&
                      i === 3
                    ) {
                      return (
                        <QuestionContainer key={4}>
                          <Title level={4}>4. {question}</Title>
                          <Form.Item
                            validateStatus={errors[3] && 'error'}
                            help={errors[3]}
                          >
                            <UploadArea
                              value={values[3]}
                              onChange={value => setFieldValue('3', value)}
                              name="question4"
                            />
                          </Form.Item>
                        </QuestionContainer>
                      )
                    }

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
                  }
                )}
                <ButtonsContainer type="flex" justify="center">
                  <Col
                    xs={24}
                    sm={12}
                    md={6}
                    style={{ textAlign: 'center', marginTop: 10 }}
                  >
                    <BackButton onClick={() => history.push('/step/general')}>
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
