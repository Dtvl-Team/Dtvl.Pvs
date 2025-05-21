import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
import { ref } from 'vue';

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
    .AddV_Click('BtnEnable', (Item: any) => {
        Item.checked = true;
    }, 'item')
    .AddV_Click('BtnDisable', (Item: any) => {
        Item.checked = false;
    }, 'item')
    .AddV_Click('BtnSelectStaff', () => {
        DtvlPv.Modal('SelectStaffModal', true);
    })
    .AddV_Click('BtnSelectOk', () => {
        let Names = Model.GetStore('SelectStaff').map((Item: any) => Item.name);
        Model.UpdateStore('StaffName', Names.join(', '))
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
                title: '����',
                key: 'name',
            },
            {
                title: '�O�_�ҥ�',
                key: 'checked',
            },
            {
                key: 'btn',
                title: '���ի��s'
            }
        ],
        Index: {
            width: '5px',
            align: 'center',
        },
        Select: { //�}��checkbox���
            //ItemValue: '', //���V��ܫ᪺��
            //Store: 'SelectResult', //�令��ܪ��x�s�� < Store.SelectResult
            ItemValue: 'id',
            Store: 'SelectStaff',
            ReturnObject: true,
            RowClicked: false,
        },
        Datas: [{ id: 'a', name: 'userA', checked: true }, { id: 'b', name: 'userB', checked: false, }],
    });

fetch('api/Staff/GetStaff', {
    method: 'POST',
    body: JSON.stringify({
        StaffNo: '001'
    }),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}).then(response => {
    return response.json()
}).then(jsonResult => {
    //update Store
});

Model.AddApi({
    GetStaff: {
        Method: 'POST',
        Url: 'api/Staff/GetStaff',
        Body: {
            StaffNo: '001',
        }
    }
}).ApiCall('GetStaff');
