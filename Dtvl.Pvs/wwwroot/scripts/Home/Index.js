import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
DtvlPv.AddPv_Tabbed('Tabbed');
let UserName = 'Rugal';
Model
    .AddV_Tree('StaffTable', {
    ':Name': {
        'v-model': 'item.name',
    },
    ':Checked': {
        'v-model': 'item.checked',
    },
    ':BtnEnable': {
        'v-if': 'item.checked == false',
    },
    ':BtnDisable': {
        'v-if': 'item.checked == true'
    }
})
    .AddV_Click('BtnEnable', (Item) => {
    Item.checked = true;
}, 'item')
    .AddV_Click('BtnDisable', (Item) => {
    Item.checked = false;
}, 'item')
    .AddV_Click('BtnSelectStaff', () => {
    DtvlPv.Modal('SelectStaffModal', true);
})
    .AddV_Click('BtnSelectOk', () => {
    let Names = Model.GetStore('SelectStaff').map((Item) => Item.name);
    Model.UpdateStore('StaffName', Names.join(', '));
    DtvlPv.Modal('SelectStaffModal', false);
})
    .AddV_FilePicker('BtnSelectImage', {
    Store: 'SelectImages',
    ConvertType: ['base64'],
    Multiple: true,
    Accept: 'image/*',
})
    .AddV_Tree('Images', {
    'v-for': 'FileStore.SelectImages',
    ':Image': {
        'v-bind:src': 'item.Base64',
    }
});
DtvlPv
    .AddPv_Input('StaffName')
    .AddPv_Modal('SelectStaffModal')
    .AddPv_DataTable('StaffTable', {
    Headers: [
        {
            title: '價格',
            key: 'name',
        },
        {
            title: '是否啟用',
            key: 'checked',
        },
        {
            key: 'btn',
            title: '測試按鈕'
        }
    ],
    Index: {
        width: '5px',
        align: 'center',
    },
    Select: {
        //ItemValue: '', //指向選擇後的值
        //Store: 'SelectResult', //改成選擇的儲存區 < Store.SelectResult
        ItemValue: 'id',
        Store: 'SelectStaff',
        ReturnObject: true,
        RowClicked: false,
    },
    Datas: [{ id: 'a', name: 'userA', checked: true }, { id: 'b', name: 'userB', checked: false, }],
});
//# sourceMappingURL=Index.js.map