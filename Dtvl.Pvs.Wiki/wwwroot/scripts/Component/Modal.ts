import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

let StoreModal: any;

Model.AddV_Tree('Root', {
    ':ActivatorModal': {
        'using': Paths => {
            DtvlPv.AddPv_Modal(Paths);
        },
        ':Btn': {
            'v-bind': 'props',
        }
    },
    ':StoreModal': {
        using: Paths => {
            StoreModal = Paths;
            DtvlPv.AddPv_Modal(Paths);
        },
        ':Input': Paths => {
            DtvlPv.AddPv_Input(Paths, 'filter.result');
        },
    },
    ':StoreModalBtn': Paths => {
        Model.AddV_Click(Paths, () => {
            DtvlPv.Modal(StoreModal, true);
        });
    },
});
