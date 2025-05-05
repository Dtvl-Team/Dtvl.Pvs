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
        title: 'AAA',
        icon: 'fa-solid fa-user',
        children: [
            {
                title: 'BBB',
                icon: 'fa-solid fa-house',
                href: '/Home/Index',
                children: [
                    {
                        title: 'EEE',
                        icon: 'fa-solid fa-house',
                        href: '/Home/Index',
                        children: [
                            {
                                show: () => false,
                                title: 'FFF',
                                icon: 'fa-solid fa-house',
                                href: '/Home/Index',
                            }
                        ]
                    }
                ]
            },
            //{
            //    title: 'CCC',
            //    href: '/',
            //},
        ]
    }
], { openAll: true });
//# sourceMappingURL=setup.js.map