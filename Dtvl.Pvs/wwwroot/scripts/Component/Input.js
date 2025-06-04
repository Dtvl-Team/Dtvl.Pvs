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
            Format: Formats.AdDate,
            OnFormat: (value) => {
                console.log(value);
            }
        });
    },
    ':TwDateInput': Paths => {
        DtvlPv.AddPv_Input(Paths, {
            Format: Formats.TwDate,
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
                BindOnly: true,
                Store: 'item.value',
                Number: true,
                OnFormat: {
                    Func: (value, item) => item.value = value,
                    Args: 'item',
                }
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
                BindOnly: true,
                Store: 'Rows2[index]',
                Format: Formats.AdDate,
                OnFormat: {
                    Func: (value, index) => {
                        Model.GetStore('Rows2')[index] = value;
                    },
                    Args: 'index',
                }
            });
        },
    },
    'using': () => {
        Model.UpdateStore('Rows2', [20250110, '19981014', '2025-06-04']);
    },
});
//# sourceMappingURL=Input.js.map