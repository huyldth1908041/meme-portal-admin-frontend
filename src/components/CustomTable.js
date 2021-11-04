import { Table } from 'antd';
import styled from 'styled-components';

const TableStyled = styled(Table)`
  overflow: auto;
  font-family: Roboto, sans-serif;

  tr {
    font-size: 16px;
    cursor: pointer;
  }

  thead th {
    font-weight: 600;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #7c3118;
  }

  .ant-table-thead tr th {
    background: #191C24;
    color: #fff;
    border-bottom: none;
  }

  .ant-table-tbody > tr > td {
    border-bottom: none;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #7c3118;
    color: #fff;
    border-bottom: none;
  }
`;
const CustomTable =
  ({
     columns,
     data,
     selectionType,
     width,
     onRowSelectionChange,
     pagination,
     renderFooter,
     renderTitle,
     onRowClick,
   }) => {
    const rowSelection = {
      onChange: onRowSelectionChange,
      // getCheckboxProps: (record) => ({
      //     disabled: record.name === 'Disabled User',
      //     // Column configuration not to be checked
      //     name: record.name,
      // }),
    };
    return (
      <TableStyled
        rowSelection={selectionType && {
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={data}
        columns={columns}
        pagination={pagination || { position: ['none', 'none'] }}
        style={{ width: width || '100%' }}
        footer={renderFooter && renderFooter}
        title={renderTitle && renderTitle}
        rowClassName={() => 'custom-table-row'}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              onRowClick(record)
            }, // click row
          };
        }}
      />
    );

  };

export default CustomTable;