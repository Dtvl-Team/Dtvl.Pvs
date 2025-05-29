import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

Model.AddV_Tree('Root', {
    ':Input': {
        'using': (Paths) => {
            DtvlPv.AddPv_Input(Paths);
        }
    }
})