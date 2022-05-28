import React, { useContext } from 'react'
import { Button } from 'antd'
import classes from './Member.module.scss'
import { TranslateContext } from '../../Context/TranslateProvider'
import { AppContext } from '../../Context/AppProvider'
export default function MemberItem(props) {
    const { t } = useContext(TranslateContext)
    const {setUser,setIsOpenModalInforMember} = useContext(AppContext)
    return (
        <div className={classes.containerItem}>
            <img src={props.data.image}>
            </img>
            <p>
                {props.data.name}
            </p>
            <p>
                {props.data.email}
            </p>
            <p>{ props.data.address}</p>
            <p>{ props.data.phoneNumber}</p>
            <p> {props.data.admin == 0?t('admin'):t('collaborators')} </p>
            <div>
                <Button type='primary' onClick={()=>{setUser(props.data);setIsOpenModalInforMember(true)}}> {t('view_detail')}</Button>
                <Button type='primary' danger onClick={(id) =>props.handleDeleteUser(props.data.id)}>{t('delete')}</Button>
            </div>
        </div>
    )
}
