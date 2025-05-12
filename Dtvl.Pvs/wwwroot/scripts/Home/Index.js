import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
let UserName = 'Rugal';
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
})
    .UpdateStore('App.UserName', UserName)
    .AddV_Text('HeaderUserName', 'App.UserName');
console.warn();
DtvlPv
    .AddPv_Input('MyInput', {
    Store: 'Test.MyA',
})
    .AddPv_Select('Select', {
    Datas: [1, 2, 3, 4]
});
//# sourceMappingURL=Index.js.map