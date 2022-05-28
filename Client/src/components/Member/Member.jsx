import { Button, Result, Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import { TranslateContext } from '../../Context/TranslateProvider';
import { publicId } from '../../Helper';
import { deleteImageService } from '../../Service/PostService';
import { deleteUserService, getAllUserService } from '../../Service/UserService';
import CardContainer from '../UI/Card/CardContainer';
import HearderSearch from '../UI/HeaderSearch/HeaderSearch';
import classes from './Member.module.scss';
import MemberItem from './MemberItem';

export default function Member() {
    const { t } = useContext(TranslateContext)
    const {user} = useContext(AuthContext)
    const {handle} = useContext(AppContext)
    const [isDelete, setIsDelete] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isNotifyDone, setIsNotifyDone] = React.useState(false);
    const {data,mutate} = useSWR("users",getAllUserService)
    useEffect(() => {
        mutate();
    }, [isNotifyDone, handle])
    const handleDeleteUser = (id) => {
        const deleteItem = data.filter(item =>item.id == id)
        setIsDelete(true); 
        setIdDelete(id);
        deleteImageService(publicId(deleteItem[0].image))

    }
    const handleConfirmDelete = async() => {
        try{
             setLoading(true);
             await deleteUserService(idDelete);
             setIsSuccess(true);
        }
        catch(e){
            setIsSuccess(false);
        }
        finally{
            setLoading(false);
            setIsDelete(false);
            setIsNotifyDone(true);
        }
    }
    const handlCancelDelete = () => {
        setIsDelete(false);
    }
    return (
        <>
            <HearderSearch type={true}/>
            <CardContainer>
                {
                    data?.map((item) => {
                        return user?.id !== item.id?<MemberItem key={item.id} data={item} handleDeleteUser={handleDeleteUser}></MemberItem>:null
                    })
                }
                {
                    isDelete ? <Result
                        className={classes.confirm}
                        status="error"
                        title= {t("confirm_delete")}
                        extra={
                            <>
                            <Button type="primary" danger  onClick={handleConfirmDelete}>
                                {loading ? <Spin></Spin> : t("accept")}
                            </Button>
                            <Button type="primary" onClick={handlCancelDelete}>
                                {t("cancel")}
                            </Button>
                            </>
                        }>

                    </Result> : null
                }
                {
                    isNotifyDone ? <Result className={classes.notifyDone} 
                        status={`${isSuccess ? 'success' : 'error'}`}
                        title= {isSuccess ?t("delete_success"): t("delete_fail")}
                        extra={
                            <Button type="primary" onClick={()=>setIsNotifyDone(false)}>
                                {t("accept")}
                            </Button>
                        }/>: null
                }
            </CardContainer>
        </>
    )
}
