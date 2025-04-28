
import { Model } from '@rugal.tu/vuemodel3';

Model.WithMountId('app')
    .UpdateStore('App.IsMounted', false)
    .WithMounted(() => {
        Model.UpdateStore('App.IsMounted', true);
    })
    .Init();
