import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
DtvlPv.AddPv_Tabbed('Tabbed');
let UserName = 'Rugal';
Model
    .AddApi({
    Test: {
        Method: 'GET',
        Url: '/',
    },
})
    .AddV_Click('TestBtn', (props, item) => {
}, 'props, item')
    .UpdateStore('App.UserName', UserName)
    .AddV_Text('HeaderUserName', 'App.UserName');
DtvlPv
    .AddPv_Select('Select', {
    ApiKey: 'Test',
})
    .AddPv_Select('Select2', {
    ApiKey: 'Test',
})
    .AddPv_DataTable('DataTable', {
    ApiKey: 'Test',
    Headers: [
        {
            key: 'all',
            width: '*',
            value: 'a'
        },
    ],
    Index: {
        width: '5px',
        align: 'center',
    },
    Select: {
        ItemValue: 'a',
        Store: 'aaaa',
    },
    Datas: [{ a: 'A1', b: 'B1' }, { a: 'a2', b: 'b2' }],
});
//# sourceMappingURL=Index.js.map