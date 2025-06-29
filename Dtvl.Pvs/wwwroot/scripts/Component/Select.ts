import { DtvlPv } from 'dtvlpv';
import { Model, PathType } from '@rugal.tu/vuemodel3';

let SelectDatas = [

];
let StringDatas = ['a', 'b', 'c'];
for (let i = 0; i < 1000; i++) {
    SelectDatas.push(`${i}aaaa`);
}
Model.UpdateStore('Datas.test', SelectDatas);
Model.AddV_Tree('Root', {
    ':StoreSelect': Paths => {
        DtvlPv.AddPv_Select(Paths, {
            ApiKey: 'Datas.test',
            ReturnObject: true,
            //ItemValue: 'id',
            //ItemName: 'name',
            ItemName: (Item: any) => {
                return Item.replaceAll('a', '');
            },
            Store: 'Filter.result',
        });
    }
})



Model.UpdateStore('SomeApi', [{}, {}, {}]);
Model.AddV_Tree('Rows', {
    ':Items': {
        'v-for': 'SomeApi',
        ':Select': Paths => {
            DtvlPv.AddPv_Select(Paths, {
                Store: {
                    Path: 'item.value',
                    Items: true,
                },
                ReturnObject: true,
                Datas: SelectDatas,
                ItemName: 'name',
                ItemValue: 'id',
                Multiple: true,
            });
        }
    }
});


