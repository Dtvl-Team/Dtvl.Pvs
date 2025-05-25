import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
let SelectDatas = [
    {
        id: 1,
        name: 'A'
    },
    {
        id: 2,
        name: 'B'
    },
    {
        id: 3,
        name: 'C'
    },
];
let Datas = [{ SelectId: 1 }, { SelectId: 3 }];
Model.UpdateStore('SomeApi', Datas)
    .UpdateStore('SelectDatas', SelectDatas);
Model.AddV_Tree('Datas', {
    ':Rows': {
        'v-for': 'SomeApi',
    }
});
DtvlPv.AddPv_Select(['Datas', 'Rows', 'Sel'], {
    Datas: SelectDatas,
    ItemName: 'name',
    ItemValue: 'id',
    Store: 'item.SelectId',
    ReadOnly: true,
    BindOnly: true,
});
//# sourceMappingURL=Select.js.map