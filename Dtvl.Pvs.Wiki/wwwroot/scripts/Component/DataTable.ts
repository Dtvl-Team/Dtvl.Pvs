import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

let Datas = [
    {
        test: 'Aaaaaaaaaaaaaaaaa',
        test2: 'Bbbbbbbbbbbbbbbb',
        test3: 'Cccccccccccccccc',
        test4: 'Dddddddddddddddd',
        test5: 'Eeeeeeeeeeeeeeee',
    },
]

for (let i = 0; i < 100; i++) {
    Datas.push({
        test: `A${i}`,
        test2: `B${i}`,
        test3: `C${i}`,
        test4: `D${i}`,
        test5: `E${i}`,
    })
}


DtvlPv.AddPv_DataTable('DataTable', {
    Headers: [
        {
            title: 'test',
            key: 'test',
            width: '200px',
            align: {
                content: 'center'
            },
        },
        {
            title: 'input',
            key: 'testinput',
        },
        {
            title: 'test2',
            key: 'test2',
        },
        {
            title: 'test3',
            key: 'test3',
        },
        {
            title: 'test4',
            key: 'test4',
        },
        {
            title: 'test5',
            key: 'test5',
        },
    ],
    Datas,
    Select: {
        ItemValue: 'test',
        Store: 'Result',
        Mode: 'single',
    }
});

DtvlPv.AddPv_Input('TestInput', {
    Store: {
        Path: 'item.test',
        //Items: 
    },
});

Model.AddV_Click('BtnA', (item: any) => {
    console.log(item);
}, 'Item');