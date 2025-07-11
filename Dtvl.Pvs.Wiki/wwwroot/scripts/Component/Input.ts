import { DtvlPv, Formats } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';

let TwDateInput;
Model.AddV_Tree('Root', {
    ':NumberInput': Paths => {
        DtvlPv.AddPv_Input(Paths, {
            InputMode: 'numeric',
            Formats: {
                Shared: Formats.Number({ MaxLength: 5 }),
                Display: Formats.Number({
                    ThousandsSeparator: true,
                    DecimalPoint: 2,
                    Negative: true,
                }),
                Value: Formats.Number(),
            },
        });
    },
    //':AdDateInput': Paths => {
    //    DtvlPv.AddPv_Input(Paths, {
    //        InputMode: 'numeric',
    //        Formats: {
    //            Display: Formats.AdDate(),
    //            Value: Formats.Number(),
    //        },
    //    });
    //},
    ':TwDateInput': Paths => {
        TwDateInput = Paths;
        DtvlPv.AddPv_Input(Paths, {
            InputMode: 'numeric',
            Formats: {
                Display: Formats.AdDate(),
                Value: Formats.Number(),
            },
        });
    },
    'using': (Paths) => {
        Model.UpdateStore(Paths, {
            NumberInput: 12345,
            AdDateInput: '1998-10/14',
            TwDateInput: '19981014',
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
                    Items: true,
                },
                Formats: {
                    Shared: Formats.AdDate(),
                    Value: Formats.Number(),
                    //Display: Formats.Number({
                    //    ThousandsSeparator: true,
                    //}),
                    //Value: Formats.Number(),
                }
            });
        },
    },
    'using': () => {
        Model.UpdateStore('Rows', [{ value: 12345 }, { value: '19981014a' }]);
        //Model.UpdateStore('Rows', [12345, 19981014]);
        //console.log(Model.GetStore('Rows'));
    }
});

//Model.AddV_Tree('Rows2', {
//    ':Inputs': {
//        'v-for': 'Rows2',
//        ':ItemInput': Paths => {
//            DtvlPv.AddPv_Input(Paths, {
//                Store: {
//                    Path: 'Rows2[index]',
//                    IsItem: true,
//                },
//                Formats: {
//                    Display: Formats.AdDate,
//                    Value: Formats.Number,
//                },
//            });
//        },
//    },
//    'using': () => {
//        Model.UpdateStore('Rows2', [20250110, '19981014', '2025-06-04']);
//    },
//});
