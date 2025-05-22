
let Url = 'https://web.pcc.gov.tw/prkms/tender/common/basic/readTenderBasic?pageSize=1000&level_1=on&tenderType=TENDER_DECLARATION&tenderWay=TENDER_WAY_ALL_DECLARATION&dateType=isSpdt&radProctrgCate=RAD_PROCTRG_CATE_3&tenderName=¨t²Î';

fetch(Url)
    .then(Response => {
        return Response.text();
    })
    .then(HtmlText => {
        document.querySelector('#test').innerHTML = HtmlText;
    });
