import { Model, Queryer, PathType, ApiCallback } from '@rugal.tu/vuemodel3';
import { computed, WatchCallback, WatchHandle } from 'vue';
//#region Router Type
type SidebarItemSet = {
    title: string,
    icon?: string,
    children?: SidebarItemSet[],
    href?: string | string[],
    backToRoot?: boolean,
    show?: () => boolean,
    clicked?: Function,
};
type SidebarOption = {
    OpenMode?: 'current' | 'all' | 'single',
};
type SidebarItemData = SidebarItemSet & {
    id: string,
    parent?: SidebarItemData,
    children?: SidebarItemData[],
    isSelect?: boolean,
    query?: string | Record<string, any>,
}
type SidebarStore = {
    IsMobileOpen: boolean,
    IsShow: boolean,
    Source: SidebarItemData[],
    Current: SidebarItemData[],
    RouterList: SidebarItemData[],
    OpenIds: string[],
    Click: (Item: SidebarItemData, event: MouseEvent) => void,
    GroupClick: Function,
    MobileOpen: () => void,
    Show: (IsShow: boolean) => void,
} & SidebarOption;
//#endregion

//#region DataTable Type
type DataTableHeader = {
    title?: string,
    align?: string | {
        header?: string,
        content?: string,
    },
    sortable?: boolean,
    key?: string,
    value?: string,
    width?: string,
    minWidth?: string,
    maxWidth?: string,
    show?: boolean,
    nowrap?: boolean,
};
type DataTableOption = {
    Index?: boolean | DataTableIndexOption,
    Buttons?: boolean | DataTableHeader,
    Headers: DataTableHeader[],
    Datas?: any[],
    ApiKey?: string,
    Stripe?: boolean,
    Select?: {
        ItemValue: string,
        Store?: string,
        Mode?: 'single' | 'page' | 'all'
        ReturnObject?: boolean,
        RowClicked?: boolean,
        ShowCheckbox?: boolean,
        RowClass?: string,
    },
    Search?: boolean | string | {
        Store?: string,
        Query?: string,
    },
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total',
    path?: string,
};
type DataTableStore = DataTableOption & {
    Index?: DataTableIndexOption,
    Buttons?: DataTableHeader,
    Selected: any[],
    Selectable?: boolean,
    Loading?: boolean,
    LoadingTime?: Date,
    IsSort?: Function,
    IsItemSelected?: Function,
    SelectItem?: Function,
    RowSelectClicked?: Function,
};
//#endregion

//#region Tree Type
type TreeOption = {
    openAll?: boolean,
    title: string,
    subTitle?: string,
    children?: string,
    icon?: string,
    datas: any[],
};
type TreeStore = {
    Option: TreeOption,
    Datas: any[],
};
//#endregion

//#region Modal Type
type ModalOption = {
    IsShow?: boolean,
    Overlay?: {
        Clicked?: Function,
        IsClickedClose?: boolean,
    },
};
type ModalStore = ModalOption;
type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
type SendModalStore = SendModalOption & CallingLockType;
type CallingLockType = {
    IsCalling?: boolean,
};
//#endregion

//#region Alert Type
type AlertOption = {
    IsShow?: boolean,
    Message?: string,
    ApiKey?: string;
    BtnOk?: Function,
    BtnCancel?: Function,
} & ApiCallback;
type AlertStore = AlertOption & CallingLockType;
//#endregion

//#region FilterCard Type
type FilterCardOption = {
    ApiKey?: string,
    BtnClear?: () => void,
    BtnSearch?: () => void,
};
type FilterCardStore = FilterCardOption;
//#endregion

//#region For Items Type
type ForItemsOption = {
    Store?: PathType | {
        Path: PathType,
        Items?: PathType | boolean | {
            Source?: PathType,
        },
    },
};
type ForItemsValueOption = {
    //OnItemGetValue?: () => any,
    OnItemSetValue?: (value: any) => void,
};
type ForItemsValueMethod = {
    GetValue: () => any,
    SetValue: (value: any) => void,
};
type ForItemsMapSet = {
    Watcher?: WatchHandle,
};
type ForItemsStore = ForItemsOption & {
    Store: {
        Path: PathType,
        Items?: {
            Source?: PathType,
        },
    },
    ItemsSource?: any[],
    ItemsMap?: Record<string, ForItemsMapSet>,
    OnItemsMounted?: (ValueMethod: ForItemsValueMethod, el: HTMLElement) => void,
    OnItemsUnMounted?: (el: HTMLElement) => void,
};
//#endregion

//#region Format Type
type FormatConvertType<TOption = any> = (Value: any, Option: TOption) => any;
type FormatFuncType<TOption = any> = {
    Option?: TOption,
    Convert: FormatConvertType,
};
type FormatBuilderType<TOption = any> = (Option?: TOption) => FormatFuncType<TOption>;

type DateFormatOption = {
    Separator?: string,
    YearCount?: number,
    MonthCount?: number,
    DayCount?: number,
};
type NumberFormatOption = {
    ThousandsSeparator?: boolean,
    Negative?: boolean,
    DecimalPoint?: number,
    MaxLength?: number,
};
type FormatStore = Record<string, FormatBuilderType> & {
    AdDate?: FormatBuilderType<DateFormatOption>;
    TwDate?: FormatBuilderType<DateFormatOption>;
    Number?: FormatBuilderType<NumberFormatOption>;
};
type DefaultFormatsType = {
    AdDate: string,
    TwDate: string,
    Number: string,
};
//#endregion

//#region Input Type
type SecureOption = boolean | {
    SecureEye?: boolean,
    ShowingIcon?: string,
    HidingIcon?: string,
};
type InputModeType = 'text' | 'numeric';
type InputOption = PathType | ForItemsOption & {
    Value?: any,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    Secure?: SecureOption,
    InputMode?: InputModeType,
    Formats?: FormatFuncType[] | {
        Option?: any,
        Convert?: FormatConvertType,
        Shared?: FormatFuncType | FormatFuncType[],
        Value?: FormatFuncType | FormatFuncType[],
        Display?: FormatFuncType | FormatFuncType[],
    },
};
type InputStore = ForItemsStore & {
    Value?: any,
    DisplayValue?: any,
    ModelValue?: any,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    Secure?: {
        Securing: boolean,
    } & SecureOption,
    InputMode?: InputModeType,
    Formats: {
        Shared: FormatFuncType[],
        Value: FormatFuncType[],
        Display: FormatFuncType[],
    },
    OnFormatShared: Function,
    OnFormatDisplay: Function,
    OnFormatValue: Function,
    GetItemsModelValue?: Function,
};
//#endregion

//#region Select Type
type SelectOption = PathType | ForItemsOption & {
    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string | Function,
    ItemValue?: string,
    SelectedValue?: any,
    ReturnObject?: boolean,
    Multiple?: boolean,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    OnChange?: Function | string,
};
type SelectQueryOption = {
    Source: 'item' | 'value',
    Target: 'item' | 'value',
};
type SelectStore = ForItemsStore & {
    IsInited: boolean,
    Loading?: boolean,
    LoadingTime?: Date,
    SelectedValue?: any,
    SelectedItem?: any,

    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string | Function,
    ItemValue?: string,
    ReturnObject?: boolean,
    Multiple?: boolean,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    OnChange?: Function | string,
    QueryItem?: (Value: any, Option: SelectQueryOption) => any,
};
//#endregion

//#region DatePicker Type
type DatePickerOption = PathType | ForItemsOption & {
    IsOpen?: boolean,
    Value?: any,
};
type DatePickerStore = ForItemsStore & {
    IsOpen?: boolean,
    Value?: any,
    Date?: Date,
};
//#endregion

//#region Tabbed Type
type TabbedOption = {
    Tabs: TabsOption[],
};
type TabsOption = {
    Id?: string,
    Title: string,
}
//#endregion

//#region Flex Type
type FlexOption = {
    ApiKey?: PathType,
    Datas?: any[],
};
type FlexStore = {

} & FlexOption;
//#endregion

//#region ImageFilex Type
type ImageFlexOption = {
    ApiKey?: PathType,
    Datas?: any[],
    ItemSrc: string,
};
type ImageFlexStore = {} & FlexOption;
//#endregion

//#region Image Type
type ImageOption = {
    SrcUrl?: string,
    LazySrcUrl?: string,
    Src?: string,
    LazySrc?: string,
    Viewer?: PathType | {
        Path: PathType,
        Mode?: ImageViewerMode,
    },
};
type ImageStore = {
    Src?: string,
    LazySrc?: string,
    Clicked?: Function,
    Viewer?: {
        Path: PathType,
        Mode?: ImageViewerMode,
    },
}
type ImageViewerMode = 'single' | 'album';
type ImageViewerValue = {
    Src?: string,
    LazySrc?: string,
};
type ImageViewerOption = {
    Store?: PathType,
    IsShow?: boolean,
    Mode?: ImageViewerMode,
    HasCounter?: boolean,
    HasSideTool?: boolean,
    HasRotator?: boolean,
    BtnCloseClicked?: Function,
    Overlay?: {
        Clicked?: Function,
        IsClickedClose?: boolean,
    },
    Datas?: string | string[] | ImageViewerValue | ImageViewerValue[],
    Index?: number,
};
type ImageViewerStore = ImageViewerOption & ImageViewerValue & {
    Datas?: ImageViewerValue[],
    CurrentCount?: number,
    TotalCount?: number,
};
type ImageViewerSet = {
    IsShow?: boolean,
    Datas?: string | string[] | ImageViewerValue | ImageViewerValue[],
    Index?: number,
    Mode?: ImageViewerMode,
};
//#endregion

//#region Animation
type PushAnimateOption = {
    PositionFrom: 'Left' | 'Right',
};
type AnimateStore = {
    IsRun: boolean,
    Width?: number,
    Height?: number,
};
//#endregion
class DtvlPvIniter {
    protected $LoadingDelay: number;
    protected $AppStore: string;
    protected $PvStore: string;
    protected $ApiStore: string;
    protected $FormatStore: string;
    protected $FormatKeys: DefaultFormatsType;
    constructor() {
        this.$LoadingDelay = 800;
        this.$AppStore = 'app';
        this.$ApiStore = 'api';
        this.$PvStore = 'pv';
        this.$FormatStore = 'pv._format';

        this.UseShowOnMounted();
        this.$CreateDefaultFormat();
    }

    //#region public Property 
    public get Formats() {
        return Model.GetStore<FormatStore>(this.$FormatStore);
    }
    public get RouterStore() {
        return Model.GetStore<SidebarStore>([this.$AppStore, 'Router']);
    }
    public get RouterPaths() {
        let Current = this.RouterStore?.Current;
        return Current;
    }
    public get Router() {
        let Paths = this.RouterPaths;
        if (Paths == null && Paths.length == 0)
            return null;

        return Paths[Paths.length - 1];
    }
    //#endregion

    //#region App
    public UseShowOnMounted() {
        Model.WithMounted(() => {
            let ShowItems = document.querySelectorAll('[class*="ShowOnMounted"]');
            for (let Item of ShowItems) {
                Item.classList.remove('ShowOnMounted');
            }
        });
        return this;
    }
    public Pv<TStore = any>(PvName: PathType) {
        return Model.GetStore<TStore>(['pv', PvName]);
    }
    protected $CreateDefaultFormat() {
        this.$FormatKeys = {
            AdDate: 'AdDate',
            TwDate: 'TwDate',
            Number: 'Number',
        };

        Model.AddStore(this.$FormatStore, {});
        this.$CreateAdDateFormat();
        this.$CreateTwDateFormat();
        this.$CreateNumberFormat();
    }
    protected $CreateAdDateFormat() {
        this.AddPv_Format(this.$FormatKeys.AdDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 4,
        }));
    }
    protected $CreateTwDateFormat() {
        this.AddPv_Format(this.$FormatKeys.TwDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 3,
        }));
    }
    protected $CreateNumberFormat() {
        this.AddPv_Format<NumberFormatOption>(this.$FormatKeys.Number, this.CreateFormat<NumberFormatOption>((Value, Option) => {
            if (Value == null || Value == '')
                return Value;

            Option.DecimalPoint ??= 0;

            let ReplaceExps = ['\\d'];
            if (Option.Negative == true)
                ReplaceExps.push('\\-');
            if (Option.DecimalPoint > 0)
                ReplaceExps.push('\\.');

            let ReplaceExp = ReplaceExps.join('');
            Value = Value.toString().replace(new RegExp(`[^${ReplaceExp}]`, 'g'), '');
            Value = Value.replace(/(?!^)-/g, '');
            if (Value != null && Value != '') {
                if (Option?.ThousandsSeparator == true && Value != '-') {
                    if (Option.DecimalPoint > 0 && Value.includes('.')) {
                        let Values = Value.split('.');
                        let HeadValue = Values[0];
                        let TailValue = Values[1].slice(0, Option.DecimalPoint);
                        Value = Number(HeadValue).toLocaleString() + `.${TailValue}`;
                    }
                    else
                        Value = Number(Value).toLocaleString();
                }
            }

            if (Option.MaxLength != null) {
                if (typeof Option.MaxLength === 'number')
                    Value = Value.slice(0, Option.MaxLength);
            }
            return Value;
        }));
    }
    //#endregion

    //#region Sidebar Method
    public UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = [this.$AppStore, 'Router'];
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $InitSidebar(PvName: PathType, StorePath: PathType, RouterData: SidebarItemSet[], Option: SidebarOption) {
        Option ??= {};
        Option.OpenMode ??= 'current';

        let RouterList: SidebarItemData[] = [];
        let RouterDatas = this.$CreateSidebar(RouterData, RouterList);

        let CurrentPath = document.location.pathname;
        let FindCurrentRouter = RouterList.find(Item => {
            if (Item.href == null)
                return false;

            if (typeof (Item.href) == 'string')
                return Item.href.toLowerCase() == CurrentPath.toLowerCase();

            let GetHref = Item.href.find(Val => Val.toLowerCase() == CurrentPath.toLowerCase());
            return GetHref != null;
        });

        let CurrentRouters: SidebarItemData[] = [];
        if (FindCurrentRouter != null) {
            if (FindCurrentRouter != null) {
                while (FindCurrentRouter) {
                    CurrentRouters.push(FindCurrentRouter);
                    FindCurrentRouter = FindCurrentRouter.parent;
                }
                CurrentRouters = CurrentRouters.reverse();
            }
            CurrentRouters.forEach(Item => Item.isSelect = true);
        }

        let OpenRotuer = CurrentRouters;
        if (Option.OpenMode == 'all')
            OpenRotuer = RouterList;

        let RouterStoreData: SidebarStore = {
            OpenMode: Option.OpenMode,
            IsMobileOpen: false,
            IsShow: true,
            Source: RouterDatas,
            Current: CurrentRouters,
            RouterList: RouterList,
            OpenIds: OpenRotuer.map(Item => Item.id),
            Click: (Item, event) => {
                if (Item == null)
                    return;

                if (Item.backToRoot == true) {
                    Model.NavigateToRoot();
                    return;
                }

                let GoPath = Item.href;
                if (GoPath == null)
                    return;

                if (Array.isArray(GoPath) && GoPath.length > 0)
                    GoPath = GoPath[0];

                let HasCtrlKey = event.ctrlKey;
                if (HasCtrlKey) {
                    Model.NavigateBlank(GoPath);
                    return;
                }

                if (GoPath == CurrentPath)
                    return;

                Model.NavigateTo(GoPath);
            },
            GroupClick: (Item: any) => {
                let RouterStore = Model.GetStore<SidebarStore>([this.$AppStore, 'Router']);
                if (RouterStore == null)
                    return;

                if (RouterStore.OpenMode != 'single')
                    return;

                if (Item == null || Item.value == false)
                    return;

                RouterStore.OpenIds.splice(0, RouterStore.OpenIds.length);
            },
            MobileOpen: () => {
                let TargetPaths = [StorePath, 'IsMobileOpen'];
                let IsSidebarOpen = Model.GetStore<boolean>(TargetPaths);
                IsSidebarOpen = !IsSidebarOpen;
                Model.UpdateStore(TargetPaths, IsSidebarOpen);
            },
            Show: (IsShow) => {
                RouterStoreData.IsShow = IsShow;
                Model.ForceUpdate();
            }
        };
        Model.UpdateStore(StorePath, RouterStoreData);
        this.$SetSidebarTreeCommand(PvName, Model.ToJoin(StorePath));
    }
    private $CreateSidebar(Data: SidebarItemSet[], RouterList: SidebarItemData[], Parent: SidebarItemData = null): SidebarItemData[] {
        if (Data == null || Data.length == 0)
            return null;

        let Result: SidebarItemData[] = [];
        for (let Item of Data) {
            let NewRouter: SidebarItemData = {
                ...Item,
                id: Model.GenerateId(),
                parent: Parent,
                children: null,
            };
            NewRouter.show ??= () => true;
            NewRouter.children = this.$CreateSidebar(Item.children, RouterList, NewRouter);
            RouterList.push(NewRouter);
            Result.push(NewRouter);
        }
        return Result;
    }

    public GetSidebar(PvName: PathType) {
        return this.Pv<SidebarStore>(PvName);
    }
    public AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = this.PvPath(PvName);
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $SetSidebarTreeCommand(PvName: PathType, StorePath: string) {

        Model.AddV_Bind(PvName, 'class', `[ ${StorePath}.IsShow ? 'Sidebar-Show' : 'Sidebar-Hide' ]`,);

        let SidebarTreePath = [PvName, 'SidebarTree'];
        let ItemBaseCommand = {
            'v-on:click': `${StorePath}.Click(item, $event)`,
            'v-bind:value': 'item.id',
            'v-bind:title': 'item.title',
            ':ItemIcon': {
                'v-if': 'item.icon',
                'v-bind:class': 'item.icon',
            }
        };
        Model.AddV_Tree(SidebarTreePath, {
            'v-bind:items': `${StorePath}?.Source ?? []`,
            'v-on:update:activated': `${StorePath}?.Click`,
            'v-on:click:open': `${StorePath}?.GroupClick`,
            'v-model:opened': `${StorePath}.OpenIds`,
            ':SidebarContent': {
                'v-for': `${StorePath}?.Source ?? []`,
            },
            ':SidebarGroup': {
                'v-if': 'item.children && item.children.length > 0 && item.children.every(val => val.show && val.show())',
                'v-bind:value': 'item.id',
                ':SidebarGroupItem': {
                    ...ItemBaseCommand,
                },
                ':GroupChildren': {
                    'v-for': 'item.children',
                    ':ChildrenItem': {
                        'v-if': 'item.show()',
                        'v-bind:class': '{ SidebarSelect: item.isSelect }',
                        ...ItemBaseCommand,
                    },
                }
            },
            ':SingleGroup': {
                'v-else': null,
                'v-bind:class': '{ SidebarSelect: item.isSelect }',
                ...ItemBaseCommand,
            },
        }, { UseDeepQuery: true });
    }
    //#endregion

    //#region DataTable
    public GetDataTable(PvName: PathType) {
        return this.Pv<DataTableStore>(PvName);
    }
    public AddPv_DataTable(PvName: PathType, Option: DataTableOption) {

        let PvStorePath = Model.ToJoin(this.PvPath(PvName));
        let PvStore: DataTableStore = {
            ...Option,
            Selected: [],
        };
        Model.UpdateStore(PvStorePath, PvStore);
        PvStore.Buttons ??= {};
        PvStore.Datas ??= [];
        PvStore.Stripe ??= true;
        PvStore.Loading ??= false;
        PvStore.Index ??= true;

        if (PvStore.Buttons != null && PvStore.Buttons != false) {
            if (PvStore.Buttons == true) {
                PvStore.Buttons = {};
            }
            PvStore.Buttons.title ??= '';
            PvStore.Buttons.value ??= 'buttons';
            PvStore.Buttons.sortable ??= false;
            PvStore.Headers.push(PvStore.Buttons);
        }
        if (PvStore.ApiKey) {
            Model.AddV_Property(PvStore.ApiKey, {
                Target: [PvStorePath, 'Datas'],
            });

            this.WatchApi(PvStore.ApiKey, 'IsCalling', (Value: boolean) => {
                let Store = Model.GetStore<DataTableStore>(PvStorePath);
                if (Value == true) {
                    Store.Loading = Value;
                    Store.LoadingTime = new Date();
                }
                else {
                    let TimeDiff = 0;
                    if (Store.LoadingTime != null)
                        TimeDiff = new Date().getTime() - Store.LoadingTime.getTime();

                    if (TimeDiff >= this.$LoadingDelay)
                        Store.Loading = false;
                    else {
                        setTimeout(() => {
                            Store.Loading = false;
                        }, this.$LoadingDelay - TimeDiff);
                    }
                }
            });
        }
        if (PvStore.Index != null && PvStore.Index != false) {
            if (PvStore.Index == true) {
                PvStore.Index = {
                    type: 'Total',
                };
            }
            PvStore.Index.type ??= 'Total';
            PvStore.Index.title ??= '#';
            PvStore.Index.value ??= 'index';
            PvStore.Index.key ??= 'index';
            PvStore.Index.align ??= 'center';
            PvStore.Index.sortable = false;
            PvStore.Index.nowrap = true;
            switch (PvStore.Index.type) {
                case 'Page':
                    PvStore.Index.path = 'props.index + 1';
                    break;
                case 'Total':
                    PvStore.Index.path = 'props.internalItem.index + 1';
                    break;
            }
            PvStore.Headers.unshift(PvStore.Index);
        }
        if (PvStore.Select) {
            PvStore.Selectable = true;
            PvStore.Select.ReturnObject ??= true;
            PvStore.Select.Mode ??= 'all';
            PvStore.Select.RowClicked ??= true;
            PvStore.Select.ShowCheckbox ??= true;

            PvStore.IsItemSelected = (item: any) => {
                if (!PvStore.Select.ReturnObject)
                    item = item[PvStore.Select.ItemValue];
                let IsSelected = PvStore.Selected.includes(item);
                return IsSelected;
            };
            PvStore.SelectItem = (item: any) => {
                if (!PvStore.Select.ReturnObject)
                    item = item[PvStore.Select.ItemValue];

                let IsSelected = PvStore.Selected.includes(item);
                if (IsSelected) {
                    let SelectedIndex = PvStore.Selected.indexOf(item);
                    PvStore.Selected.splice(SelectedIndex, 1);
                }
                else
                    PvStore.Selected.push(item);
            };
            PvStore.RowSelectClicked = (event: Event, toggle: Function, item: any) => {
                let Target = event.target as HTMLElement;
                let TargetTag = Target.tagName.toLowerCase();
                if (TargetTag == 'button')
                    return;

                toggle(item);
            };
            PvStore.Headers.unshift({
                value: 'data-table-select',
                key: 'data-table-select',
                maxWidth: '60px',
                width: '60px',
                show: PvStore.Select.ShowCheckbox,
            });

            Model.AddV_Tree(PvName, {
                'v-model': [PvStorePath, 'Selected'],
                'v-bind:show-select': [PvStorePath, 'Selectable'],
                'v-bind:item-value': [PvStorePath, 'Select', 'ItemValue'],
                'v-bind:return-object': [PvStorePath, 'Select', 'ReturnObject'],
                'v-bind:select-strategy': [PvStorePath, 'Select', 'Mode'],
                'v-bind:row-props': [PvStorePath, 'RowProps'],
            });

            if (PvStore.Select.Store != null) {
                Model.AddV_Property([PvStorePath, 'Selected'], {
                    Target: PvStore.Select.Store,
                    Value: [],
                });
            }
        }
        if (PvStore.Search != false) {
            if (typeof PvStore.Search == 'string')
                PvStore.Search = { Store: PvStore.Search, };
            else if (typeof PvStore.Search == 'boolean')
                PvStore.Search = {};
        }

        this.$FillDataTableHeaders(PvStore.Headers);

        Model.AddV_Tree(PvName, {
            'v-bind:items': [PvStorePath, 'Datas'],
            'v-bind:headers': [PvStorePath, 'Headers'],
            'v-bind:loading': [PvStorePath, 'Loading'],
            'v-bind:search': [PvStorePath, 'Search', 'Query'],
            ':SearchArea': {
                'v-if': (PvStore.Search != false).toString(),
                ':Search': Paths => {
                    DtvlPv.AddPv_Input(Paths, {
                        Store: [PvStorePath, 'Search', 'Query'],
                    });
                }
            },
        });

        this.$BuildDefaultDataTable(PvName, PvStore);
        return this;
    }
    private $FillDataTableHeaders(Headers: DataTableHeader[]) {
        for (let Item of Headers) {
            Item.align ??= 'start';
            Item.key ??= Item.value;
            Item.value ??= Item.key;
            Item.width ??= Item.minWidth;
            Item.minWidth ??= Item.width;
            Item.show ??= true;

            if (typeof Item.align == 'string') {
                Item.align = {
                    header: Item.align,
                    content: Item.align,
                };
            }
            Item.align.header ??= 'start';
            Item.align.content ??= 'start';
        }
        //if (HasAnyPx)
        //    Headers.forEach(Item => Item.width ??= 'auto');
        //else {
        //    let TotalPersent = 0;
        //    let RemainColumn = 0;
        //    for (let Item of Headers) {
        //        let Width = Item.width;
        //        if (Width == null) {
        //            RemainColumn++;
        //            continue;
        //        }
        //        TotalPersent += parseInt(Width);
        //    }
        //    if (RemainColumn != 0) {
        //        let AvgColumnWidth = ((100 - TotalPersent) / RemainColumn).toFixed(2);
        //        Headers.filter(Item => Item.width == null)
        //            .forEach(Item => Item['width'] = `${AvgColumnWidth}%`);
        //    }
        //}
    }
    private $BuildDefaultDataTable(PvName: PathType, PvStore: DataTableStore) {
        let PvStorePath = Model.ToJoin(this.PvPath(PvName));
        PvStore.IsSort = (Props: any, Column: DataTableHeader, Order: string) => {
            if (Column.sortable == false)
                return false;

            if (Props.sortBy.length == 0)
                return false;

            let Sort = Props.sortBy[0];
            if (Sort.key == Column.key && Sort.order == Order)
                return true;

            return false;
        };

        let ItemRowClass: string[] = [
            `'DataTable-Stripe': ${PvStorePath}.Stripe == true && props.index % 2 == 1`,
        ];

        if (PvStore.Select != null) {
            ItemRowClass.push(`Pointer: ${PvStore.Select.RowClicked ?? false}`);
            ItemRowClass.push(`'DataTable-Select': ${PvStorePath}.IsItemSelected(props.item) == true`);

            if (PvStore.Select.RowClass != null) {
                for (let Item of PvStore.Select.RowClass.split(' '))
                    ItemRowClass.push(`'${Item}': ${PvStorePath}.IsItemSelected(props.item) == true`);
            }
        }

        Model.AddV_Tree(PvName, {
            ':Headers': {
                ':Cell': {
                    'v-for': 'col in props.columns.filter(item => item.show)',
                    'v-bind:style': `{
                         width: col.width,
                         'min-width': col.minWidth,
                         'max-width': col.maxWidth,
                         'text-wrap': col.nowrap,
                         'text-align': col.align.header,
                    }`,
                    'v-bind:class': '{ Pointer: col.sortable }',
                    ':SelectColumn': {
                        'v-if': `col.value == 'data-table-select' && ${PvStorePath}.Select.Mode != 'single'`,
                        ':Checkbox': {
                            'v-on:click': 'props.selectAll(!props.allSelected)',
                            'v-bind:indeterminate': 'props.someSelected && props.allSelected == false',
                            'v-model': 'props.allSelected',
                        },
                    },
                    ':TitleColumn': {
                        'v-else': null,
                        'v-on:click': '() => col.sortable ? props.toggleSort(col) : null',
                        ':Title': {
                            'v-text': 'col.title',
                        },
                        ':AscIcon': {
                            'v-if': `${PvStorePath}.IsSort(props, col, 'asc')`,
                        },
                        ':DescIcon': {
                            'v-if': `${PvStorePath}.IsSort(props, col, 'desc')`,
                        },
                    },
                },
            },
            ':Items': {
                ':Row': {
                    'v-bind:class': `{ ${ItemRowClass.join(',')} }`,
                    ':Cell': {
                        'v-for': '(col, index) in props.columns.filter(item => item.show)',
                        'v-bind:style': `{ 
                            width: col.width,
                            'min-width': col.minWidth,
                            'max-width': col.maxWidth,
                            'text-wrap': col.nowrap ? 'nowrap' : 'wrap',
                            'text-align': col.align.content,
                        }`,
                        ':SelectColumn': {
                            'v-if': `col.value == 'data-table-select' && ${PvStorePath}.Select?.ShowCheckbox == true`,
                            ':Checkbox': {
                                'v-bind:model-value': `${PvStorePath}.Selected`,
                                using: Paths => {
                                    if (PvStore.Select) {
                                        Model.AddV_Tree(Paths, {
                                            'v-bind:value': `${PvStore.Select.ReturnObject} ? props.item : props.item['${PvStore.Select.ItemValue}']`,
                                        });
                                    }
                                },
                            },
                        },
                        ':IndexColumn': {
                            'v-else-if': `col.value == 'index'`,
                            'v-text': PvStore.Index.path,
                        },
                        ':ButtonsColumn': {
                            'v-else-if': `col.value == 'buttons'`,
                            'v-bind:class': `{
                                'flex-nowrap': ${PvStore.Buttons.nowrap} ? 'flex-nowrap' : '',
                            }`
                        },
                        ':TextColumn': {
                            'v-else': null,
                            'v-text': 'item[col.value]',
                        },
                    },
                    using: Paths => {
                        if (PvStore.Select) {
                            Model.AddV_Tree(Paths, {
                                'v-on:click': `${PvStorePath}.RowSelectClicked($event, props.toggleSelect, {
                                    value: ${PvStore.Select.ReturnObject} ? props.item : props.item['${PvStore.Select.ItemValue}'],
                                })`,
                            });
                        }
                    }
                }
            },
        })
    }
    //#endregion

    //#region Modal
    public AddPv_Modal(PvName: PathType, Option?: ModalOption) {
        Option ??= {};
        Option.IsShow ??= false;
        Option.Overlay ??= {};
        Option.Overlay.IsClickedClose ??= true;

        Model.AddStore(PvName, {});
        let PvStorePath = this.PvPath(PvName);
        let PvStore: ModalStore = {
            ...Option,
        };

        Model.AddV_Tree(PvName, {
            'v-model': [PvStorePath, 'IsShow'],
            ':Overlayer': {
                'v-on:click': (event: any) => {
                    let PvStore = this.GetModal(PvName);
                    if (typeof PvStore.Overlay?.Clicked === 'function') {
                        PvStore.Overlay.Clicked(event);
                        return;
                    }
                    if (PvStore.Overlay.IsClickedClose)
                        PvStore.IsShow = false;
                }
            }
        });
        Model.UpdateStore(PvStorePath, PvStore);
        return this;
    }
    public AddPv_SendModal(PvName: PathType, Option?: SendModalOption) {
        let PvStorePath = this.PvPath(PvName);

        Option ??= {};
        Option.BtnCancel ??= () => {
            this.Modal(PvName, false);
        };
        Option.BtnSend ??= () => {
            let ModalStore = Model.GetStore<SendModalStore>(PvStorePath);
            if (ModalStore.IsCalling == true)
                return;

            ModalStore.IsCalling = true;
            if (ModalStore.ApiKey) {
                Model.ApiCall(ModalStore.ApiKey, {
                    OnCalling: ModalStore.OnCalling,
                    OnSuccess: ModalStore.OnSuccess,
                    OnError: ModalStore.OnError,
                    OnComplete: () => {
                        ModalStore.OnComplete?.call(this);
                        ModalStore.IsCalling = false;
                    },
                });
            }
        };
        Option.Overlay ??= {};
        Option.Overlay.Clicked ??= (event: any) => {
            let PvStore = this.GetSendModal(PvStorePath);
            if (PvStore.BtnCancel != null)
                PvStore.BtnCancel(PvStore, event);
        }

        Model.AddV_Tree(PvName, {
            ':BtnSend': {
                'v-on:click': (event: any) => {
                    let PvStore = this.GetSendModal(PvName);
                    if (typeof PvStore.BtnSend != null)
                        PvStore.BtnSend(PvStore, event);
                },
            },
            ':BtnCancel': {
                'v-on:click': (event: any) => {
                    let PvStore = this.GetSendModal(PvName);
                    if (typeof PvStore.BtnCancel != null)
                        PvStore.BtnCancel(PvStore, event);
                }
            },
            ':Title': {
                'v-text': [PvStorePath, 'Title'],
                'using': Paths => {
                    if (!Option.Title) {
                        Queryer.Using(Paths, ({ QueryNodes }) => {
                            QueryNodes.forEach(NodeItem => {
                                Option.Title = NodeItem.Dom.textContent.trim();
                            });
                        });
                    }
                }
            },
            'using': Paths => this.AddPv_Modal(Paths, Option),
        });

        let StoreData: SendModalStore = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(PvStorePath, StoreData);
        return this;
    }
    public Modal(PvName: PathType, Option: boolean | SendModalStore) {
        let PvStorePath = this.PvPath(PvName);
        if (typeof (Option) == 'boolean') {
            Model.UpdateStore([PvStorePath, 'IsShow'], Option);
            return this;
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(PvStorePath, Option);
        return this;
    }
    public GetModal(PvName: PathType) {
        return this.Pv<ModalStore>(PvName);
    }
    public GetSendModal(PvName: PathType) {
        return this.Pv<SendModalStore>(PvName);
    }
    //#endregion

    //#region Alert
    public AddPv_Alert(PvName: PathType, Option?: AlertOption) {
        Option ??= {};
        Option.IsShow ??= false;

        if (Option.Message == null) {
            Queryer.Init();
            Queryer.Using([PvName, 'Message'], ({ QueryNodes }) => {
                QueryNodes.forEach(NodeItem => {
                    Option.Message = NodeItem.Dom.textContent.trim();
                });
            });
        }

        let SetAlertStore: AlertStore = {
            BtnCancel: Option.BtnCancel,
            IsShow: Option.IsShow,
            Message: Option.Message,
            BtnOk: Option.BtnOk,
            IsCalling: false,
        };

        Model
            .UpdateStore(this.PvPath(PvName), SetAlertStore)
            .AddV_Tree(PvName, {
                'v-model': this.PvPath(PvName, 'IsShow'),
                ':Message': {
                    'v-text': this.PvPath(PvName, 'Message')
                },
                ':BtnOk': {
                    'v-on:click': (event: any) => {
                        let AlertStore = Model.GetStore<AlertStore>(this.PvPath(PvName));
                        if (AlertStore.BtnOk != null) {
                            AlertStore.BtnOk(AlertStore, event);
                            return;
                        }

                        if (AlertStore.ApiKey != null) {
                            if (AlertStore.IsCalling)
                                return;

                            AlertStore.IsCalling = true;
                            Model.ApiCall(AlertStore.ApiKey, {
                                OnCalling: AlertStore.OnCalling,
                                OnSuccess: AlertStore.OnSuccess,
                                OnError: AlertStore.OnError,
                                OnComplete: () => {
                                    AlertStore.OnComplete?.call(this);
                                    AlertStore.IsCalling = false;
                                },
                            });
                        }
                        else
                            this.Alert(PvName, false);
                    },
                },
                ':BtnCancel': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(this.PvPath(PvName));
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Alert(PvName, false);
                    },
                },
                ':Overlayer': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(this.PvPath(PvName));
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Alert(PvName, false);
                    }
                }
            });

        return this;
    }
    public Alert(PvName: PathType, Option: boolean | AlertStore) {
        if (typeof (Option) == 'boolean') {
            let GetStore = Model.GetStore<AlertStore>(this.PvPath(PvName));
            Option = {
                IsShow: Option,
                IsCalling: GetStore.IsCalling,
            };
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.PvPath(PvName), Option);
        return this;
    }
    public GetAlert(PvName: PathType) {
        return this.Pv<AlertStore>(PvName);
    }
    //#endregion

    //#region Card
    public AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption) {
        Option ??= {};

        let PvStorePath = this.PvPath(PvName);
        let PvStore: FilterCardStore = {
            ...Option
        };
        Model.AddStore(PvName, {});

        PvStore.BtnClear ??= () => {
            Model.ClearStore(PvName);
        };
        Model.AddV_Click([PvName, 'BtnClear'], [PvStorePath, 'BtnClear']);

        if (PvStore.ApiKey != null) {
            PvStore.BtnSearch ??= () => {
                Model.ApiCall(Option.ApiKey);
            };
        }
        if (PvStore.BtnSearch != null)
            Model.AddV_Click([PvName, 'BtnSearch'], [PvStorePath, 'BtnSearch']);

        Model.UpdateStore(PvStorePath, PvStore);
        return this;
    }
    //#endregion

    //#region ForItems
    protected CreateForItemsStore(PvName: PathType, Option?: ForItemsOption, ValueOption?: ForItemsValueOption): ForItemsStore {
        Option ??= {};
        Option.Store ??= PvName;
        if (Array.isArray(Option.Store) || typeof Option.Store === 'string') {
            Option.Store = {
                Path: Option.Store,
            };
        }
        if (Option.Store.Items != null) {
            if (typeof Option.Store.Items === 'boolean') {
                if (Option.Store.Items == false)
                    Option.Store.Items = null;
                else if (Option.Store.Items == true)
                    Option.Store.Items = {};
            }
            else if (Array.isArray(Option.Store.Items) || typeof Option.Store.Items === 'string') {
                Option.Store.Items = {
                    Source: Option.Store.Items,
                };
            }
        }
        let PvStore: ForItemsStore = {
            ...Option,
            ItemsMap: {},
            Store: Option.Store,
            OnItemsMounted: (ValueMethod: ForItemsValueMethod, el: HTMLElement) => {
                let ItemsId = null;
                if (el.hasAttribute('items_id'))
                    ItemsId = el.getAttribute('items_id');
                else {
                    ItemsId = Model.GenerateId();
                    el.setAttribute('items_id', ItemsId);
                }
                let WatchEffect: WatchCallback = (newValue, oldValue, a) => {
                    if (ValueOption?.OnItemSetValue)
                        newValue = ValueOption.OnItemSetValue(newValue);
                    ValueMethod.SetValue(newValue);
                };
                WatchEffect(ValueMethod.GetValue(), null, null);
                let Watcher = Model.Watch(ValueMethod.GetValue, WatchEffect);
                PvStore.ItemsMap[ItemsId] = {
                    Watcher: Watcher,
                };
            },
            OnItemsUnMounted: (el: HTMLElement) => {
                let ItemsId = el.getAttribute('items_id');
                if (ItemsId == null)
                    return;

                let MapSet = PvStore.ItemsMap[ItemsId];
                if (MapSet != null) {
                    MapSet.Watcher?.stop();
                    delete PvStore.ItemsMap[ItemsId];
                }
            },
        };
        if (PvStore.Store.Items?.Source != null) {
            Model.AddV_PropertyFrom(PvStore, 'ItemsSource', {
                Target: PvStore.Store.Items.Source,
            });
        }

        if (PvStore.Store.Items != null) {
            let PvStorePath = this.PvPath(PvName);
            Model.AddV_Tree(PvName, {
                'v-on-unmounted': `($props, $el) => ${PvStorePath}.OnItemsUnMounted($el)`,
                'v-on-mounted': `($props, $el) => ${PvStorePath}.OnItemsMounted({
                    GetValue: () => ${PvStore.Store.Path},
                    SetValue: (value) => ${PvStore.Store.Path} = value
                }, $el)`,
            });
        }
        return PvStore;
    }
    //#endregion

    //#region Input, Select
    public GetInput(PvName: PathType) {
        return this.Pv<InputStore>(PvName);
    }
    public GetSelect(PvName: PathType) {
        return this.Pv<SelectStore>(PvName);
    }
    public AddPv_Input(PvName: PathType, Option?: InputOption) {
        Option ??= {};
        if (Array.isArray(Option) || typeof (Option) == 'string')
            Option = { Store: Option };

        //setTimeout(() => {
        //    Queryer.Init(true);
        //    Queryer.Using([PvName, 'Input'], ({ QueryNodes }) => {
        //        QueryNodes.forEach(NodeItem => {
        //            NodeItem.Dom.blur();
        //        });
        //    });
        //}, 200);

        let PvStorePath = this.PvPath(PvName);
        let PvStore: InputStore = {
            ...this.CreateForItemsStore(PvName, Option, {
                OnItemSetValue: value => PvStore.OnFormatValue(PvStore.OnFormatDisplay(value)),
            }),
            ReadOnly: Option.ReadOnly,
            InputMode: Option.InputMode ?? 'text',
            Formats: {
                Shared: [],
                Value: [],
                Display: [],
            },
            OnFormatShared: (Value: any) => {
                if (Value == null)
                    return null;
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                for (let Format of PvStore.Formats.Shared)
                    Value = Format?.Convert(Value, Format?.Option);
                return Value;
            },
            OnFormatDisplay: (Value: any) => {
                if (Value == null)
                    return null;
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                Value = PvStore.OnFormatShared(Value);
                for (let Format of PvStore.Formats.Display)
                    Value = Format?.Convert(Value, Format?.Option);
                return Value;
            },
            OnFormatValue: (Value: any) => {
                if (Value == null)
                    return null;
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                Value = PvStore.OnFormatDisplay(Value);
                for (let Format of PvStore.Formats.Value)
                    Value = Format?.Convert(Value, Format?.Option);
                return Value;
            },
        };
        Model.UpdateStore(PvStorePath, PvStore);
        Model.AddV_Tree(PvName, {
            'v-bind:inputmode': [PvStorePath, 'InputMode'],
        });

        if (PvStore.Store.Items != null) {
            Model.AddV_Tree(PvName, {
                'v-bind:model-value': `${PvStorePath}.OnFormatDisplay(${PvStore.Store.Path})`,
                'v-on:update:model-value': `value => {
                    ${PvStore.Store.Path} = ${PvStorePath}.OnFormatValue(value);
                }`,
                'v-on:input': `event => {
                    event.target.value = ${PvStorePath}.OnFormatDisplay(${PvStore.Store.Path});
                    ${PvStore.Store.Path} = ${PvStorePath}.OnFormatValue(event.target.value);
                }`,
            });
        }
        else {
            Model.AddStore(PvStore.Store.Path, null)
                .AddV_Tree(PvName, {
                    'v-model': [PvStorePath, 'Value'],
                    'v-on:input': (event: InputEvent) => {
                        let Target = event.target as HTMLInputElement;
                        let PvStore = this.GetInput(PvName);
                        PvStore.Value = Target.value
                        Target.value = PvStore.Value;
                    },
                })
                .AddV_Property([PvStorePath, 'Value'], {
                    get() {
                        let PvStore = DtvlPv.GetInput(PvName);
                        return PvStore?.DisplayValue;
                    },
                    set(value) {
                        let PvStore = DtvlPv.GetInput(PvName);
                        if (PvStore == null)
                            return;
                        PvStore.DisplayValue = PvStore.OnFormatDisplay(value);
                        PvStore.ModelValue = PvStore.OnFormatValue(PvStore.DisplayValue);
                    },
                })
                .AddV_Property(PvStore.Store.Path, {
                    get() {
                        let PvStore = DtvlPv.GetInput(PvName);
                        return PvStore?.ModelValue;
                    },
                    set(value) {
                        let PvStore = DtvlPv.GetInput(PvName);
                        if (PvStore == null)
                            return;

                        if (PvStore.ModelValue != value)
                            PvStore.Value = value;
                    },
                });
        }
        PvStore.Value = Option.Value;

        if (PvStore.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (PvStore.ReadOnly) == 'function') {
                ReadOnlyPath = [PvStorePath, `ReadOnly(${Model.ToJoin(PvStorePath)})`];
            }
            else if (typeof (PvStore.ReadOnly) == 'boolean') {
                ReadOnlyPath = [PvStorePath, 'ReadOnly'];
            }
            else if (typeof (PvStore.ReadOnly == 'string')) {
                ReadOnlyPath = PvStore.ReadOnly;
            }

            if (ReadOnlyPath != null) {
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath);
                Model.AddV_Bind(PvName, 'clearable', `!${Model.ToJoin(ReadOnlyPath)}`);
            }
        }
        if (Option.Secure != null) {
            if (typeof (Option.Secure) == 'boolean') {
                Option.Secure = {
                    SecureEye: true,
                };
            }
            Option.Secure.HidingIcon ??= 'fa-solid fa-eye';
            Option.Secure.ShowingIcon ??= 'fa-solid fa-eye-slash';
            PvStore.Secure = {
                Securing: true,
                ...Option.Secure,
            };
            let SecureStorePath = this.PvPath(PvName, 'Secure');
            let SecuringPath = Model.ToJoin([SecureStorePath, 'Securing'], '.');
            let HidingIconPath = Model.ToJoin([SecureStorePath, 'HidingIcon'], '.');
            let ShowingIconPath = Model.ToJoin([SecureStorePath, 'ShowingIcon'], '.');
            Model.AddV_Tree(PvName, {
                ':HidingSecure': {
                    'v-show': `${SecuringPath} == true`,
                    'v-on:click': () => {
                        Model.UpdateStore(SecuringPath, false);
                    },
                    ':Icon': {
                        'v-bind:class': HidingIconPath,
                    },
                },
                ':ShowingSecure': {
                    'v-show': `${SecuringPath} == false`,
                    'v-on:click': () => {
                        Model.UpdateStore(SecuringPath, true);
                    },
                    ':Icon': {
                        'v-bind:class': ShowingIconPath,
                    },
                },
                'v-bind:type': `${SecuringPath} ? 'password' : 'text' `,
            });
        }
        if (Option.Formats != null) {
            if (Array.isArray(Option.Formats)) {
                Option.Formats = {
                    Shared: Option.Formats,
                    Convert: null,
                };
            }
            Option.Formats.Shared ??= [];
            Option.Formats.Display ??= [];
            Option.Formats.Value ??= [];
            if (Option.Formats.Convert != null)
                PvStore.Formats.Shared.push({
                    Convert: Option.Formats.Convert,
                    Option: Option.Formats.Option,
                });

            if (!Array.isArray(Option.Formats.Shared))
                Option.Formats.Shared = [Option.Formats.Shared];
            if (!Array.isArray(Option.Formats.Display))
                Option.Formats.Display = [Option.Formats.Display];
            if (!Array.isArray(Option.Formats.Value))
                Option.Formats.Value = [Option.Formats.Value];

            PvStore.Formats.Shared.push(...Option.Formats.Shared);
            PvStore.Formats.Display.push(...Option.Formats.Display);
            PvStore.Formats.Value.push(...Option.Formats.Value);
        }
        return this;
    }
    public AddPv_Select(PvName: PathType, Option?: SelectOption) {
        Option ??= {};
        if (Array.isArray(Option) || typeof (Option) == 'string')
            Option = { Store: Option };

        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];

        let PvStorePath = this.PvPath(PvName);
        let PvStore: SelectStore = {
            ...this.CreateForItemsStore(PvName, Option),
            IsInited: false,
            Datas: Option.Datas,
            ApiKey: Option.ApiKey,
            ItemName: Option.ItemName,
            ItemValue: Option.ItemValue,
            ReturnObject: Option.ReturnObject,
            Multiple: Option.Multiple,
            ReadOnly: Option.ReadOnly,
            OnChange: Option.OnChange,
            QueryItem: (Item, Option) => {
                let PvStore = DtvlPv.GetSelect(PvName);
                let TargetField = PvStore.ItemValue;
                let Result = null;

                if (Array.isArray(Item)) {
                    if (TargetField == null) {
                        Result = PvStore.Datas.filter((data: any) => Item.includes(data));
                    }
                    else {
                        let SoruceValues = Option.Source == 'value' ? Item :
                            Item.map((data: any) => data[TargetField]);
                        Result = PvStore.Datas.filter((data: any) => SoruceValues.includes(data[TargetField]));
                    }

                    if (Option.Target == 'value' && TargetField != null)
                        Result = Result.map((data: any) => data[TargetField]);
                }
                else {
                    if (TargetField == null) {
                        Result = PvStore.Datas.find((data: any) => data == Item);
                    }
                    else {
                        let SoruceValue = Option.Source == 'value' ? Item : Item[TargetField];
                        Result = PvStore.Datas.find((data: any) => data[TargetField] == SoruceValue);
                    }
                    if (Result != null && Option.Target == 'value' && TargetField != null)
                        Result = Result[TargetField];
                }
                return Result;
            },
        };
        Model.UpdateStore(PvStorePath, PvStore);

        if (PvStore.Store.Items != null && PvStore.Store.Items != false) {
            Model.AddV_Tree(PvName, {
                'v-bind:model-value': `${PvStore.Store.Path}`,
                'v-on:update:model-value': `value => {
                    ${PvStore.Store.Path} = value;
                }`,
            });
        }
        else {
            Model.AddStore(PvStore.Store.Path, null)
                .AddV_Model(PvName, [PvStorePath, 'SelectedItem'])
                .AddV_Property([PvStorePath, 'SelectedItem'], {
                    Bind: [PvStore.ReturnObject == true ? PvStore.Store.Path : null],
                    set(Value) {
                        let PvStore = DtvlPv.GetSelect(PvName);
                        if (Value == null) {
                            this.$set('SelectedItem', null);
                            this.$set('SelectedValue', null);
                            return;
                        }

                        let ClearValue = PvStore.QueryItem(Value, {
                            Source: 'item',
                            Target: 'item'
                        });
                        let SetSelectedValue = PvStore.QueryItem(ClearValue, {
                            Source: 'item',
                            Target: 'value',
                        });

                        if (SetSelectedValue == null) {
                            this.$set('SelectedItem', null);
                            this.$set('SelectedValue', null);
                            return;
                        }
                        let CurrentValue = this.SelectedValue;
                        if (SetSelectedValue != CurrentValue) {
                            this.$set('SelectedItem', ClearValue);
                            this.$set('SelectedValue', SetSelectedValue);
                        }
                    }
                })
                .AddV_Property([PvStorePath, 'SelectedValue'], {
                    Bind: [PvStore.ReturnObject == false ? PvStore.Store.Path : null],
                    set(Value: any) {
                        let PvStore = DtvlPv.GetSelect(PvName);
                        if (Value == null) {
                            this.$set('SelectedValue', null);
                            this.$set('SelectedItem', null);
                            return;
                        }
                        let ClearValue = PvStore.QueryItem(Value, {
                            Source: 'value',
                            Target: 'value'
                        });
                        let SetSelectedItem = PvStore.QueryItem(ClearValue, {
                            Source: 'value',
                            Target: 'item',
                        });
                        if (SetSelectedItem == null) {
                            this.$set('SelectedValue', null);
                            this.$set('SelectedItem', null);
                            return;
                        }
                        if (SetSelectedItem != this.SelectedItem) {
                            this.$set('SelectedValue', ClearValue);
                            this.$set('SelectedItem', SetSelectedItem);
                        }
                    },
                });

            PvStore.ReturnObject = true;
        }

        if (PvStore.ApiKey) {
            Model.AddV_Property([PvStorePath, 'Datas'], {
                Target: Option.ApiKey,
                Value: Option.Datas,
                get() {
                    let GetDatas = this.$get('Datas');
                    if (GetDatas == null)
                        return [];

                    if (!Array.isArray(GetDatas))
                        return [];

                    if (GetDatas.length == 0) {
                        if (this.IsInited)
                            this.SelectedValue = null;
                        return [];
                    }

                    if (!this.IsInited)
                        this.IsInited = true;

                    let QueryDatas = GetDatas;
                    if (Option.ItemValue)
                        QueryDatas = QueryDatas.map(Item => Item[Option.ItemValue]);

                    let SelectedValue = this.SelectedValue;
                    if (SelectedValue == null)
                        return GetDatas;

                    if (!Array.isArray(SelectedValue)) {
                        if (!QueryDatas.includes(SelectedValue))
                            this.SelectedValue = null;
                    }
                    else {
                        for (let Item of SelectedValue) {
                            if (!QueryDatas.includes(Item)) {
                                this.SelectedValue = null;
                                break;
                            }
                        }
                    }
                    return GetDatas;
                }
            });

            this.WatchApi(Option.ApiKey, 'IsCalling', (Value: boolean) => {
                let Store = Model.GetStore<SelectStore>(PvStorePath);
                if (Value == true) {
                    Store.Loading = Value;
                    Store.LoadingTime = new Date();
                }
                else {
                    let TimeDiff = 0;
                    if (Store.LoadingTime != null)
                        TimeDiff = new Date().getTime() - Store.LoadingTime.getTime();

                    if (TimeDiff >= this.$LoadingDelay)
                        Store.Loading = false;
                    else {
                        setTimeout(() => {
                            Store.Loading = false;
                        }, this.$LoadingDelay - TimeDiff);
                    }
                }
            });
            Model.AddV_Bind(PvName, 'loading', [PvStorePath, 'Loading']);
        }
        if (PvStore.OnChange)
            Model.AddV_On(PvName, 'update:model-value', Option.OnChange);

        if (PvStore.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = [PvStorePath, `ReadOnly(${Model.ToJoin(PvStorePath)})`];
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = [PvStorePath, `ReadOnly`];
            } else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
            }

            if (ReadOnlyPath != null) {
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath)
                    .AddV_Bind(PvName, 'clearable', `!${Model.ToJoin(ReadOnlyPath)}`);
            }
        }

        Model.AddV_Tree(PvName, {
            'v-bind:items': [PvStorePath, 'Datas'],
            'v-bind:item-title': [PvStorePath, 'ItemName'],
            'v-bind:item-value': [PvStorePath, 'ItemValue'],
            'v-bind:return-object': `${PvStore.ReturnObject}`,
            'v-bind:multiple': `${PvStore.Multiple}`,
        });

        return this;
    }
    //#endregion

    //#region Format
    public AddPv_Format<TOption = any>(FormatKey: string, FormatFunc: FormatBuilderType<TOption>) {
        let FormatStore = Model.GetStore<FormatStore>(this.$FormatStore);
        FormatStore[FormatKey] = FormatFunc;
        return this;
    }
    public CreateDateFormat(Option: DateFormatOption) {
        let DateFormat = this.CreateFormat<DateFormatOption>((Value, Option) => {
            Option.Separator ??= '/';
            Option.YearCount ??= 4;
            Option.MonthCount ??= 2;
            Option.DayCount ??= 2;

            if (Value == null || Value == '')
                return Value;

            let AllNumber = Value.toString().match(/\d+/g);
            if (AllNumber == null)
                return null;

            let FullValue = AllNumber.join('');
            let Year = FullValue.slice(0, Option.YearCount);

            let MonthEnd = Option.YearCount + Option.MonthCount;
            let Month = FullValue.slice(Option.YearCount, MonthEnd);

            let DayEnd = MonthEnd + Option.DayCount;
            let Day = FullValue.slice(MonthEnd, DayEnd);
            let FullDate = [Year, Month, Day].join(Option.Separator);
            let ReplaceReg = `[${Option.Separator}]+$`;
            let Result = FullDate.replace(new RegExp(ReplaceReg), '');
            return Result;
        }, Option);
        return DateFormat;
    }
    public CreateFormat<TOption = any>(Convert: FormatConvertType<TOption>, DefaultOption?: TOption) {
        let Builder: FormatBuilderType = (Option: TOption) => {
            return {
                Option: {
                    ...DefaultOption,
                    ...Option,
                },
                Convert: Convert,
            };
        };
        return Builder;
    }
    public GetFormat(FormatKey: string) {
        let FormatStore = Model.GetStore<FormatStore>(this.$FormatStore);
        let FormatResult = FormatStore[FormatKey];
        return FormatResult;
    }
    //#endregion

    //#region DatePicker
    public GetDatePicker(PvName: PathType) {
        return this.Pv<DatePickerStore>(PvName);
    }
    public AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption) {
        Option ??= {};
        if (Array.isArray(Option) || typeof (Option) == 'string')
            Option = { Store: Option };

        let PvStorePath = this.PvPath(PvName);
        let PvStore: DatePickerStore = {
            ...  this.CreateForItemsStore(PvName, Option),
        };
        PvStore.IsOpen ??= false;

        Model.UpdateStore(PvStorePath, PvStore);
        if (PvStore.Store.Items != null) {

        }
        else {
            Model.AddStore(PvStore.Store.Path)
                .AddV_Property([PvStorePath, 'Value'], {
                    Target: [PvStore.Store.Path],
                    get() {
                        let DateValue = this.Date;
                        if (DateValue != null)
                            return Model.ToDateText(DateValue);

                        if (this.IsOpen)
                            return ' ';

                        return null;
                    },
                    set(value) {
                        if (value instanceof Date)
                            value = Model.ToDateText(value);

                        let CurrentValue = this.Value;
                        if (value == null) {
                            if (CurrentValue != null) {
                                this.IsOpen = false;
                                this.Date = null;
                            }
                            return;
                        }

                        if (CurrentValue != value)
                            this.Date = new Date(value);
                    },
                })
                .AddV_Property(PvStore.Store.Path, {
                    get() {
                        let PvStore = DtvlPv.GetDatePicker(PvName);
                        return PvStore.Value;
                    },
                    set(value) {
                        let PvStore = DtvlPv.GetDatePicker(PvName);
                        PvStore.Value = value;
                    },
                });
        }

        Model.AddV_Property([PvStorePath, 'Date'], {
            set(value) {
                this.$set('Date', value);
                if (value)
                    this.Value = Model.ToDateText(value);
                else
                    this.Value = null;
            }
        });
        Model.AddV_Tree(PvName, {
            'v-model': [PvStorePath, 'IsOpen'],
            ':Input': {
                'v-model': [PvStorePath, 'Value'],
                'v-on:click:clear': () => {
                    let PvStoreStore = this.GetDatePicker(PvName);
                    if (PvStoreStore)
                        PvStoreStore.Date = null;
                },
            },
            ':DatePicker': {
                'v-model': [PvStorePath, 'Date'],
            },
        });
        return this;
    }
    //#endregion

    //#region Tabbed
    public AddPv_Tabbed(PvName: PathType, Option?: TabbedOption) {
        let TabbedPath = Model.ToJoin(this.PvPath(PvName));
        Model.AddV_Tree(PvName, {
            ':Tabs': {
                'v-model': `${TabbedPath}.Value`,
            },
            ':Contents': {
                'v-model': `${TabbedPath}.Value`,
            }
        });
        return this;
    }
    //#endregion

    //#region Flex
    public AddPv_Flex(PvName: PathType, Option: FlexOption) {
        let RootStorePath = Model.ToJoin(this.PvPath(PvName));

        Option.Datas ??= [];
        let RootStore: FlexStore = {
            ...Option,
        };
        Model.UpdateStore(RootStorePath, RootStore);

        if (RootStore.ApiKey != null) {
            Model.AddV_Property(this.PvPath(PvName, 'Datas'), {
                Target: Option.ApiKey,
                Value: Option.Datas,
            });
        }

        Model
            .AddV_Tree(PvName, {
                ':Items': {
                    'v-for': `${RootStorePath}.Datas`,
                },
            });

        return this;
    }
    public AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption) {
        this.AddPv_Flex(PvName, Option);
        let BindSrc = Option.ItemSrc;
        if (Option.ItemSrc == null || Option.ItemSrc == '.' || Option.ItemSrc == '')
            BindSrc = 'item';
        else if (!Option.ItemSrc.includes('item.')) {
            BindSrc = `item.${Option.ItemSrc}`;
        }

        Model.AddV_Tree(PvName, {
            ':Items': {
                ':Images': {
                    'v-bind:src': BindSrc,
                }
            },
        });
        return this;
    }
    //#endregion

    //#region Image
    public GetImage(PvName: PathType) {
        return this.Pv<ImageStore>(PvName);
    }
    public GetImageViewer(PvName: PathType) {
        return this.Pv<ImageViewerStore>(PvName);
    }
    public AddPv_Image(PvName: PathType, Option: ImageOption) {
        let PvStorePath = Model.ToJoin(this.PvPath(PvName));
        let PvStore: ImageStore = {};
        Model.UpdateStore(PvStorePath, PvStore);

        if (Option.Src != null) {
            Model.AddV_Property([PvStorePath, 'Src'], {
                Target: Option.Src,
            });
        }
        else {
            PvStore.Src = Option.SrcUrl;
        }

        if (Option.LazySrc == null && Option.LazySrcUrl == null) {
            Model.AddV_Property([PvStorePath, 'LazySrc'], {
                Target: [PvStorePath, 'Src'],
            });
        }
        else if (Option.LazySrc != null) {
            Model.AddV_Property([PvStorePath, 'LazySrc'], {
                Target: Option.LazySrc,
            });
        }
        else {
            PvStore.LazySrc = Option.LazySrcUrl;
        }

        if (Option.Viewer != null) {
            if (Array.isArray(Option.Viewer))
                Option.Viewer = Model.ToJoin(Option.Viewer);

            if (typeof Option.Viewer === 'string') {
                Option.Viewer = {
                    Path: Option.Viewer,
                    Mode: 'single',
                };
            }
            PvStore.Viewer = Option.Viewer;
            PvStore.Clicked = () => {
                let PvStore = this.GetImage(PvName);
                if (PvStore.Src != null) {
                    this.ImageViewer(PvStore.Viewer.Path, {
                        IsShow: true,
                        Mode: PvStore.Viewer.Mode,
                        Datas: [PvStore.Src],
                        Index: 0,
                    });
                }
            };
            Model.AddV_Bind(PvName, 'class', `{ Pointer: true }`);
        }

        Model.AddV_Tree(PvName, {
            'v-bind:src': [PvStorePath, 'Src'],
            'v-bind:lazy-src': [PvStorePath, 'LazySrc'],
            'v-on:click': [PvStorePath, 'Clicked'],
        });

        return this;
    }
    public AddPv_ImageViewer(PvName: PathType, Option?: ImageViewerOption) {
        this.AddPv_Modal(PvName);

        Option ??= {};
        Option.Mode ??= 'album';
        Option.HasCounter ??= Option.Mode == 'single' ? false : true;
        Option.HasSideTool ??= Option.Mode == 'single' ? false : true;
        Option.HasRotator ??= false;
        Option.Datas ??= [];
        Option.Datas = this.$ParseImageViwerDatas(Option.Datas);

        let PvStorePath = this.PvPath(PvName);
        let PvStore: ImageViewerStore = {
            ...Option,
            Datas: Option.Datas,
            CurrentCount: null,
            TotalCount: null,
            Src: null,
            LazySrc: null,
        };
        PvStore.BtnCloseClicked ??= () => {
            this.GetImageViewer(PvName).IsShow = false;
        };

        Model.AddV_Tree(PvName, {
            ':Toolbar': {
                ':BtnClose': {
                    'v-on:click': [PvStorePath, 'BtnCloseClicked()'],
                },
                ':Counter': {
                    'v-if': [PvStorePath, 'HasCounter'],
                    ':CurrentCount': {
                        'v-text': [PvStorePath, 'CurrentCount']
                    },
                    ':TotalCount': {
                        'v-text': [PvStorePath, 'TotalCount']
                    }
                },
            },
            ':BtnRotateLeft': {
                'v-if': [PvStorePath, 'HasRotator'],
                'v-on:click': () => {

                },
            },
            ':BtnRotateRight': {
                'v-if': [PvStorePath, 'HasRotator'],
                'v-on:click': () => {

                },
            },
            ':SideToolBefore': {
                'v-if': [PvStorePath, 'HasSideTool'],
                'v-on:click': () => {
                    let PvStore = this.GetImageViewer(PvName);
                    this.ImageViewer(PvName, {
                        Index: PvStore.Index - 1,
                    });
                }
            },
            ':SideToolNext': {
                'v-if': [PvStorePath, 'HasSideTool'],
                'v-on:click': () => {
                    let PvStore = this.GetImageViewer(PvName);
                    this.ImageViewer(PvName, {
                        Index: PvStore.Index + 1,
                    });
                }
            },
            ':ImageViewerContent': {
                'v-on:click': (event: PointerEvent) => {
                    let ClickTarget = event.target as HTMLElement;
                    if (ClickTarget.tagName.toLowerCase() == 'img')
                        return;

                    let PvStore = this.GetImageViewer(PvName);
                    if (typeof PvStore.Overlay?.Clicked === 'function') {
                        PvStore.Overlay.Clicked(event);
                        return;
                    }
                    if (PvStore.Overlay.IsClickedClose)
                        PvStore.IsShow = false;
                },
                'v-bind:src': [PvStorePath, 'Src'],
                'v-bind:lazy-src': [PvStorePath, 'LazySrc'],
            }
        });

        Model.UpdateStore(PvStorePath, PvStore);
        return this;
    }
    public ImageViewer(PvName: PathType, Option?: ImageViewerSet | boolean) {
        if (PvName == null)
            return this;

        Option ??= true;
        if (typeof Option === 'boolean') {
            Option = {
                IsShow: Option,
            };
        }
        Option.Index ??= 0;
        Option.IsShow ??= true;

        let PvStore = this.GetImageViewer(PvName);
        if (PvStore == null)
            return this;

        if (Option.Datas != null)
            PvStore.Datas = this.$ParseImageViwerDatas(Option.Datas);

        if (PvStore.Datas && PvStore.Datas.length > 0) {
            if (Option.Index < 0)
                Option.Index = PvStore.Datas.length - 1;
            else if (Option.Index > PvStore.Datas.length - 1)
                Option.Index = 0;

            PvStore.Index = Option.Index;
            PvStore.Src = PvStore.Datas[PvStore.Index].Src;
            PvStore.LazySrc = PvStore.Datas[PvStore.Index].LazySrc;
            PvStore.IsShow = Option.IsShow;
            PvStore.TotalCount = PvStore.Datas.length;
            PvStore.CurrentCount = PvStore.Index + 1;
        }
        else {
            PvStore.TotalCount = 1;
            PvStore.CurrentCount = 1;
        }
        return this;
    }
    protected $ParseImageViwerDatas(Datas?: string | string[] | ImageViewerValue | ImageViewerValue[]) {
        if (Datas == null)
            return null;

        if (typeof Datas === 'string') {
            Datas = [{
                Src: Datas,
                LazySrc: Datas,
            }];
        }
        else if (Array.isArray(Datas)) {
            let NewDatas: ImageViewerValue[] = [];
            for (let i = 0; i < Datas.length; i++) {
                let Item = Datas[i];
                if (Item == null)
                    continue;
                if (typeof Item === 'string') {
                    NewDatas.push({
                        Src: Item,
                        LazySrc: Item,
                    });
                }
                else {
                    NewDatas.push(Item);
                }
            }
            Datas = NewDatas;
        }
        else
            Datas = [Datas];

        return Datas;
    }
    //#endregion

    //#region Collapse


    //#endregion

    //#region Animate
    public AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption) {
        let StorePath = this.PvPath(PvName, 'Animate');

        Model.SetStore<AnimateStore>(StorePath, {
            IsRun: false,
        });
        Model.AddV_Watch([StorePath, 'IsRun'], (NewValue: boolean) => {
            if (NewValue) {

            }
        });
        Model.AddV_Tree(PvName, {

        });
    }
    public Animate(PvName: PathType) {
        let StorePath = this.PvPath(PvName, 'Animate');
        let AnimateStore = Model.GetStore<AnimateStore>(StorePath, {
            CreateIfNull: true,
            DefaultValue: {
                IsRun: false,
            },
        });
        let IsRun = Model.GetStore<boolean>([StorePath, 'IsRun']);
        IsRun = IsRun ? false : true;
        Model.UpdateStore([StorePath, ''], true);
    }
    //#endregion

    //#region Protect Process
    protected PvPath(...PushPath: PathType[]) {
        let RootPath = Model.ToJoin(Model.Paths([this.$PvStore, PushPath]));
        return RootPath;
    }
    protected ApiPath(...PushPath: PathType[]): string[] {
        let RootPath = Model.Paths([this.$ApiStore, PushPath]);
        return RootPath;
    }
    public WatchApi(ApiKey: PathType, Status: string, Func: WatchCallback) {
        let GetPath = Model.Paths(ApiKey).shift();
        GetPath = GetPath.split('.')[0];
        Model.AddV_Watch(this.ApiPath(GetPath, Status), Func);
    }
    //#endregion
}

const DtvlPv = new DtvlPvIniter();
const Formats = DtvlPv.Formats;
(window as any).DtvlPv = DtvlPv;
export {
    DtvlPv,
    Formats,
};
