import { Button, Icon, message } from 'antd'
import Upload, { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AuthStore from '../../stores/auth'
import { storage } from '../../utils/firebase'

interface UploadAreaProps {
  name: string
  value: string
  onChange(value: any): any
}

const useFileList = (name: string, onChange: (value: any) => any) => {
  const [loading, setLoading] = useState(true)
  const [fileList, setFileList] = useState<any>([])
  const authStore = useObservable(AuthStore)
  useEffect(() => {
    if (authStore.userId && name) {
      setLoading(true)
      storage
        .ref(`${authStore.userId}/${name}`)
        .list()
        .then(list => {
          return Promise.all(list.items.map(item => item.getMetadata()))
        })
        .then(items => {
          setFileList(items.map(item => ({ ...item, uid: item.name })))
          storage
            .ref(`${authStore.userId}/${name}/${items[0].name}`)
            .getDownloadURL()
            .then(url => {
              onChange(url)
            })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [authStore.userId, name])
  return { loading, fileList, setFileList }
}

const UploadAreaContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const UploadItem = styled.div`
  margin-left: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  line-height: 1rem;
  &:hover {
    background-color: #eee;
  }
`
const CloseIcon = styled(Icon)`
  margin-left: 1rem;
  transform: scale(0.8);
  cursor: pointer;
`

const UploadArea: React.FC<UploadAreaProps> = ({ onChange, value, name }) => {
  const authStore = useObservable(AuthStore)
  const { loading, fileList, setFileList } = useFileList(name, onChange)
  const customUpload = async ({ onError, onSuccess, file }: any) => {
    try {
      const oldFileList = [...fileList]
      const uploaded = await storage
        .ref(`${authStore.userId}/${name}/${file.name}`)
        .put(file)

      const url = await storage
        .ref(`${authStore.userId}/${name}/${file.name}`)
        .getDownloadURL()

      oldFileList.forEach(old => {
        storage.ref(`${authStore.userId}/${name}/${old.name}`).delete()
      })

      onChange(url)
      onSuccess(null, uploaded)
      setFileList([file])
      message.success('อัพโหลดไฟล์เรียบร้อยแล้ว')
    } catch (e) {
      onError(e)
    }
  }
  const onRemove = async (file: UploadFile) => {
    try {
      await storage.ref(`${authStore.userId}/${name}/${file.name}`).delete()
      fileList.splice(fileList.findIndex((e: any) => e.name === file.name), 1)
      setFileList([...fileList])
      onChange('')
      message.success('ลบไฟล์เรียบร้อยแล้ว')
    } catch (error) {
      message.error('เกิดปัญหาในการลบไฟล์')
    }
  }
  if (loading) {
    return <Button loading={loading}>Upload</Button>
  }
  return (
    <UploadAreaContainer>
      <Upload
        name={name}
        customRequest={customUpload}
        defaultFileList={fileList}
        showUploadList={false}
      >
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
      {fileList.map((e: any) => (
        <UploadItem key={e.name}>
          <Icon type="paper-clip" /> {e.name}
          <CloseIcon type="close" onClick={() => onRemove(e)} />
        </UploadItem>
      ))}
    </UploadAreaContainer>
  )
}

export default UploadArea
