import { Model } from '@rugal.tu/vuemodel3';
import { DtvlPv } from 'dtvlpv';

const ImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gcUu-D8ElLcFw0TZSvCdBasqs4rG_YesHQm9Rw269lUZeRMN-dPzVZ9VH82U9Ji8OC3XHBke75d21Coy7Cho4Q';
const ImageUrl2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ZNb901lAobAaHG-xp4bKBX5Rhre_-a59xA&s';

let ImageViewer: any;

Model.AddV_Tree('Root', {
    ':ImageViewer': Paths => {
        ImageViewer = Paths;
        DtvlPv.AddPv_ImageViewer(Paths);
    },
    ':Btn': Paths => {
        Model.AddV_FilePicker(Paths, {
            Store: 'image',
            ConvertType: 'base64',
        });
    },
    ':Image': Paths => {
        DtvlPv.AddPv_Image(Paths, {
            Src: 'FileStore.image.Base64',
            Viewer: ImageViewer,
        });
    }
});