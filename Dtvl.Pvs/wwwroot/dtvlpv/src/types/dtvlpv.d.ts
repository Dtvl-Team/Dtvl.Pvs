import { PathType, ApiCallback } from '@rugal.tu/vuemodel3';
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
    align?: string;
    sortable?: boolean;
    key?: string;
    value?: string;
    width?: string;
};
type DataTableOption = {
    Index?: boolean | DataTableIndexOption;
    Buttons?: boolean | DataTableHeader;
    Headers: DataTableHeader[];
    Datas?: any[];
    ApiKey?: string;
    Select?: {
        ItemValue: string;
        Store?: string;
        ReturnObject?: boolean;
        Mode?: 'single' | 'page' | 'all';
        RowClicked?: boolean;
    };
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total';
};
type ModalOption = {
    IsShow?: boolean;
};
type CallingLockType = {
    IsCalling?: boolean;
};
type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
type SendModalStore = SendModalOption & CallingLockType;
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
type SecureOption = boolean | {
    SecureEye?: boolean;
    ShowingIcon?: string;
    HidingIcon?: string;
};
type InputOption = {
    Value?: any;
    Store?: PathType | {
        Path: PathType;
        IsItem?: boolean;
    };
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    Secure?: SecureOption;
    Number?: boolean | InputNumberOption;
    Formats?: {
        Value?: FormateFuncType | FormateFuncType[];
        Display?: FormateFuncType | FormateFuncType[];
    } | FormateFuncType | FormateFuncType[];
} | string;
type InputStore = {
    Store: {
        Path: PathType;
        IsItem?: boolean;
    };
    Value?: any;
    ReadOnly?: boolean | ((Store?: InputStore) => boolean);
    Secure?: {
        Securing: boolean;
    } & SecureOption;
    Number?: InputNumberOption;
    Formats: {
        Value: FormateFuncType[];
        Display: FormateFuncType[];
    };
    OnFormatDisplay: Function;
    OnFormatValue: Function;
};
type InputNumberOption = {
    ThousandsSeparator?: boolean;
};
type FormateFuncType = (Value: string) => string;
type DateFormatOption = {
    Separator: string;
    YearCount?: number;
    MonthCount?: number;
    DayCount?: number;
};
type FormatStore = {
    AdDate: FormateFuncType;
    TwDate: FormateFuncType;
    Number: FormateFuncType;
    NumberThousands: FormateFuncType;
} | Record<string, FormateFuncType>;
type DefaultFormatsType = {
    AdDate: string;
    TwDate: string;
    Number: string;
    NumberThousands: string;
};
type SelectOption = {
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string | Function;
    ItemValue?: string;
    Store?: PathType;
    ReturnObject?: boolean;
    SelectedValue?: any;
    Multiple?: boolean;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    BindOnly?: boolean;
    OnChange?: Function | string;
};
type DatePickerOption = {
    Store?: PathType;
    IsOpen?: boolean;
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
    protected $CreateDefaultFormat(): void;
    protected $CreateAdDateFormat(): void;
    protected $CreateTwDateFormat(): void;
    protected $CreateNumberFormat(): void;
    protected $CreateNumberThousandsFormat(): void;
    UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $InitSidebar;
    private $CreateSidebar;
    AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $SetSidebarTreeCommand;
    AddPv_DataTable(PvName: PathType, Option: DataTableOption): this;
    private $FillDataTableHeaders;
    AddPv_Modal(PvName: PathType, Option?: ModalOption): this;
    AddPv_SendModal(PvName: PathType, Option?: SendModalOption): this;
    Modal(PvName: PathType, Option: boolean | SendModalStore): this;
    AddPv_Alert(PvName: PathType, Option?: AlertOption): this;
    Alert(PvName: PathType, Option: boolean | AlertStore): this;
    AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption): this;
    AddPv_Input(PvName: PathType, Option?: InputOption): this;
    AddPv_Select(PvName: PathType, Option?: SelectOption): this;
    AddPv_Format(FormatKey: string, FormatFunc: FormateFuncType): this;
    CreateDateFormat(Option: DateFormatOption): FormateFuncType;
    GetFormat(FormatKey: string): FormateFuncType;
    AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption): this;
    AddPv_Tabbed(PvName: PathType, Option?: TabbedOption): this;
    AddPv_Flex(PvName: PathType, Option: FlexOption): this;
    AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption): this;
    AddPv_Image(PvName: PathType, Option: ImageOption): this;
    AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption): void;
    Animate(PvName: PathType): void;
    protected RootPath(...PushPath: PathType[]): string[];
    protected ApiPath(...PushPath: PathType[]): string[];
    WatchApi(ApiKey: PathType, Status: string, Func: Function): void;
}
declare const DtvlPv: DtvlPvIniter;
declare const Formats: FormatStore;
export { DtvlPv, Formats, };
