import React,{useState} from 'react';
import { Input,Form, Select, Button,Upload, List} from 'antd';
import { Option } from 'antd/es/mentions';
import { locations } from '../AppConfig';
import { AuthenticatedLink } from '../services/ApiService';
import { InboxOutlined, CloseOutlined, UploadOutlined} from '@ant-design/icons';
import { call } from '../services/ApiService';
import { useEffect } from 'react';

const { API_BASE_URL} = require('../AppConfig');


const ALLOW_FILE_EXTENSION = "pdf"; //확장자는 pdf만 가능
const FILE_SIZE_MAX_LIMIT = 30*1024*1024; //30MB

// List 관련 설정
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

 


const ProfileDetail = () => {

  const [posts, setPosts] = useState([]);
  const [listener, setListener] = useState(false);
  const [file, setFile] = useState<File>();

  const deletefile = async (fid,fileName) => {
    console.log("삭제");
    console.log(fid);
      call(
        `/file/deleteFile`,"DELETE",{fid,fileName}
      ).then((res)=>{
        console.log(res);
        setListener(true);
      });
      
  }

  

  useEffect(() => {
    const fetchData = async () => {
      call(
        `/auth/getMember`,"GET",null
      ).then((res)=>{
        setPosts(res.data["data"]);
        setListener(false);
      });
    };
    fetchData();

    
  }, [listener]);


  
 

  
 console.log("file", posts["infoFileDTO"]);
 console.log("profileDetail post : ", posts);

 



  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  console.log(posts);

  return(
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
      >
        
        <Form.Item label="이메일">
          <span className="ant-form-text">{posts.email}</span>
        </Form.Item>
        <Form.Item
        {...formItemLayout}
        name="username"
        label="이름"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        {(posts.name || posts.name===null) && <Input defaultValue={posts.name}/>}
      </Form.Item>
      
      

        <Form.Item label="성별">
          <span className="ant-form-text">{posts.gender}</span>
        </Form.Item>
        
        {posts.project_board === "" && 
          <Form.Item label="프로젝트">
            <span className="ant-form-text">{posts.project_board}</span>
          </Form.Item>

        }
        {posts.project_board === "" && 
          <Form.Item label="스터디">
            <span className="ant-form-text">{posts.study_board}</span>
          </Form.Item>
        }
        
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your country!',
            },
          ]}
        >
          {posts.address &&<Select placeholder="주소" defaultValue={posts.address}>
            {residences}
          </Select>}
        </Form.Item>
        <Form.Item label="포토폴리오">
            <span className="ant-form-text">
              {posts["infoFileDTO"] && posts["infoFileDTO"].map((item,index)=>{
                return(
                <List.Item key={index}>
                  <AuthenticatedLink url={API_BASE_URL+'/file/download?filename='+item["fileName"]} filename={item["fileName"]}>
                    {item["fileName"]}
                  </AuthenticatedLink>
                <CloseOutlined onClick={()=>deletefile(item["fid"],item["fileName"])} />
                </List.Item>
                );
              })}
              </span>
            <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
        </Form.Item>
        <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

          </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            회원 수정
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default ProfileDetail;

