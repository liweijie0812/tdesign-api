/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBaseTableProps, TdPrimaryTableProps } from './type';

export const baseTableDefaultProps: TdBaseTableProps = {
  allowResizeColumnWidth: false,
  bordered: false,
  columns: [],
  data: [],
  disableDataPage: false,
  footData: [],
  footerAffixedBottom: false,
  headerAffixedTop: false,
  hover: false,
  loading: undefined,
  size: 'medium',
  stripe: false,
  tableLayout: 'fixed',
  verticalAlign: 'middle',
};

export const primaryTableDefaultProps: Pick<
  TdPrimaryTableProps,
  'columnControllerVisible' | 'columns' | 'expandIcon' | 'expandedRowKeys' | 'multipleSort' | 'sortOnRowDraggable'
> = {
  columnControllerVisible: undefined,
  columns: [],
  expandIcon: true,
  expandedRowKeys: [],
  multipleSort: false,
  sortOnRowDraggable: false,
};