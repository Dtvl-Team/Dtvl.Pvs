import { DtvlPv, Formats } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

Model.UpdateStore('Root.NumberInput', 123);

Model.AddV_Tree('Root', {
    ':NumberInput': {
        'using': Paths => {
            DtvlPv.AddPv_Input(Paths, {
                Number: true,
            });
        },
    },
    ':AdDateInput': {
        'using': Paths => {
            DtvlPv.AddPv_Input(Paths, {
                Format: Formats.AdDate,
            });
        },
    },
    ':TwDateInput': {
        'using': Paths => {
            DtvlPv.AddPv_Input(Paths, {
                Format: Formats.TwDate,
            });
        },
    }

});

