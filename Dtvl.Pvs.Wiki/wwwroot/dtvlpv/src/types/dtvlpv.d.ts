import { PathType, ApiCallback } from '@rugal.tu/vuemodel3';
import { WatchCallback, WatchHandle } from 'vue';
type SidebarItemSet = {
    title: string;
    icon?: string;
    children?: SidebarItemSet[];
    href?: string | string[];
    backToRoot?: boolean;
    show?: () => boolean;
    clicked?: Function;
};
type SidebarOption = {
    OpenMode?: 'current' | 'all' | 'single';
};
type SidebarItemData = SidebarItemSet & {
    id: string;
    parent?: SidebarItemData;
    children?: SidebarItemData[];
    isSelect?: boolean;
    query?: string | Record<string, any>;
};
type SidebarStore = {
    IsMobileOpen: boolean;
    IsShow: boolean;
    Source: SidebarItemData[];
    Current: SidebarItemData[];
    RouterList: SidebarItemData[];
    OpenIds: string[];
    Click: (Item: SidebarItemData, event: MouseEvent) => void;
    GroupClick: Function;
    MobileOpen: () => void;
    Show: (IsShow: boolean) => void;
} & SidebarOption;
type DataTableHeader = {
    title?: string;
    align?: string | {
        header?: string;
        content?: string;
    };
    sortable?: boolean;
    key?: string;
    value?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    show?: boolean;
    nowrap?: boolean;
};
type DataTableOption = {
    Index?: boolean | DataTableIndexOption;
    Buttons?: boolean | DataTableHeader;
    Headers: DataTableHeader[];
    Datas?: any[];
    ApiKey?: string;
    Stripe?: boolean;
    Select?: {
        ItemValue: string;
        Store?: string;
        Mode?: 'single' | 'page' | 'all';
        ReturnObject?: boolean;
        RowClicked?: boolean;
        ShowCheckbox?: boolean;
        RowClass?: string;
    };
    Search?: boolean | string | {
        Store?: string;
        Query?: string;
    };
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total';
    path?: string;
};
type DataTableStore = DataTableOption & {
    Index?: DataTableIndexOption;
    Buttons?: DataTableHeader;
    Selected: any[];
    Selectable?: boolean;
    Loading?: boolean;
    LoadingTime?: Date;
    IsSort?: Function;
    IsItemSelected?: Function;
    SelectItem?: Function;
    RowSelectClicked?: Function;
};
type ModalOption = {
    IsShow?: boolean;
    Overlay?: {
        Clicked?: Function;
        IsClickedClose?: boolean;
    };
};
type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
type SendModalStore = SendModalOption & CallingLockType;
type CallingLockType = {
    IsCalling?: boolean;
};
type AlertOption = {
    IsShow?: boolean;
    Message?: string;
    ApiKey?: string;
    BtnOk?: Function;
    BtnCancel?: Function;
} & ApiCallback;
type AlertStore = AlertOption & CallingLockType;
type FilterCardOption = {
    ApiKey?: string;
    BtnClear?: () => void;
    BtnSearch?: () => void;
};
type ForItemsOption = {
    Store?: PathType | {
        Path: PathType;
        Items?: PathType | boolean | {
            Source?: PathType;
        };
    };
};
type ForItemsValueOption = {
    OnItemSetValue?: (value: any) => void;
};
type ForItemsValueMethod = {
    GetValue: () => any;
    SetValue: (value: any) => void;
};
type ForItemsMapSet = {
    Watcher?: WatchHandle;
};
type ForItemsStore = ForItemsOption & {
    Store: {
        Path: PathType;
        Items?: {
            Source?: PathType;
        };
    };
    ItemsSource?: any[];
    ItemsMap?: Record<string, ForItemsMapSet>;
    OnItemsMounted?: (ValueMethod: ForItemsValueMethod, el: HTMLElement) => void;
    OnItemsUnMounted?: (el: HTMLElement) => void;
};
type FormatConvertType<TOption = any> = (Value: any, Option: TOption) => any;
type FormatFuncType<TOption = any> = {
    Option?: TOption;
    Convert: FormatConvertType;
};
type FormatBuilderType<TOption = any> = (Option?: TOption) => FormatFuncType<TOption>;
type DateFormatOption = {
    Separator?: string;
    YearCount?: number;
    MonthCount?: number;
    DayCount?: number;
};
type NumberFormatOption = {
    ThousandsSeparator?: boolean;
    Negative?: boolean;
    DecimalPoint?: number;
    MaxLength?: number;
};
type FormatStore = Record<string, FormatBuilderType> & {
    AdDate?: FormatBuilderType<DateFormatOption>;
    TwDate?: FormatBuilderType<DateFormatOption>;
    Number?: FormatBuilderType<NumberFormatOption>;
};
type DefaultFormatsType = {
    AdDate: string;
    TwDate: string;
    Number: string;
};
type SecureOption = boolean | {
    SecureEye?: boolean;
    ShowingIcon?: string;
    HidingIcon?: string;
};
type InputModeType = 'text' | 'numeric';
type InputOption = PathType | (ForItemsOption & {
    Value?: any;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    Secure?: SecureOption;
    InputMode?: InputModeType;
    Formats?: FormatFuncType[] | {
        Option?: any;
        Convert?: FormatConvertType;
        Shared?: FormatFuncType | FormatFuncType[];
        Value?: FormatFuncType | FormatFuncType[];
        Display?: FormatFuncType | FormatFuncType[];
    };
});
type InputStore = ForItemsStore & {
    Value?: any;
    DisplayValue?: any;
    ModelValue?: any;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    Secure?: {
        Securing: boolean;
    } & SecureOption;
    InputMode?: InputModeType;
    Formats: {
        Shared: FormatFuncType[];
        Value: FormatFuncType[];
        Display: FormatFuncType[];
    };
    OnFormatShared: Function;
    OnFormatDisplay: Function;
    OnFormatValue: Function;
    GetItemsModelValue?: Function;
};
type SelectOption = PathType | (ForItemsOption & {
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string | Function;
    ItemValue?: string;
    SelectedValue?: any;
    ReturnObject?: boolean;
    Multiple?: boolean;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    OnChange?: Function | string;
});
type SelectQueryOption = {
    Source: 'item' | 'value';
    Target: 'item' | 'value';
};
type SelectStore = ForItemsStore & {
    IsInited: boolean;
    Loading?: boolean;
    LoadingTime?: Date;
    SelectedValue?: any;
    SelectedItem?: any;
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string | Function;
    ItemValue?: string;
    ReturnObject?: boolean;
    Multiple?: boolean;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    OnChange?: Function | string;
    QueryItem?: (Value: any, Option: SelectQueryOption) => any;
};
type DatePickerOption = PathType | ForItemsOption & {
    IsOpen?: boolean;
    Value?: any;
};
type DatePickerStore = ForItemsStore & {
    IsOpen?: boolean;
    Value?: any;
    Date?: Date;
};
type TabbedOption = {
    Tabs: TabsOption[];
};
type TabsOption = {
    Id?: string;
    Title: string;
};
type FlexOption = {
    ApiKey?: PathType;
    Datas?: any[];
};
type ImageFlexOption = {
    ApiKey?: PathType;
    Datas?: any[];
    ItemSrc: string;
};
type ImageOption = {
    SrcUrl?: string;
    LazySrcUrl?: string;
    Src?: string;
    LazySrc?: string;
    Viewer?: PathType | {
        Path: PathType;
        Mode?: ImageViewerMode;
    };
};
type ImageStore = {
    Src?: string;
    LazySrc?: string;
    Clicked?: Function;
    Viewer?: {
        Path: PathType;
        Mode?: ImageViewerMode;
    };
};
type ImageViewerMode = 'single' | 'album';
type ImageViewerValue = {
    Src?: string;
    LazySrc?: string;
};
type ImageViewerOption = {
    Store?: PathType;
    IsShow?: boolean;
    Mode?: ImageViewerMode;
    HasCounter?: boolean;
    HasSideTool?: boolean;
    HasRotator?: boolean;
    BtnCloseClicked?: Function;
    Overlay?: {
        Clicked?: Function;
        IsClickedClose?: boolean;
    };
    Datas?: string | string[] | ImageViewerValue | ImageViewerValue[];
    Index?: number;
};
type ImageViewerStore = ImageViewerOption & ImageViewerValue & {
    Datas?: ImageViewerValue[];
    CurrentCount?: number;
    TotalCount?: number;
};
type ImageViewerSet = {
    IsShow?: boolean;
    Datas?: string | string[] | ImageViewerValue | ImageViewerValue[];
    Index?: number;
    Mode?: ImageViewerMode;
};
type PushAnimateOption = {
    PositionFrom: 'Left' | 'Right';
};
declare class DtvlPvIniter {
    protected $LoadingDelay: number;
    protected $AppStore: string;
    protected $PvStore: string;
    protected $ApiStore: string;
    protected $FormatStore: string;
    protected $FormatKeys: DefaultFormatsType;
    constructor();
    get Formats(): FormatStore;
    get RouterStore(): SidebarStore;
    get RouterPaths(): SidebarItemData[];
    get Router(): SidebarItemData;
    UseShowOnMounted(): this;
    Pv<TStore = any>(PvName: PathType): TStore;
    protected $CreateDefaultFormat(): void;
    protected $CreateAdDateFormat(): void;
    protected $CreateTwDateFormat(): void;
    protected $CreateNumberFormat(): void;
    UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $InitSidebar;
    private $CreateSidebar;
    GetSidebar(PvName: PathType): SidebarStore;
    AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $SetSidebarTreeCommand;
    GetDataTable(PvName: PathType): DataTableStore;
    AddPv_DataTable(PvName: PathType, Option: DataTableOption): this;
    private $FillDataTableHeaders;
    private $BuildDefaultDataTable;
    AddPv_Modal(PvName: PathType, Option?: ModalOption): this;
    AddPv_SendModal(PvName: PathType, Option?: SendModalOption): this;
    Modal(PvName: PathType, Option: boolean | SendModalStore): this;
    GetModal(PvName: PathType): ModalOption;
    GetSendModal(PvName: PathType): SendModalStore;
    AddPv_Alert(PvName: PathType, Option?: AlertOption): this;
    Alert(PvName: PathType, Option: boolean | AlertStore): this;
    GetAlert(PvName: PathType): AlertStore;
    AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption): this;
    protected CreateForItemsStore(PvName: PathType, Option?: ForItemsOption, ValueOption?: ForItemsValueOption): ForItemsStore;
    GetInput(PvName: PathType): InputStore;
    GetSelect(PvName: PathType): SelectStore;
    AddPv_Input(PvName: PathType, Option?: InputOption): this;
    AddPv_Select(PvName: PathType, Option?: SelectOption): this;
    AddPv_Format<TOption = any>(FormatKey: string, FormatFunc: FormatBuilderType<TOption>): this;
    CreateDateFormat(Option: DateFormatOption): FormatBuilderType<any>;
    CreateFormat<TOption = any>(Convert: FormatConvertType<TOption>, DefaultOption?: TOption): FormatBuilderType<any>;
    GetFormat(FormatKey: string): FormatBuilderType<any>;
    GetDatePicker(PvName: PathType): DatePickerStore;
    AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption): this;
    AddPv_Tabbed(PvName: PathType, Option?: TabbedOption): this;
    AddPv_Flex(PvName: PathType, Option: FlexOption): this;
    AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption): this;
    GetImage(PvName: PathType): ImageStore;
    GetImageViewer(PvName: PathType): ImageViewerStore;
    AddPv_Image(PvName: PathType, Option: ImageOption): this;
    AddPv_ImageViewer(PvName: PathType, Option?: ImageViewerOption): this;
    ImageViewer(PvName: PathType, Option?: ImageViewerSet | boolean): this;
    protected $ParseImageViwerDatas(Datas?: string | string[] | ImageViewerValue | ImageViewerValue[]): ImageViewerValue[];
    AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption): void;
    Animate(PvName: PathType): void;
    protected PvPath(...PushPath: PathType[]): string;
    protected ApiPath(...PushPath: PathType[]): string[];
    WatchApi(ApiKey: PathType, Status: string, Func: WatchCallback): void;
}
declare const DtvlPv: DtvlPvIniter;
declare const Formats: FormatStore;
export { DtvlPv, Formats, };
