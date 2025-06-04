import { DtvlPv, Formats } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

Model.AddV_Tree('Root', {
    ':NumberInput': Paths => {
        DtvlPv.AddPv_Input(Paths, {
            Number: true,
        });
    },
    ':AdDateInput': Paths => {
        DtvlPv.AddPv_Input(Paths, {
            Formats: {
                Display: Formats.AdDate,
                Value: Formats.Number,
            },
        });
    },
    ':TwDateInput': Paths => {
        DtvlPv.AddPv_Input(Paths, {
            Formats: Formats.TwDate,
        });
    },
    'using': (Paths) => {
        Model.UpdateStore(Paths, {
            NumberInput: 12345,
            AdDateInput: '1998-10/14',
            TwDateInput: '1141014',
        });
    }
});

Model.AddV_Tree('Rows', {
    ':Inputs': {
        'v-for': 'Rows',
        ':ItemInput': Paths => {
            DtvlPv.AddPv_Input(Paths, {
                Store: {
                    Path: 'item.value',
                    IsItem: true,
                },
                Number: true,
            });
        },
    },
    'using': () => {
        Model.UpdateStore('Rows', [{ value: 12345 }, { value: '19981014' }, { value: '0871014' }]);
    }
});

Model.AddV_Tree('Rows2', {
    ':Inputs': {
        'v-for': 'Rows2',
        ':ItemInput': Paths => {
            DtvlPv.AddPv_Input(Paths, {
                Store: {
                    Path: 'Rows2[index]',
                    IsItem: true,
                },
                Formats: {
                    Display: Formats.AdDate,
                    Value: Formats.Number,
                },
            });
        },
    },
    'using': () => {
        Model.UpdateStore('Rows2', [20250110, '19981014', '2025-06-04']);
    },
});

