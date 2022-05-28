import { Avatar, List } from 'antd';
import React from 'react';
export default function ListNotification(t) {
    return (
        <List
          
          itemLayout="horizontal"
          style={{ width: 300, padding: "5px" }}
          dataSource={[
            {
              title: "Hoang Van Manh",
              photoURL:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              description:'Đã đăng bài mới',
            },
          ]}
          renderItem={(item) => (
            <List.Item style={{ width: 300, padding: "5px 0px",background:'#80bfff',marginLeft:-45 }}>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.photoURL} />
                }
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        >
             <List.Item style={{ width: 300, padding: "5px 0px",display:'flex',justifyContent:'center',marginLeft:-5 }}>
                 <a style={{textAlign:'center',display:'inline-block',borderTop:'1px solid black',padding:'3px'}}>{t("show_more")}</a>
            </List.Item>
        </List>
      );
}
