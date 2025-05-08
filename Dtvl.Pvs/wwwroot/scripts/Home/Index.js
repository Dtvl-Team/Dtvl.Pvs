import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
Model.AddV_Click('Btn', () => {
    //DtvlPv.AddPv_AnimatePush('View', {
    //    PositionFrom: 'Right',
    //});
    //LeftView.animate([
    //    { right: '0px' },
    //    { right: '-100px' },
    //],)
    //View.animate([
    //    { width: '25%' },
    //    { width: '1%' },
    //], {
    //    duration: 500,
    //    easing: 'ease-in-out',
    //    iterations: 1,
    //    fill: 'forwards',
    //});
});
console.warn();
DtvlPv.AddPv_Input('MyInput', {
    Store: 'Test.MyA',
    Secure: true,
});
DtvlPv.AddPv_DataTable('Table', {
    Index: {
        Type: 'Page'
    },
    Headers: [
        {
            title: 'A'
        }
    ],
    Datas: [
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
        'a',
    ]
});
//# sourceMappingURL=Index.js.map