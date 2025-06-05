import { DtvlPv } from 'dtvlpv';
import { Model, PathType } from '@rugal.tu/vuemodel3';

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
Model.UpdateStore('SomeApi', [1]);
Model.AddV_Tree('Rows', {
    ':Items': {
        //'v-for': 'SomeApi',
        ':Select': Paths => {
            DtvlPv.AddPv_Select(Paths, {
                Store: 'SelectResult',
                Datas: SelectDatas,
                ItemName: 'name',
                ItemValue: 'id',
                Multiple: true,
            });
        }
    }
});

