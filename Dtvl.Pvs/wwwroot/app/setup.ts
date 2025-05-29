
import { Model } from '@rugal.tu/vuemodel3';
import { createVuetify, directives } from 'vuetify/vuetify-labs';
import { DtvlPv } from 'dtvlpv';

let VuetifyInit = createVuetify({
    directives,
    locale: {
        locale: 'zhHant'
    }
});

Model.WithVueUse(VuetifyInit)
    .WithQueryDomName('pv-name');

DtvlPv.UseRouter('Router', [
    {
        title: 'Flex',
        href: ['/Sample/Flex', '/'],
    },
    {
        title: 'ImageFlex',
        href: '/Sample/ImageFlex',
    },
    {
        title: 'Input',
        href: '/Sample/Input',
    },
    {
        title: 'Select',
        href: '/Sample/Select',
    },
    {
        title: 'Image',
        href: '/Sample/Image',
    },

], {
    OpenMode: 'all',
});