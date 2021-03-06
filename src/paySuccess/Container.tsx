import { callApiOrderDetail, callApiPayCancel } from '@api/api';
import FooterButton from '@components/FooterButton';
import openGlobalAlert from '@utils/openGlobalAlert';
import { numberWithCommas, phoneNumberhipun } from '@utils/textHelpers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 60px;
    margin-bottom: 50px;
    padding: 0 16px 70px;
    width: 100%;
`;
const alignCenter = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TopText = styled.div`
    ${alignCenter};
    margin-top: 25px;
    font-size: 18px;
    line-height: 22px;
`;
const HeaderText = styled.div`
    margin-top: 30px;
    height: 41px;
    width:100%;
    font-size: 14px;
    line-height: 19px;
    font-weight: 400;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgb(112, 112, 112);
    margin-bottom: 10px;
`;
const OrderNumberText = styled.div`
    ${alignCenter};
    font-size: 15px;
    line-height: 19px;
    margin-top: 16px;
`;
const NormalText = styled.div`
    font-size: 13px;
    line-height: 18px;
    font-weight: 300;
`;
const NormalTextCenter = styled(NormalText)`
    ${alignCenter}
`;
const NormalTextBold = styled(NormalText)`
    font-weight: 400;
    margin-right: 18px;
`;
const KeyText = styled.div`
    width: 100px;
    font-size: 13px;
    line-height: 19px;
`;
const OrderInfoBox = styled.div`
    ${alignCenter};
    flex-direction: column;
    align-items: flex-start;
    margin-top: 17px;
    padding: 16px 18px;
    border: 1px solid rgb(217, 217, 217);
`;
const TextLineWrapper = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

export default function PaySuccess(props) {
    const [info, setInfo] = useState({
        orderNumber: "",
        created_at: "",
        name: "",
        contact: "",
        receiverName: "",
        newAddress: "",
        receiverPhone: "",
        detailAddress: "",
        deliveryStatus: "",
        price: 0,
        payId: 0,
        deliveryFee: 0,
        payStatus: "",
        count: 0,
        payMethod: "",
    })
    const history = useHistory();
    const {buyerId, ordered} = useSelector(state => state.common);
    const {id : orderId} = ordered;

    const onConfirm = () => {
        history.push("/order/list");
    };

    useEffect(() => {
        if (!orderId || !buyerId) {
            history.push("/");
            return;
        }
        (async function() {
            try {
                const {data: {success, order}} = await callApiOrderDetail(orderId, buyerId);
                if (success) {
                    setInfo({
                        orderNumber: order.orderNum,
                        created_at: order.created_at,
                        name: order.buyerName,
                        contact: order.buyerPhone,
                        receiverName: order.receiverName,
                        receiverPhone: order.receiverPhone,
                        newAddress: order.newAddress,
                        detailAddress: order.detailAddress,
                        deliveryStatus: order.deliveryStatus,
                        payStatus: order.payStatus,
                        deliveryFee: order.deliveryFee,
                        count: order.count,
                        price: order.price,
                        payId: order.payId,
                        payMethod: order.payMethod === "CARD" ? "????????????" : "????????????",
                    })
                } else {
                    openGlobalAlert("?????? ????????? ????????????.");
                    history.push("/");
                }
            } catch(err) {
            }

        })()
    }, [buyerId, orderId]);

    return (
        <Container>
            <TopText>
                ????????? ????????? ???????????????.
            </TopText>
            <OrderNumberText>
                ???????????? {info.orderNumber}
            </OrderNumberText>
            <NormalTextCenter>?????? ????????? ??????????????????.</NormalTextCenter>
            <OrderInfoBox>
                <TextLineWrapper>
                    <NormalTextBold>????????????</NormalTextBold>
                    <NormalText>????????????</NormalText>
                </TextLineWrapper>
                <TextLineWrapper>
                    <NormalTextBold>????????????</NormalTextBold>
                    <NormalText>{moment(info.created_at).format("YYYYMMDD. HH:mm:SS")}</NormalText>
                </TextLineWrapper>
                <TextLineWrapper>
                    <NormalTextBold>????????????</NormalTextBold>
                    <NormalText>{info.payMethod}</NormalText>
                </TextLineWrapper>
                {
                    info.payMethod === "????????????" && (
                        <TextLineWrapper>
                        <NormalTextBold>????????????</NormalTextBold>
                        <NormalText>?????????</NormalText>
                    </TextLineWrapper>
                    )
                }

            </OrderInfoBox>
            <HeaderText>????????? ??????</HeaderText>
            <TextLineWrapper>
                <KeyText>????????? ??????</KeyText>
                <NormalText>{info.name}</NormalText>
            </TextLineWrapper>
            <TextLineWrapper>
                <KeyText>???????????????</KeyText>
                <NormalText>{phoneNumberhipun(info.contact)}</NormalText>
            </TextLineWrapper>
            <HeaderText>????????? ??????</HeaderText>
            <TextLineWrapper>
                <KeyText>?????? ???</KeyText>
                <NormalText>{info.receiverName}</NormalText>
            </TextLineWrapper>
            <TextLineWrapper>
                <KeyText>??????</KeyText>
                <NormalText>{`${info.newAddress} ${info.detailAddress}`}</NormalText>
            </TextLineWrapper>
            <TextLineWrapper>
                <KeyText>?????????</KeyText>
                <NormalText>{info.receiverPhone}</NormalText>
            </TextLineWrapper>

            <HeaderText>?????? ??????</HeaderText>
            <TextLineWrapper>
                <KeyText>????????????</KeyText>
                <NormalText>{numberWithCommas(info.price * info.count)}???</NormalText>
            </TextLineWrapper>
            <TextLineWrapper>
                <KeyText>??????</KeyText>
                <NormalText>{info.count}???</NormalText>
            </TextLineWrapper>
            <TextLineWrapper>
                <KeyText>?????????</KeyText>
                <NormalText>{numberWithCommas(info.deliveryFee)}???</NormalText>
            </TextLineWrapper>
        
            <FooterButton text="??????" onClickButton={onConfirm} />
        </Container>
    )
};