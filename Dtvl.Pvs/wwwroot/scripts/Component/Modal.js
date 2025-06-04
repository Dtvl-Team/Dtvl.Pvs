import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
Model.AddV_Tree('Root', {
    ':ActivatorModal': {
        'using': Paths => {
            DtvlPv.AddPv_Modal(Paths);
        },
        ':Btn': {
            'v-bind': 'props',
        }
    },
    ':StoreModal': Paths => DtvlPv.AddPv_Modal('StoreModal'),
    ':StoreModalBtn': Paths => {
        Model.AddV_Click(Paths, () => {
            DtvlPv.Modal('StoreModal', true);
        });
    },
});
//# sourceMappingURL=Modal.js.map