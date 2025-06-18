import { Model, Queryer } from '@rugal.tu/vuemodel3';
//#endregion
class DtvlPvIniter {
    $LoadingDelay;
    $AppStore;
    $PvStore;
    $ApiStore;
    $FormatStore;
    $FormatKeys;
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
    get Formats() {
        return Model.GetStore(this.$FormatStore);
    }
    get RouterStore() {
        return Model.GetStore([this.$AppStore, 'Router']);
    }
    get RouterPaths() {
        let Current = this.RouterStore?.Current;
        return Current;
    }
    get Router() {
        let Paths = this.RouterPaths;
        if (Paths == null && Paths.length == 0)
            return null;
        return Paths[Paths.length - 1];
    }
    //#endregion
    //#region App
    UseShowOnMounted() {
        Model.WithMounted(() => {
            let ShowItems = document.querySelectorAll('[class*="ShowOnMounted"]');
            for (let Item of ShowItems) {
                Item.classList.remove('ShowOnMounted');
            }
        });
        return this;
    }
    Pv(PvName) {
        return Model.GetStore(['pv', PvName]);
    }
    $CreateDefaultFormat() {
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
    $CreateAdDateFormat() {
        this.AddPv_Format(this.$FormatKeys.AdDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 4,
        }));
    }
    $CreateTwDateFormat() {
        this.AddPv_Format(this.$FormatKeys.TwDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 3,
        }));
    }
    $CreateNumberFormat() {
        this.AddPv_Format(this.$FormatKeys.Number, (Value) => {
            if (Value == null || Value == '')
                return Value;
            Value = Value.toString().replace(/[^0-9]/g, '');
            return Value;
        });
    }
    $CreateNumberThousandsFormat() {
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
    UseRouter(PvName, RouterData, Option) {
        let RouterDefaultStore = [this.$AppStore, 'Router'];
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    $InitSidebar(PvName, StorePath, RouterData, Option) {
        Option ??= {};
        Option.OpenMode ??= 'current';
        let RouterList = [];
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
        let CurrentRouters = [];
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
        let RouterStoreData = {
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
            GroupClick: (Item) => {
                let RouterStore = Model.GetStore([this.$AppStore, 'Router']);
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
                let IsSidebarOpen = Model.GetStore(TargetPaths);
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
    $CreateSidebar(Data, RouterList, Parent = null) {
        if (Data == null || Data.length == 0)
            return null;
        let Result = [];
        for (let Item of Data) {
            let NewRouter = {
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
    GetSidebar(PvName) {
        return this.Pv(PvName);
    }
    AddPv_Sidebar(PvName, RouterData, Option) {
        let RouterDefaultStore = this.RootPath(PvName);
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    $SetSidebarTreeCommand(PvName, StorePath) {
        Model.AddV_Bind(PvName, 'class', `[ ${StorePath}.IsShow ? 'Sidebar-Show' : 'Sidebar-Hide' ]`);
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
    GetDataTable(PvName) {
        return this.Pv(PvName);
    }
    AddPv_DataTable(PvName, Option) {
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore = {
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
            this.WatchApi(PvStore.ApiKey, 'IsCalling', (Value) => {
                let Store = Model.GetStore(PvStorePath);
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
            PvStore.IsItemSelected = (item) => {
                if (!PvStore.Select.ReturnObject)
                    item = item[PvStore.Select.ItemValue];
                let IsSelected = PvStore.Selected.includes(item);
                return IsSelected;
            };
            PvStore.SelectItem = (item) => {
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
            PvStore.RowSelectClicked = (event, toggle, item) => {
                let Target = event.target;
                let TargetTag = Target.tagName.toLowerCase();
                if (TargetTag != 'button') {
                    toggle(item);
                }
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
    $FillDataTableHeaders(Headers) {
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
    $BuildDefaultDataTable(PvName, PvStore) {
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        PvStore.IsSort = (Props, Column, Order) => {
            if (Column.sortable == false)
                return false;
            if (Props.sortBy.length == 0)
                return false;
            let Sort = Props.sortBy[0];
            if (Sort.key == Column.key && Sort.order == Order)
                return true;
            return false;
        };
        let ItemRowClass = [
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
                                'v-model': `${PvStorePath}.Selected`,
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
        });
    }
    //#endregion
    //#region Modal
    AddPv_Modal(PvName, Option) {
        Option ??= {};
        Option.IsShow ??= false;
        Model.AddStore(PvName, {});
        let PvStorePath = this.RootPath(PvName);
        let PvStore = {
            ...Option,
        };
        Model.UpdateStore(PvStorePath, PvStore)
            .AddV_Tree(PvName, {
            'v-model': [PvStorePath, 'IsShow'],
            ':Overlayer': {
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(PvStorePath);
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
    AddPv_SendModal(PvName, Option) {
        Option ??= {};
        this.AddPv_Modal(PvName, Option);
        Option.BtnCancel ??= () => {
            this.Modal(PvName, false);
        };
        Option.BtnSend ??= () => {
            let ModalStore = Model.GetStore(this.RootPath(PvName));
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
                    'v-on:click': (event) => {
                        let ModalStore = Model.GetStore(this.RootPath(PvName));
                        ModalStore.BtnSend(ModalStore, event);
                    },
                }
            });
        Model.AddV_Tree(PvName, {
            ':BtnCancel': {
                'v-on:click': (event) => {
                    let ModalStore = Model.GetStore(this.RootPath(PvName));
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
        let StoreData = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(this.RootPath(PvName), StoreData);
        return this;
    }
    Modal(PvName, Option) {
        if (typeof (Option) == 'boolean') {
            Model.UpdateStore(this.RootPath(PvName, 'IsShow'), Option);
            return this;
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.RootPath(PvName), Option);
        return this;
    }
    GetModal(PvName) {
        return this.Pv(PvName);
    }
    GetSendModal(PvName) {
        return this.Pv(PvName);
    }
    //#endregion
    //#region Alert
    AddPv_Alert(PvName, Option) {
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
        let SetAlertStore = {
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
                'v-on:click': (event) => {
                    let AlertStore = Model.GetStore(this.RootPath(PvName));
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
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(this.RootPath(PvName));
                    if (GetStore.BtnCancel != null) {
                        GetStore.BtnCancel(GetStore, event);
                        return;
                    }
                    this.Alert(PvName, false);
                },
            },
            ':Overlayer': {
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(this.RootPath(PvName));
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
    Alert(PvName, Option) {
        if (typeof (Option) == 'boolean') {
            let GetStore = Model.GetStore(this.RootPath(PvName));
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
    GetAlert(PvName) {
        return this.Pv(PvName);
    }
    //#endregion
    //#region Card
    AddPv_FilterCard(PvName, Option) {
        Option ??= {};
        let PvStorePath = this.RootPath(PvName);
        let PvStore = {
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
    GetInput(PvName) {
        return this.Pv(PvName);
    }
    GetSelect(PvName) {
        return this.Pv(PvName);
    }
    AddPv_Input(PvName, Option) {
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
        let PvStore = {
            Store: Option.Store,
            Value: Option.Value,
            Formats: {
                Value: [],
                Display: [],
            },
            OnFormatDisplay: (Value) => {
                let PvStore = Model.GetStore(PvStorePath);
                for (let Format of PvStore.Formats.Display)
                    Value = Format?.call(this, Value);
                return Value;
            },
            OnFormatValue: (Value) => {
                let PvStore = Model.GetStore(PvStorePath);
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
            }
            else if (typeof (Option.ReadOnly == 'string')) {
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
                };
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
    AddPv_Select(PvName, Option) {
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
        let PvStore = {
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
                //Target: PvStore.ReturnObject ? PvStore.Store.Path : null,
                Target: PvStore.Store.Path,
                set(Value) {
                    this.$set('SelectedItem', Value);
                    if (!Value) {
                        this.SelectedValue = null;
                        return;
                    }
                    let TargetField = this.ItemValue ?? this.ItemName;
                    if (TargetField == null)
                        this.SelectedValue = Value;
                    else {
                        if (Array.isArray(Value))
                            this.SelectedValue = Value.map(Item => Item[TargetField]);
                        else
                            this.SelectedValue = Value[this.ItemValue];
                    }
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
            this.WatchApi(Option.ApiKey, 'IsCalling', (Value) => {
                let Store = Model.GetStore(PvStorePath);
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
            }
            else if (typeof (Option.ReadOnly == 'string')) {
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
    AddPv_Format(FormatKey, FormatFunc) {
        let FormatStore = Model.GetStore(this.$FormatStore);
        FormatStore[FormatKey] = FormatFunc;
        return this;
    }
    CreateDateFormat(Option) {
        Option.YearCount ??= 4;
        Option.MonthCount ??= 2;
        Option.DayCount ??= 2;
        let DateFormat = Value => {
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
        };
        return DateFormat;
    }
    GetFormat(FormatKey) {
        let FormatStore = Model.GetStore(this.$FormatStore);
        let FormatResult = FormatStore[FormatKey];
        return FormatResult;
    }
    //#endregion
    //#region DatePicker
    AddPv_DatePicker(PvName, Option) {
        Option ??= {};
        Option.IsOpen ??= false;
        let Store = {
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
    AddPv_Tabbed(PvName, Option) {
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
    AddPv_Flex(PvName, Option) {
        let RootStorePath = Model.ToJoin(this.RootPath(PvName));
        Option.Datas ??= [];
        let RootStore = {
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
    AddPv_ImageFlex(PvName, Option) {
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
    AddPv_Image(PvName, Option) {
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore = {};
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
    AddPv_AnimatePush(PvName, Option) {
        let StorePath = this.RootPath(PvName, 'Animate');
        Model.SetStore(StorePath, {
            IsRun: false,
        });
        Model.AddV_Watch([StorePath, 'IsRun'], (NewValue) => {
            if (NewValue) {
            }
        });
        Model.AddV_Tree(PvName, {});
    }
    Animate(PvName) {
        let StorePath = this.RootPath(PvName, 'Animate');
        let AnimateStore = Model.GetStore(StorePath, {
            CreateIfNull: true,
            DefaultValue: {
                IsRun: false,
            },
        });
        let IsRun = Model.GetStore([StorePath, 'IsRun']);
        IsRun = IsRun ? false : true;
        Model.UpdateStore([StorePath, ''], true);
    }
    //#endregion
    //#region Protect Process
    RootPath(...PushPath) {
        let RootPath = Model.Paths([this.$PvStore, PushPath]);
        return RootPath;
    }
    ApiPath(...PushPath) {
        let RootPath = Model.Paths([this.$ApiStore, PushPath]);
        return RootPath;
    }
    WatchApi(ApiKey, Status, Func) {
        let GetPath = Model.Paths(ApiKey).shift();
        GetPath = GetPath.split('.')[0];
        Model.AddV_Watch(this.ApiPath(GetPath, Status), Func);
    }
}
const DtvlPv = new DtvlPvIniter();
const Formats = DtvlPv.Formats;
window.DtvlPv = DtvlPv;
export { DtvlPv, Formats, };
//# sourceMappingURL=dtvlpv.js.map