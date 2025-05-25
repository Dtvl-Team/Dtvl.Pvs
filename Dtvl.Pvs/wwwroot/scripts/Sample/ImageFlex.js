import { DtvlPv } from 'dtvlpv';
import { Model } from '@rugal.tu/vuemodel3';
const Images = [
    { Src: 'https://heronscrossing.vet/wp-content/uploads/Golden-Retriever-1024x683.jpg' },
    { Src: 'https://img1.wsimg.com/isteam/ip/d37f8c43-8f8b-4d10-9f3b-efd6d1f29fe8/puppy%20main.JPG/:/rs=h:1000,cg:true,m' },
    { Src: 'https://cranehollowgoldens.com/wp-content/uploads/2023/08/IMG_9514-743x1024.jpg' },
    { Src: 'https://blog.thepetlabco.com/wp-content/uploads/2024/06/shutterstock_2272555627-1.jpg' },
    { Src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5QCE-l252IQGvagovcPrrPiPcFOtO51yIQ&s' },
    { Src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeVLYRtRxRLEPDL5Tp7xpwsJInKkCob-M_w&s' },
    { Src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTioS4l91lC6RuORbgmjMk3_MS3cIi7DA7tcw&s' },
    { Src: 'https://www.funpawcare.com/wp-content/uploads/2020/01/Golden-Retriever-Dog-Training-1-1.jpg' },
    { Src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTnsI8B1k8CsUeDAvDRXo6q5f-EvThayrcYA&s' },
];
Model.UpdateStore('SomeApi', Images);
DtvlPv.AddPv_ImageFlex('DynamicImageFlex', {
    ItemSrc: `Src`,
    ApiKey: 'SomeApi'
});
//# sourceMappingURL=ImageFlex.js.map