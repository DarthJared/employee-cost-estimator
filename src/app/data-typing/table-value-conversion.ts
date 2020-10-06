export interface ColumnTitleToColumnPropMap {
  [key: string]: string;
}

export interface ColumnPropToColumnInfoMap {
  [key: string]: {
    title: string;
    width: number;
  };
}
