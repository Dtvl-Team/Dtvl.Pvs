import { Model } from '@rugal.tu/vuemodel3';
import { DtvlPv } from 'dtvlpv';
let Viewer = null;
Model.AddV_Tree('Root', {
    ':Viewer': Paths => {
        Viewer = Paths;
        DtvlPv.AddPv_ImageViewer(Paths, {
            Mode: 'album',
        });
    },
    ':BtnOpen': {
        'v-on:click': () => {
            DtvlPv.ImageViewer(Viewer, {
                Datas: [
                    'https://dogtime.com/wp-content/uploads/sites/12/2024/03/GettyImages-1285465107-e1710251441662.jpg?w=1024',
                    'https://www.tiendanimal.pt/blog/wp-content/uploads/2021/02/imagem-cachorro-golden-retriever.jpg',
                    'https://neaterpets.com/cdn/shop/articles/chien-golden-retriever-animal-1497220749LJ6.jpg?v=1746195069&width=900',
                    'https://www.thesprucepets.com/thmb/ROV348T6Uyc1FfD5jsETO8bc1mI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GoldenPuppy185743593-56a9c1f23df78cf772aa4a33.jpg',
                ]
            });
        }
    },
});
//# sourceMappingURL=ImageViewer.js.map