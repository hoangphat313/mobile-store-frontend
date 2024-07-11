import { Table } from "antd";
import React, { useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import * as message from '../../components/Message/Message'

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const tableRef = useRef(null);
    const {selectionType = 'checkbox',data=[],isLoading=false,columns=[],handleDelteMany } = props

    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };
    const handleDeleteAll = () => {
      handleDelteMany(rowSelectedKeys)
      message.success('Xóa thành công!')
    }
    

    return (
      <Loading isLoading={isLoading}>
            {!!rowSelectedKeys.length && (
              <div style={{
                background: '#FF0000',
                color: '#fff',
                width:'fit-content',
                borderRadius:'10px',
                fontWeight: 'bold',
                padding: '10px',
                cursor: 'pointer',
                height:'fit-content'
              }}
                onClick={handleDeleteAll}
              >
                Xóa tất cả
              </div>
          )}
          <DownloadTableExcel
              filename="Excel"
              sheet="users"
              currentTableRef={tableRef.current}
          >
              <button style={{margin:'10px auto',backgroundColor:'#00FFFF'}}> Export excel </button>
          </DownloadTableExcel>

          <Table ref={tableRef}
              rowSelection={{
              type: selectionType,
              ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              {...props}
          />
      </Loading>
    )
}
export default TableComponent