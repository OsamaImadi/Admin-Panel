/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Modal, Input, Form, Row, Col, Select, Alert, Button } from 'antd';
import MultiSelectTable from '../../components/MultiSelectTable';
import { PAGE_DATA, countryList, countryCodes } from '../../constants';
import { UsergroupAddOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useQuery, useMutation } from 'react-apollo';
import Queries from '../../api/Queries';
import Mutations from '../../api/Mutations';
import CallObjects from '../../api/CallObjects';
import { trimErrorMessage } from '../../utils';

const { Option } = Select;

const defaultOrganisation = {
  name: '',
  email: '',
  country: '',
  city: '',
  phone: '',
  zip: '',
  address: ''
};

function createOptions(data, style = {}) {
  const children = [];
  for (let i = 0; i < data.length; i++) {
    children.push(<Option style={style} key={data[i]}>{data[i]}</Option>);
  }
  return children;
}

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const AddOrganisationModel = ({ submitError, visible, onCancel, onChange, onSubmit, loading, isEditing,
  formObj, onErrorHide
}) => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState('us');

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue(formObj);
    }
  }, [isEditing]);

  return (

    <Modal confirmLoading={loading} title={PAGE_DATA.organisationsPage.AB_AddNewOrg} visible={visible} okType="primary"
      okText="Submit" onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm"
        onFinish={onSubmit}
        initialValues={formObj}
        onFieldsChange={(changedFields, allFields) => {
          if (changedFields.length && changedFields[0].name[0] === "country") {
            setCountryCode(countryCodes[countryList.indexOf(changedFields[0].value)]?.toLowerCase());
          }
          onChange(allFields);
        }}
      >
        <Row style={{ marginBottom: 30 }}>
          {submitError &&
            <Alert
              message={submitError}
              type="error"
              closable
              showIcon
              onClose={onErrorHide}
            />
          }
        </Row>
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Org. Name"
              rules={[
                {
                  required: true,
                  message: "Organisation Name is required!"
                },
              ]}

            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Email is required!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: 'Country is required!'
                }
              ]}
            >
              <Select
                optionFilterProp="children"
                showSearch
                placeholder={PAGE_DATA.organisationsPage.PH_Country}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {createOptions(countryList)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: 'City is required!'
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: 'Phone is required!'
                },
              ]}
            >
              <PhoneInput
                country={countryCode}
                inputStyle={{ width: 'inherit' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="zip"
              label="Zip"
              rules={[
                {
                  required: true,
                  message: 'Zip is required!'
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  address: 'Address is required!'
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const Organisations = (props) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  const [formObj, setFormObj] = useState(defaultOrganisation);
  const [recordToEditId, setRecordToEditId] = useState('');

  const [flags, setFlags] = useState({
    isEditing: false,
    orgModelVisible: false,
    fetchObs:true
  });

  const { data: organisationsData, loading } = useQuery(Queries.GET_ORGANISATIONS, {
    fetchPolicy: "network-only",
    skip: !flags.fetchObs
  });

  const [createOrganisation,
    { data: createOrgResponse, loading: createOrgLoading }]
    = useMutation(Mutations.CREATE_ORGANISATION);
  const [updateOrganisation,
    { data: updateOrgResponse, loading: updateOrgLoading }]
    = useMutation(Mutations.UPDATE_ORGANISATION);

  const [deleteOrganisation,
    { data: deleteOrgResponse, loading: deleteOrgLoading }]
    = useMutation(Mutations.DELETE_ORGANISATION);

  const [deleteOrganisations,
    { data: deleteOrgsResponse, loading: deleteOrgsLoading }
  ] = useMutation(Mutations.DELETE_ORGANISATIONS);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      },
      fixed: 'left',
      render: (text, record, index) => {
        return <a onClick={() => handleGoToOrgDetail(record)}>{text}</a>;
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      width: '10%',
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      width: '10%',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '10%',
      editable: true,
    },
    {
      title: 'Zip',
      dataIndex: 'zip',
      width: '10%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    }

  ];
  useEffect(() => {
    if (organisationsData?.organizations) {
      setData(organisationsData.organizations.sort((a, b) => a.id - b.id));
    }
  }, [organisationsData]);
  useEffect(() => {
    if (deleteOrgsResponse?.deleteOrganizations) {
      setData(data.filter(item => deleteOrgsResponse.deleteOrganizations.findIndex(dbItem => dbItem.id === item.id) < 0));
    }
  }, [deleteOrgsResponse]);

  useEffect(() => {
    if (deleteOrgResponse?.deleteOrganization?.id) {
      setData(data.filter(item => item.id !== deleteOrgResponse.deleteOrganization.id));
    }
  }, [deleteOrgResponse]);

  useEffect(() => {
    if (createOrgResponse?.createOrganization?.id) {
      var newObj = createOrgDTO();
      setData([
        ...data,
        {
          ...newObj,
          id: createOrgResponse.createOrganization.id
        }
      ]);
      setFlags({ ...flags, orgModelVisible: false,fetchObs:false });
    }
  }, [createOrgResponse]);

  useEffect(() => {
    setErrorMessage('');
  }, [formObj]);

  useEffect(() => {
    if (updateOrgResponse?.updateOrganization?.id) {
      var newObj = createOrgDTO();
      newObj.id = recordToEditId;
      var tempData = [...data];
      var index = tempData.findIndex(item => item.id === newObj.id);
      tempData[index] = newObj;
      setFormObj(newObj);
      setData(tempData);
      setFlags({
        ...flags,
        isEditing: false,
        orgModelVisible: false,
        fetchObs:false
      });
    }
  }, [updateOrgResponse]);

  const createOrgDTO = () => //Data Transfer Obj
  {
    var newObj = {
      name: '',
      city: '',
      country: '',
      email: '',
      address: '',
      phone: '',
      zip: ''
    };

    formObj.map(item => {
      newObj[item.name[0]] = item.value
    });
    return newObj;
  }
  const handleAddNewOrg = () => {
    var newObj;
    if (!flags.isEditing) {
      newObj = createOrgDTO();
      createOrganisation(CallObjects.createOrgObj(newObj)).catch((e) => {
        setErrorMessage(trimErrorMessage(e.message));
      });
    }
    else {
      newObj = createOrgDTO();
      newObj.id = recordToEditId;

      updateOrganisation(CallObjects.updateOrgObj(newObj)).catch((e) => {
        setErrorMessage(trimErrorMessage(e.message));
      });
    }
  }
  const handleDeleteOrg = (id) => {
    deleteOrganisation(CallObjects.deleteOrgObj(id)).catch((e) => {
      setErrorMessage(trimErrorMessage(e.message));
    });
  }
  const handleGoToOrgDetail = (record, history) => {
    props.history.push({ pathname: 'organisations/' + record.id });
  }
  const handleDeleteSelected = (selectedRowKeys) => {
    deleteOrganisations(CallObjects.deleteOrganisationsObj(selectedRowKeys));
  }

  return <Layout>
    <AddOrganisationModel
      onErrorHide={() => setErrorMessage('')}
      onChange={(fields) => {
        setFormObj(fields);
      }}
      loading={createOrgLoading || updateOrgLoading}
      submitError={errorMessage}
      visible={flags.orgModelVisible}
      isEditing={flags.isEditing}
      formObj={flags.isEditing ? formObj : defaultOrganisation}
      onSubmit={handleAddNewOrg}
      onCancel={() => {
        setFlags({
          ...flags,
          orgModelVisible: false,
          isEditing: false,
          fetchObs:false
        });
      }}
    />
    <MultiSelectTable
      columns={columns}
      data={data}
      actions={
                <Button icon={<UsergroupAddOutlined />} size="middle" type="primary"
                  onClick={() => setFlags({ ...flags, orgModelVisible: true })}
                >
                  {PAGE_DATA.organisationsPage.AB_AddNewOrg}
                </Button>
              }
      loading={loading || deleteOrgLoading || updateOrgLoading || deleteOrgsLoading}
      onDelete={handleDeleteOrg}
      onDeleteSelected={handleDeleteSelected}
      onEdit={(record) => {
        setFormObj(record);
        setRecordToEditId(record.id);
        setFlags({
          ...flags,
          orgModelVisible: true,
          isEditing: true
        });
      }}
    />
  </Layout>
}
export default Organisations;