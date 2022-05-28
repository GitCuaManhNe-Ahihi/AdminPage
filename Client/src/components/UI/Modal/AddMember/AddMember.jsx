import { Button, Input, Modal, Radio, Row, Typography } from 'antd'
import React, { createRef, useContext } from 'react'
import { BsPencil } from 'react-icons/bs'
import { AppContext } from '../../../../Context/AppProvider'
import { TranslateContext } from '../../../../Context/TranslateProvider'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { addUserService } from '../../../../Service/UserService'

export default function AddMember() {
    const { t } = useContext(TranslateContext)
    const { addNewMember, setAddNewMember, setHandle } = useContext(AppContext)
    const name = createRef()
    const email = createRef()
    const password = createRef()
    const [isOpenPassword, setIsOpenPassword] = React.useState(false)
    const [error, setError] = React.useState('')
    const [role, setRole] = React.useState(0)
    const hanleSave = async () => {
        if (name.current.input.value && email.current.input.value && password.current.input.value) {
            try {
                await addUserService({
                    name: name.current.input.value,
                    email: email.current.input.value,
                    password: password.current.input.value,
                    role
                })
                setHandle(pre => !pre)
                setAddNewMember(false)
                setError('')
            } catch {
                setError('Email không hợp lệ')
            }
        }
        else {
            setError('Vui lòng nhập đầy đủ thông tin')
        }
    }


    return (
        <Modal
            title={t("add_member")}
            visible={addNewMember}
            destroyOnClose={true}
            width={700}
            style={{ top: 10 }}
            onOk={() => hanleSave()}
            onCancel={() => setAddNewMember(false)}
            okText={t("ok")}
            cancelText={t("cancel")}
        >
            <Row>
                <Typography.Title level={5} style={{ display: "block" }}>
                    {t("name")}
                </Typography.Title>
            </Row>
            <Row>
                <Input ref={name}></Input>
            </Row>
            <Row>
                <Typography.Title level={5} style={{ display: "block" }}>
                    {t("email")}
                </Typography.Title>
            </Row>
            <Row>
                <Input ref={email}></Input>
            </Row>
            <Row>
                <Typography.Title level={5} style={{ display: "block" }}>
                    {t("password")}
                </Typography.Title>
            </Row>
            <Row style={{ position: 'relative' }}>
                <Input ref={password} type={isOpenPassword ? 'text' : 'password'}></Input> {isOpenPassword ?
                    <AiFillEyeInvisible style={{ position: 'absolute', top: '40%', right: '10px', translate: '-50%' }} onClick={() => setIsOpenPassword(false)} /> :
                    < AiFillEye style={{ position: 'absolute', top: '40%', right: '10px', translate: '-50%' }} onClick={() => setIsOpenPassword(true)} />}
            </Row>
            <Row>
                <Typography.Title level={5} style={{ display: "block" }}>
                    {t("role")}
                </Typography.Title>
            </Row>
            <Row>
                <Radio.Group
                    name="radiogroup"
                    defaultValue={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <Radio value={0}>{t('admin')}</Radio>
                    <Radio value={1}>{t('collaborators')}</Radio>
                </Radio.Group>
            </Row>
            <Row>
                <p style={{ color: 'red' }}>{error}</p>
            </Row>
        </Modal>
    )
}
