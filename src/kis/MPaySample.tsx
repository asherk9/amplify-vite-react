import React, { useRef } from 'react';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';

const merchantKey = '2d6ECGhR1pg/1QGE1lcRI4awsWEgshjEyI8UgYslLPJSuNeyPTkdrT8XWARezvDTUJClWQWhjxzBbu7AsuLZqg==';
const merchantID = 'kistest00m';
const goodsNm = 'KISPG';
const goodsAmt = '1004';
const ordNm = 'KISPG';
const ordTel = '01000000000';
const ordEmail = 'kispg@kispg.com';
const ordNo = 'kispg1234567890';

function getyyyyMMddHHmmss() {
  return dayjs().format('YYYYMMDDHHmmss');
}

function sha256Encrypt(data: string) {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

const MPaySample: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const ediDate = getyyyyMMddHHmmss();
  const encData = sha256Encrypt(merchantID + ediDate + goodsAmt + merchantKey);

  const handlePay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const curUrl = window.location.href;
      const returnUrl = curUrl.substring(0, curUrl.lastIndexOf('/')) + '/mPayResultSample.jsp';
      (formRef.current.elements.namedItem('returnUrl') as HTMLInputElement).value = returnUrl;
      formRef.current.action = 'https://testapi.kispg.co.kr/v2/auth';
      formRef.current.submit();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div id="sampleInput" className="paypop_con" style={{ padding: '20px 15px 35px 15px', display: 'inline-block', float: 'none' }}>
        <p className="square_tit mt0" style={{ textAlign: 'left' }}><strong>결제정보</strong></p>
        <form name="payInit" method="post" ref={formRef}>
          <table className="tbl_sty02">
            <tbody>
              <tr><td>결제수단</td><td><input type="text" name="payMethod" defaultValue="card" /></td></tr>
              <tr><td>결제타입</td><td><input type="text" name="trxCd" defaultValue="0" /></td></tr>
              <tr><td>가맹점ID</td><td><input type="text" name="mid" defaultValue={merchantID} /></td></tr>
              <tr><td>상품명</td><td><input type="text" name="goodsNm" defaultValue={goodsNm} /></td></tr>
              <tr><td>주문번호</td><td><input type="text" name="ordNo" defaultValue={ordNo} /></td></tr>
              <tr><td>결제금액</td><td><input type="text" name="goodsAmt" defaultValue={goodsAmt} /></td></tr>
              <tr><td>구매자명</td><td><input type="text" name="ordNm" defaultValue={ordNm} /></td></tr>
              <tr><td>구매자연락처</td><td><input type="text" name="ordTel" defaultValue={ordTel} /></td></tr>
              <tr><td>구매자이메일</td><td><input type="text" name="ordEmail" defaultValue={ordEmail} /></td></tr>
              <tr><td>returnUrl</td><td><input type="text" name="returnUrl" defaultValue="" /></td></tr>
            </tbody>
          </table>
          {/* Hidden fields */}
          <input type="hidden" name="userIp" value="0:0:0:0:0:0:0:1" />
          <input type="hidden" name="mbsUsrId" value="user1234" />
          <input type="hidden" name="ordGuardEmail" value="" />
          <input type="hidden" name="rcvrAddr" value="서울특별시" />
          <input type="hidden" name="rcvrPost" value="00100" />
          <input type="hidden" name="mbsIp" value="127.0.0.1" />
          <input type="hidden" name="mbsReserved" value="MallReserved" />
          <input type="hidden" name="rcvrMsg" value="rcvrMsg" />
          <input type="hidden" name="goodsSplAmt" value="0" />
          <input type="hidden" name="goodsVat" value="0" />
          <input type="hidden" name="goodsSvsAmt" value="0" />
          <input type="hidden" name="payReqType" value="1" />
          <input type="hidden" name="model" value="WEB" />
          <input type="hidden" name="charSet" value="UTF-8" />
          <input type="hidden" name="ediDate" value={ediDate} />
          <input type="hidden" name="encData" value={encData} />
        </form>
        <a href="#;" id="payBtn" className="btn_sty01 bg01" style={{ margin: '15px' }} onClick={handlePay}>결제하기</a>
      </div>
    </div>
  );
};

export default MPaySample;