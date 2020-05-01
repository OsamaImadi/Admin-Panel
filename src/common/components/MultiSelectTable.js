/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Dropdown } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';


const AddDeleteWrapper = styled.div`
  margin-bottom:10px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
const Actions = styled.div`
  flex-direction:row;
  display: flex;
  align-items:center;
`;
const MultiSelectTable = (props) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const pageSize = props.pageSize ? props.pageSize : 10;
  const rowKey = "id";

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys
  };
  const hasSelected = rowSelection.selectedRowKeys.length > 0;
  const btnColor = !hasSelected ? "red" : undefined;

  const columns = [
    ...props.columns,
    {
      title: 'Actions',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Actions>
            <Button style={{ padding: 0 }} type="link" disabled={hasSelected}
              onClick={() => props.onEdit(record)}
            >
              Edit
            </Button>
            <Popconfirm style={{}} title="Sure to delete?" onConfirm={() => props.onDelete(record.id)}>
              <Button type="link" disabled={hasSelected} style={{ padding:0,paddingLeft:5, color: btnColor }}>
                Delete
              </Button>
            </Popconfirm>
            {props.moreActions &&
              props.moreActions(hasSelected)
            }
            
          </Actions>
        );
      },
    },
  ];
  return (
    <Form form={form} component={false}>
      <AddDeleteWrapper>
        <div>
          <Popconfirm title="Sure to delete?"
            onConfirm={() => {
              props.onDeleteSelected(rowSelection.selectedRowKeys);
              setSelectedRowKeys([]);
            }}
          >
            <Button size="small" type="primary" disabled={!hasSelected}
            >
                Delete
            </Button>
          </Popconfirm>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${rowSelection.selectedRowKeys.length} items` : ''}
          </span>
        </div>
        {
          props.actions &&
          <div>
            {props.actions}
            
          </div>
        }
      </AddDeleteWrapper>
      <Table
        dataSource={props.data}
        columns={columns}
        pagination={props.data.length > pageSize && { pageSize }}
        rowSelection={{ ...rowSelection }}
        rowKey={rowKey}
        loading={props.loading}
      />
    </Form>
  );
};
export default MultiSelectTable;