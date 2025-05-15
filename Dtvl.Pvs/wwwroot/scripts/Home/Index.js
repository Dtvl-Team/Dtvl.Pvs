import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
DtvlPv.AddPv_SendModal('SendModal')
    .AddPv_Tabbed('Tabbed');
let UserName = 'Rugal';
Model
    .AddV_Click('Btn', () => {
    DtvlPv.Modal('SendModal', true);
})
    .UpdateStore('App.UserName', UserName)
    .AddV_Text('HeaderUserName', 'App.UserName');
//DtvlPv
//    .AddPv_DataTable('Table', {
//        Headers: [
//            {
//                title: 'a',
//            }
//        ],
//        HasButton: true,
//        Datas: [{}],
//    })
//    .AddPv_Input('MyInput', {
//        Store: 'Test.MyA',
//    })
//    .AddPv_Select('Select', {
//        Datas: [1, 2, 3, 4]
//    })
//# sourceMappingURL=Index.js.map