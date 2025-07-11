import { Model } from '@rugal.tu/vuemodel3';
import { createVuetify, directives } from 'vuetify/vuetify-labs';
import { DtvlPv } from 'dtvlpv';
let VuetifyInit = createVuetify({
    directives,
    locale: {
        locale: 'zhHant'
    },
    //theme: {
    //    defaultTheme: 'dark',
    //}
});
Model.WithVueUse(VuetifyInit)
    .WithQueryDomName('pv-name');
DtvlPv.UseRouter('Sidebar', [
    {
        title: 'Overview',
        icon: 'fa-solid fa-lightbulb',
        children: [
            {
                title: 'Router',
                href: ['/Overview/Router', '/']
            },
        ],
    },
    {
        title: 'Component',
        icon: 'fa-solid fa-sitemap',
        children: [
            {
                title: 'Input',
                href: '/Component/Input',
            },
            {
                title: 'Select',
                href: '/Component/Select',
            },
            {
                title: 'DatePicker',
                href: '/Component/DatePicker',
            },
            {
                title: 'Flex',
                href: '/Component/Flex',
            },
            {
                title: 'Image',
                href: '/Component/Image',
            },
            {
                title: 'ImageFlex',
                href: '/Component/ImageFlex',
            },
            {
                title: 'ImageViewer',
                href: '/Component/ImageViewer',
            },
            {
                title: 'Modal',
                href: '/Component/Modal',
            },
            {
                title: 'DataTable',
                href: '/Component/DataTable',
            },
            {
                title: 'Tabbed',
                href: '/Component/Tabbed',
            },
        ]
    },
], {
    OpenMode: 'all',
});
//# sourceMappingURL=setup.js.map