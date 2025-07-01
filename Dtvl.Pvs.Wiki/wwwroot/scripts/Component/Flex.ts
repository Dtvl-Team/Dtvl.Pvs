import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';


let Items = [
    { Content: '1' },
    { Content: '2' },
    { Content: '3' },
    { Content: '4' },
    { Content: '5' },
    { Content: '6' },
    { Content: '7' },
    { Content: '8' },
    { Content: '9' },
    { Content: '10' },
];

Model.UpdateStore('SomeApi', Items)
    .AddV_Tree('DynamicFlex', {
        ':ItemContent': {
            'v-text': 'item.Content'
        },
    });

DtvlPv.AddPv_Flex('DynamicFlex', {
    ApiKey: 'SomeApi',
});
