import { Model } from '@rugal.tu/vuemodel3';
import { DtvlPv } from 'dtvlpv';

Model.AddV_Tree('Root', {
    ':DatePicker': Paths => DtvlPv.AddPv_DatePicker(Paths),
})