import { Model, Queryer, PathType, ApiCallback } from '@rugal.tu/vuemodel3';

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
    align?: string,
    sortable?: boolean,
    key?: string,
    value?: string,
    width?: string,
};
type DataTableOption = {
    Index?: boolean | DataTableIndexOption,
    Buttons?: boolean | DataTableHeader,
    Headers: DataTableHeader[],
    Datas?: any[],
    ApiKey?: string,
    Select?: {
        ItemValue: string,
        Store?: string,
        ReturnObject?: boolean,
        Mode?: 'single' | 'page' | 'all'
        RowClicked?: boolean,
    }
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total',
};
type DataTableStore = DataTableOption & {
    Selected: any[],
    Selectable?: boolean,
    Loading?: boolean,
    LoadingTime?: Date,
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

//#region Input Type
type SecureOption = boolean | {
    SecureEye?: boolean,
    ShowingIcon?: string,
    HidingIcon?: string,
};
type InputOption = {
    Value?: any,
    Store?: PathType | {
        Path: PathType,
        IsItem?: boolean,
    },
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    Secure?: SecureOption,
    Number?: boolean | InputNumberOption,
    Formats?: {
        Value?: FormateFuncType | FormateFuncType[],
        Display?: FormateFuncType | FormateFuncType[],
    } | FormateFuncType | FormateFuncType[],
} | string;
type InputStore = {
    Store: {
        Path: PathType,
        IsItem?: boolean,
    },
    Value?: any,
    ReadOnly?: boolean | ((Store?: InputStore) => boolean),
    Secure?: {
        Securing: boolean,
    } & SecureOption,
    Number?: InputNumberOption,
    Formats: {
        Value: FormateFuncType[],
        Display: FormateFuncType[],
    },
    OnFormatDisplay: Function,
    OnFormatValue: Function,
};
type InputNumberOption = {
    ThousandsSeparator?: boolean,
};
//#endregion

//#region Format Type
type FormateFuncType = (Value: string) => string;
type DateFormatOption = {
    Separator: string,
    YearCount?: number,
    MonthCount?: number,
    DayCount?: number,
};
type NumberFormatOption = {
    ThousandsSeparator?: boolean,
};
type FormatStore = {
    AdDate: FormateFuncType,
    TwDate: FormateFuncType,
    Number: FormateFuncType,
    NumberThousands: FormateFuncType,
} | Record<string, FormateFuncType>;
type DefaultFormatsType = {
    AdDate: string,
    TwDate: string,
    Number: string,
    NumberThousands: string,
};
//#endregion

//#region Select Type
type SelectOption = {
    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string | Function,
    ItemValue?: string,
    Store?: PathType | {
        Path: PathType,
        IsItem?: boolean,
    },
    SelectedValue?: any,
    ReturnObject?: boolean,
    Multiple?: boolean,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    OnChange?: Function | string,
};
type SelectStore = {
    Store: {
        Path: PathType,
        IsItem?: boolean,
    },
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
};
//#endregion

//#region DatePicker Type
type DatePickerOption = {
    Store?: PathType,
    IsOpen?: boolean,
}
type DatePickerStore = DatePickerOption & {
}
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
};
type ImageStore = {
    Src?: string,
    LazySrc?: string,
}
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
            NumberThousands: 'NumberThousands',
        };
        Model.AddStore(this.$FormatStore, {});
        this.$CreateAdDateFormat();
        this.$CreateTwDateFormat();
        this.$CreateNumberFormat();
        this.$CreateNumberThousandsFormat();
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
        this.AddPv_Format(this.$FormatKeys.Number, (Value) => {
            if (Value == null || Value == '')
                return Value;
            Value = Value.toString().replace(/[^0-9]/g, '');
            return Value;
        });
    }
    protected $CreateNumberThousandsFormat() {
        this.AddPv_Format(this.$FormatKeys.NumberThousands, (Value) => {
            Value = this.Formats.Number(Value);
            if (Value == null || Value == '')
                return Value;
            Value = Number(Value).toLocaleString();
            return Value;
        });
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
        let RouterDefaultStore = this.RootPath(PvName);
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

        Option.Datas ??= [];
        let TableStore: DataTableStore = {
            ...Option,
            Selected: [],
        };

        let StorePath = Model.ToJoin(this.RootPath(PvName));
        Model.UpdateStore(StorePath, TableStore);

        TableStore.Buttons ??= {};
        if (TableStore.Buttons != null && TableStore.Buttons != false) {
            if (TableStore.Buttons == true) {
                TableStore.Buttons = {};
            }
            TableStore.Buttons.title ??= '';
            TableStore.Buttons.value ??= 'buttons';
            TableStore.Buttons.sortable ??= false;
            TableStore.Headers.push(TableStore.Buttons);
        }
        if (TableStore.ApiKey) {
            Model.AddV_Property(TableStore.ApiKey, {
                Target: `${StorePath}.Datas`,
            });

            this.WatchApi(TableStore.ApiKey, 'IsCalling', (Value: boolean) => {
                let Store = Model.GetStore<DataTableStore>(StorePath);
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

            Model.AddV_Tree(PvName, {
                'v-bind:loading': `${StorePath}.Loading`,
            });
        }
        if (TableStore.Select != null) {
            TableStore.Selectable = true;
            TableStore.Select.ReturnObject ??= false;
            TableStore.Select.Mode ??= 'all';
            TableStore.Select.RowClicked ??= true;

            if (TableStore.Select.RowClicked == true) {
                Model.AddV_On(PvName, 'click:row', (Event: Event, Row: any) => {
                    let RowItem = Row.item;
                    let ValueItem = RowItem;
                    let Store = Model.GetStore<DataTableStore>(StorePath);
                    if (!Store.Select.ReturnObject)
                        ValueItem = ValueItem[Store.Select.ItemValue];

                    let IsSelected = Store.Selected.includes(ValueItem);
                    if (IsSelected) {
                        let SelectedIndex = Store.Selected.indexOf(ValueItem);
                        Store.Selected.splice(SelectedIndex, 1);
                    }
                    else
                        Store.Selected.push(ValueItem);
                });
            }

            Model.AddV_Tree(PvName, {
                'v-model': `${StorePath}.Selected`,
                'v-bind:show-select': `${StorePath}.Selectable`,
                'v-bind:item-value': `${StorePath}.Select.ItemValue`,
                'v-bind:return-object': `${StorePath}.Select.ReturnObject`,
                'v-bind:select-strategy': `${StorePath}.Select.Mode`,
            });

            if (TableStore.Select.Store != null) {
                Model.AddV_Property(`${StorePath}.Selected`, {
                    Target: TableStore.Select.Store,
                    Value: [],
                });
            }
        }

        this.$FillDataTableHeaders(TableStore.Headers);

        TableStore.Index ??= true;
        if (TableStore.Index != null && TableStore.Index != false) {
            if (TableStore.Index == true) {
                TableStore.Index = {
                    type: 'Total',
                };
            }

            TableStore.Index.type ??= 'Total';
            let IndexPath = null;
            switch (TableStore.Index.type) {
                case 'Page':
                    IndexPath = 'props.index + 1';
                    break;
                case 'Total':
                    IndexPath = 'props.internalItem.index + 1';
                    break;
                default:
                    break;
            }

            Model.AddV_Text([PvName, 'IndexColumn'], IndexPath);
            TableStore.Index.title ??= '#';
            TableStore.Index.value ??= 'index';
            TableStore.Index.key ??= 'index';
            TableStore.Headers.unshift(TableStore.Index);
        }

        Model.AddV_Tree(PvName, {
            'v-bind:items': this.RootPath(PvName, 'Datas'),
            'v-bind:headers': this.RootPath(PvName, 'Headers'),
        });

        return this;
    }
    private $FillDataTableHeaders(Headers: DataTableHeader[]) {

        let HasAnyPx = false;
        for (let Item of Headers) {
            Item.align ??= 'start';
            Item.key ??= Item.value;
            Item.value ??= Item.key;

            let GetWidth = Item.width;
            if (GetWidth == null)
                continue;

            if (GetWidth.includes('px'))
                HasAnyPx = true;
        }

        return;

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
    //#endregion

    //#region Modal
    public AddPv_Modal(PvName: PathType, Option?: ModalOption) {
        Option ??= {};
        Option.IsShow ??= false;

        let PvStorePath = this.RootPath(PvName);
        let PvStore: ModalStore = {
            ...Option,
        };
        Model.UpdateStore(PvStorePath, PvStore)
            .AddV_Tree(PvName, {
                'v-model': [PvStorePath, 'IsShow'],
                ':Overlayer': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(PvStorePath);
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Modal(PvName, false);
                    }
                }
            });

        return this;
    }
    public AddPv_SendModal(PvName: PathType, Option?: SendModalOption) {
        Option ??= {};

        this.AddPv_Modal(PvName, Option);
        Option.BtnCancel ??= () => {
            this.Modal(PvName, false);
        };
        Option.BtnSend ??= () => {
            let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
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

        if (Option.BtnSend)
            Model.AddV_Tree(PvName, {
                ':BtnSend': {
                    'v-on:click': (event: any) => {
                        let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
                        ModalStore.BtnSend(ModalStore, event);
                    },
                }
            });

        Model.AddV_Tree(PvName, {
            ':BtnCancel': {
                'v-on:click': (event: any) => {
                    let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
                    ModalStore.BtnCancel(ModalStore, event);
                }
            },
            ':Title': {
                'v-text': this.RootPath(PvName, 'Title'),
            },
        });

        if (!Option.Title) {
            Queryer.Using(this.RootPath(PvName, 'Title'), ({ QueryNodes }) => {
                QueryNodes.forEach(NodeItem => {
                    Option.Title = NodeItem.Dom.textContent.trim();
                });
            });
        }

        let StoreData: SendModalStore = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(this.RootPath(PvName), StoreData);
        return this;
    }
    public Modal(PvName: PathType, Option: boolean | SendModalStore) {
        if (typeof (Option) == 'boolean') {
            Model.UpdateStore(this.RootPath(PvName, 'IsShow'), Option);
            return this;
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.RootPath(PvName), Option);
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
            .UpdateStore(this.RootPath(PvName), SetAlertStore)
            .AddV_Tree(PvName, {
                'v-model': this.RootPath(PvName, 'IsShow'),
                ':Message': {
                    'v-text': this.RootPath(PvName, 'Message')
                },
                ':BtnOk': {
                    'v-on:click': (event: any) => {
                        let AlertStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
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
                        let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Alert(PvName, false);
                    },
                },
                ':Overlayer': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
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
            let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
            Option = {
                IsShow: Option,
                IsCalling: GetStore.IsCalling,
            };
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.RootPath(PvName), Option);
        return this;
    }
    public GetAlert(PvName: PathType) {
        return this.Pv<AlertStore>(PvName);
    }
    //#endregion

    //#region Card
    public AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption) {
        Option ??= {};

        let PvStorePath = this.RootPath(PvName);
        let PvStore: FilterCardStore = {
            ...Option
        };
        Model.AddStore(PvName, {})
            .UpdateStore(PvStorePath, PvStore);

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

        return this;
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
        if (typeof (Option) == 'string')
            Option = { Store: Option };

        Option.Store ??= Model.ToJoin(PvName);
        if (Array.isArray(Option.Store) || typeof Option.Store == 'string') {
            Option.Store = {
                Path: Option.Store,
                IsItem: false,
            };
        }
        Option.Store.Path = Model.ToJoin(Option.Store.Path);

        let PvStore: InputStore = {
            Store: Option.Store,
            Value: Option.Value,
            Formats: {
                Value: [],
                Display: [],
            },
            OnFormatDisplay: (Value: any) => {
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                for (let Format of PvStore.Formats.Display)
                    Value = Format?.call(this, Value);
                return Value;
            },
            OnFormatValue: (Value: any) => {
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                for (let Format of PvStore.Formats.Value)
                    Value = Format?.call(this, Value);
                return Value;
            },
        };
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        Model.UpdateStore(PvStorePath, PvStore)
            .AddV_Tree(PvName, {
                'v-model': `${Option.Store.Path}`,
                'v-bind:model-value': `${PvStorePath}.OnFormatDisplay(${Option.Store.Path} = ${PvStorePath}.OnFormatValue(${Option.Store.Path}))`,
                //'v-on:update:model-value': `value => ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(value)`,
                //'v-on:input': `value => ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(value)`,
                //'v-bind:value': `${PvStorePath}.OnFormatDisplay(${Option.Store.Path}, ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(${Option.Store.Path}))`,
            });

        if (Option.Store.IsItem != true) {
            Model.AddStore(Option.Store.Path, null)
                .AddV_Property([PvStorePath, 'Value'], {
                    Target: Option.Store.Path,
                });
        }

        if (Option.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, `ReadOnly(${Model.ToJoin(PvStorePath)})`);
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, 'ReadOnly');
            } else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
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
            let SecureStorePath = this.RootPath(PvName, 'Secure');
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
        if (Option.Number != null && Option.Number != false) {
            if (Option.Number == true)
                Option.Number = { ThousandsSeparator: true };

            PvStore.Number = Option.Number;
            PvStore.Formats.Value.push(this.Formats.Number);
            if (Option.Number.ThousandsSeparator == true)
                PvStore.Formats.Display.push(this.Formats.NumberThousands);
            else
                PvStore.Formats.Display.push(this.Formats.Number);
            Model.AddV_Bind(PvName, 'inputmode', `'numeric'`);
        }
        if (Option.Formats != null) {
            if (Array.isArray(Option.Formats) || typeof (Option.Formats) == 'function') {
                Option.Formats = {
                    Value: Option.Formats,
                    Display: Option.Formats,
                }
            }
            if (!Array.isArray(Option.Formats.Display))
                Option.Formats.Display = [Option.Formats.Display];
            if (!Array.isArray(Option.Formats.Value))
                Option.Formats.Value = [Option.Formats.Value];
            PvStore.Formats.Display.push(...Option.Formats.Display);
            PvStore.Formats.Value.push(...Option.Formats.Value);
        }

        return this;
    }
    public AddPv_Select(PvName: PathType, Option?: SelectOption) {
        Option ??= {};
        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];
        Option.Store ??= Model.ToJoin(PvName);
        if (Array.isArray(Option.Store) || typeof Option.Store == 'string') {
            Option.Store = {
                Path: Option.Store,
                IsItem: false,
            };
        }

        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore: SelectStore = {
            IsInited: false,
            Store: Option.Store,
            Datas: Option.Datas,
            ApiKey: Option.ApiKey,
            ItemName: Option.ItemName,
            ItemValue: Option.ItemValue,
            ReturnObject: Option.ReturnObject,
            Multiple: Option.Multiple,
            ReadOnly: Option.ReadOnly,
            OnChange: Option.OnChange,
        };
        Model.UpdateStore(PvStorePath, PvStore);

        if (PvStore.Store.IsItem == true) {
            Model.AddV_Model(PvName, Option.Store.Path);
        }
        else {
            Model.AddStore(PvStore.Store.Path, null)
                .AddV_Model(PvName, [PvStorePath, 'SelectedItem'])
                .AddV_Property([PvStorePath, 'SelectedItem'], {
                    Target: PvStore.ReturnObject ? PvStore.Store.Path : null,
                    set(Value) {
                        this.$set('SelectedItem', Value);
                        if (!Value) {
                            this.SelectedValue = null;
                            return;
                        }
                        if (Array.isArray(Value))
                            this.SelectedValue = Value.map(Item => Item[this.ItemValue]);
                        else
                            this.SelectedValue = Value[this.ItemValue];
                    }
                });

            if (PvStore.ReturnObject != true) {
                Model.AddV_Property([PvStorePath, 'SelectedValue'], {
                    Target: PvStore.Store.Path,
                });
            }
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
    public AddPv_Format(FormatKey: string, FormatFunc: FormateFuncType) {
        let FormatStore = Model.GetStore<Record<string, FormateFuncType>>(this.$FormatStore);
        FormatStore[FormatKey] = FormatFunc;
        return this;
    }
    public CreateDateFormat(Option: DateFormatOption) {
        Option.YearCount ??= 4;
        Option.MonthCount ??= 2;
        Option.DayCount ??= 2;
        let DateFormat: FormateFuncType = Value => {
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
        }
        return DateFormat;
    }
    public GetFormat(FormatKey: string) {
        let FormatStore = Model.GetStore<Record<string, FormateFuncType>>(this.$FormatStore);
        let FormatResult = FormatStore[FormatKey];
        return FormatResult;
    }
    //#endregion

    //#region DatePicker
    public AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption) {
        Option ??= {};
        Option.IsOpen ??= false;

        let Store: DatePickerStore = {
            ...Option,
        };
        Model.UpdateStore(PvName, Store);

        if (Store.Store) {
            Model.AddV_Property(Store.Store, {
                Target: this.RootPath(PvName, 'Date'),
                get() {
                    let PickerStore = Model.GetStore(DtvlPv.RootPath(PvName));
                    return PickerStore['Date'];
                },
                set(Value) {
                    let PickerStore = Model.GetStore(DtvlPv.RootPath(PvName));
                    PickerStore['Date'] = Value;
                }
            });
        }

        Model.AddV_Property(this.RootPath(PvName, 'Selected'), {
            set(Value) {
                this.$set('Selected', Value);
            }
        });

        Model.AddV_Property(this.RootPath(PvName, 'Date'), {
            get() {
                let Selected = this.Selected;
                if (Selected == null) {
                    if (this.IsOpen)
                        return ' ';

                    Queryer.Init(true);
                    Queryer.Using([PvName, 'Input'], ({ QueryNodes }) => {
                        QueryNodes.forEach(NodeItem => {
                            NodeItem.Dom.blur();
                        });
                    });
                    return null;
                }
                return Model.ToDateText(Selected);
            },
            set(Value) {
                if (Value)
                    this.Selected = new Date(Value);
                else
                    this.Selected = null;
            }
        });
        Model.AddV_Tree(PvName, {
            'v-model': this.RootPath(PvName, 'IsOpen'),
            ':Input': {
                'v-model': this.RootPath(PvName, 'Date'),
                'v-on:click:clear': () => {
                    let FindStore = Model.GetStore(this.RootPath(PvName));
                    if (FindStore) {
                        FindStore.Selected = null;
                    }
                },
            },
            ':DatePicker': {
                'v-model': this.RootPath(PvName, 'Selected'),
            },
        });
        return this;
    }
    //#endregion

    //#region Tabbed
    public AddPv_Tabbed(PvName: PathType, Option?: TabbedOption) {
        let TabbedPath = Model.ToJoin(this.RootPath(PvName));
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
        let RootStorePath = Model.ToJoin(this.RootPath(PvName));

        Option.Datas ??= [];
        let RootStore: FlexStore = {
            ...Option,
        };
        Model.UpdateStore(RootStorePath, RootStore);

        if (RootStore.ApiKey != null) {
            Model.AddV_Property(this.RootPath(PvName, 'Datas'), {
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
    public AddPv_Image(PvName: PathType, Option: ImageOption) {

        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore: ImageStore = {};
        Model.UpdateStore(PvStorePath, PvStore);

        if (Option.Src != null) {
            Model.AddV_Property([PvStorePath, 'Src'], {
                Target: Option.Src,
            });
        } else {
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
        } else {
            PvStore.LazySrc = Option.LazySrcUrl;
        }

        Model.AddV_Tree(PvName, {
            'v-bind:src': [PvStorePath, 'Src'],
            'v-bind:lazy-src': [PvStorePath, 'LazySrc'],
        });

        return this;
    }
    //#endregion

    //#region Collapse


    //#endregion

    //#region Animate
    public AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption) {
        let StorePath = this.RootPath(PvName, 'Animate');

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
        let StorePath = this.RootPath(PvName, 'Animate');
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
    protected RootPath(...PushPath: PathType[]): string[] {
        let RootPath = Model.Paths([this.$PvStore, PushPath]);
        return RootPath;
    }
    protected ApiPath(...PushPath: PathType[]): string[] {
        let RootPath = Model.Paths([this.$ApiStore, PushPath]);
        return RootPath;
    }
    public WatchApi(ApiKey: PathType, Status: string, Func: Function) {
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
