import { DtvlPv } from 'dtvlpv';
let Datas = [
    {
        test: 'Aaaaaaaaaaaaaaaaa',
        test2: 'Bbbbbbbbbbbbbbbb',
        test3: 'Cccccccccccccccc',
        test4: 'Dddddddddddddddd',
        test5: 'Eeeeeeeeeeeeeeee',
    },
];
for (let i = 0; i < 100; i++) {
    Datas.push({
        test: `A${i}`,
        test2: `B${i}`,
        test3: `C${i}`,
        test4: `D${i}`,
        test5: `E${i}`,
    });
}
DtvlPv.AddPv_DataTable('DataTable', {
    Select: {
        ItemValue: 'test',
        ReturnObject: false,
    },
    Headers: [
        {
            title: 'test',
            key: 'test',
            align: {
                content: 'center'
            },
        },
        {
            title: 'sss',
            key: 'testcus',
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
});
//# sourceMappingURL=DataTable.js.map