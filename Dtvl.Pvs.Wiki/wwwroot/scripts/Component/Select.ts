import { DtvlPv } from 'dtvlpv';
import { Model, PathType } from '@rugal.tu/vuemodel3';

let SelectDatas = [

];
for (let i = 0; i < 1000; i++) {
    //SelectDatas.push(`${i}`);
    SelectDatas.push({
        name: `name-${i}`,
        value: i,
    });
}

Model.AddV_Click('Btn', () => {
    //DtvlPv.GetSelect('Root.StoreSelect').SelectedItem = null;
    Model.GetStore('SomeApi')[0].Selected = null;
})

//Model.AddV_Tree('Root', {
//    ':StoreSelect': Paths => {
//        DtvlPv.AddPv_Select(Paths, {
//            ApiKey: 'Datas.test',
//            //ReturnObject: true,
//            ItemValue: 'value',
//            ItemName: 'name',
//            //ItemName: (Item: any) => {
//            //    return Item.replaceAll('a', '');
//            //},
//            Store: 'Filter.result',
//        });
//    }
//});
//DtvlPv.GetSelect('Root.StoreSelect').SelectedValue = 3;
//Model.UpdateStore('Filter.result', 'a3');
Model.UpdateStore('Datas.test', SelectDatas);
Model.UpdateStore('SomeApi', [{ Selected: 3 }]);

Model.AddV_Tree('Rows', {
    ':Items': {
        'v-for': 'SomeApi',
        ':Select': Paths => {
            DtvlPv.AddPv_Select(Paths, {
                Store: {
                    Path: 'item.Selected',
                    Items: true,
                },
                //ReturnObject: true,
                ApiKey: 'Datas.test',
                //Datas: SelectDatas,
                ItemName: 'name',
                ItemValue: 'value',
                //Multiple: true,
            });
        }
    }
});

//DtvlPv.GetSelect('Rows.Items.Select').Datas = SelectDatas;

