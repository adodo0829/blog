interface HetuFormProps {}

interface HetuTableTempProps {}

interface FormInstance {}

// 命命空间: 内部模块, 集中管理类型, 不冲突

export namespace PageTemp {
  export type Form = HetuFormProps;
  export type TableTemp = Omit<
    HetuTableTempProps,
    "selectedHeadKeys" | "onHeadSubmit" | "selectedRowKeys" | "onRowChange"
  >;
  export interface Instance {
    formRef: FormInstance | null;
    onFresh: () => void;
  }
  export interface Config {
    reportID: number | string;
    getConfigMethod?: (tempID: string) => any;
    HetuForm?: PageTemp.Form;
    HetuTableTemp?: PageTemp.TableTemp;
    headKeys?: string[];
    onHeadKeysChange?: (keys: any[]) => void;
    selectedKeys?: string[];
    onSelectKeysChange?: (keys: any[]) => void;
    operationChildren?: Node; // React.ReactNode
    onQuery?: (arg: any) => void;
  }
}

// 外部命名空间
declare namespace Out {
  export interface Event {
    x: number;
    y: number;
  }

  export interface Base {
    event: Event;
  }
}
