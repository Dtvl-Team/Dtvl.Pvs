
import { Model } from '@rugal.tu/vuemodel3';
import { createVuetify, directives } from 'vuetify/vuetify-labs'
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
        title: 'Home',
        icon: 'fa-solid fa-house',
        children: [
            {
                title: 'Index',
                href: ['/Home/Index', '/'],
                icon: 'fa-solid fa-house',
            },
            {
                title: 'Detail',
                href: '/Home/Detail',
                icon: 'fa-solid fa-house',
            }
        ],
    },
    {
        title: 'Profile',
        icon: 'fa-solid fa-user',
        children: [
            {
                title: 'Index',
                href: '/Profile/Index',
                icon: 'fa-solid fa-user',
            },
            {
                title: 'Detail',
                href: '/Profile/Detail',
                icon: 'fa-solid fa-user',
            }
        ],
    },
    {
        title: 'Project',
        icon: 'fa-solid fa-diagram-project',
        children: [
            {
                title: 'Index',
                href: '/Project/Index',
                icon: 'fa-solid fa-diagram-project',
            },
            {
                title: 'Detail',
                href: '/Project/Detail',
                icon: 'fa-solid fa-diagram-project',
            }
        ],
    },
], {
    OpenMode: 'single',
});