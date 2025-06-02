import { Model } from '@rugal.tu/vuemodel3';
Model.AddV_Tree('Root', {
    ':Input': {
        'v-model': 'Root.Input',
        'v-bind:rules': (value, b) => {
            let Value = Model.GetStore('Root.Input');
            if (Value == null)
                return;
            Value = Value.replace(/[^0-9/]/g, '');
            Model.UpdateStore('Root.Input', Value);
        },
    }
});
//# sourceMappingURL=Input.js.map