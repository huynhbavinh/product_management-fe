import React, { useEffect, useState } from 'react';
import { LikeOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Modal } from 'antd';
import axiosInstance from '../../api/http';
import './styles.css';
import dayjs from 'dayjs';

interface ListItem {
  id: number;
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
  likes: number;
}

interface DataRaw {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    email: string;
  };
  likesCount: number;
}

const IconText = ({ icon, onClick }: { icon: React.ElementType; onClick?: () => void }) => (
  <Space onClick={onClick}>
    {React.createElement(icon)}
  </Space>
);

function ListComponent() {
  const [data, setData] = useState<ListItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [liked, setLiked] = useState<{ postId: number }[]>([]);
  const [likeAnimation, setLikeAnimation] = useState<{ [key: number]: boolean }>({});

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const promies = [];
      promies.push(axiosInstance.get('/posts', {
        params: {
          page,
          pageSize,
        },
      }));
      if (localStorage.getItem('loggedIn')) {
        promies.push(axiosInstance.get('/likes/user'));
      }
      const [postResponse, likesResponse] = await Promise.all(promies);

      const dataMapped: ListItem[] = postResponse.data.data.map((item: DataRaw) => ({
        title: item.title,
        content: item.content,
        href: 'https://ant.design',
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`,
        description: `Created by ${item.createdBy.email} on ${dayjs(item.createdAt).format('DD/MM/YYYY hh:mm')}`,
        likes: item.likesCount,
        id: item.id,
      }));
      setData(dataMapped);
      setPagination({
        current: postResponse.data.currentPage,
        pageSize: postResponse.data.pageSize,
        total: postResponse.data.total,
      });
      setLiked(likesResponse?.data ?? []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showLoginAlert = () => {
    Modal.warning({
      title: 'Login Required',
      content: 'Please log in to like posts.',
    });
  };

  const handleLike = async (id: number) => {
    if (!localStorage.getItem('loggedIn')) {
      showLoginAlert();
      return;
    }
    const isLiked = liked.some((like) => like.postId === id);
    try {
      if (isLiked) {
        await axiosInstance.delete(`/likes`, { data: { postId: id } });
        setLiked((prevLiked) => prevLiked.filter((like) => like.postId !== id));
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, likes: item.likes - 1 } : item
          )
        );
      } else {
        await axiosInstance.post(`/likes`, { postId: id });
        setLiked((prevLiked) => [...prevLiked, { postId: id }]);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, likes: item.likes + 1 } : item
          )
        );
        setLikeAnimation((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
          setLikeAnimation((prev) => ({ ...prev, [id]: false }));
        }, 500);
      }
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, error);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (page: number, pageSize: number) => {
    fetchData(page, pageSize);
  };

  return (
    <div className="list-container">
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            className={liked.some((like) => like.postId === item.id) ? 'liked' : ''}
            actions={[
              <IconText
                icon={LikeOutlined}
                key={`list-vertical-like-${item.id}`}
                onClick={() => handleLike(item.id)}
              />,
              <span className={`like-num ${likeAnimation[item.id] ? 'increase' : ''}`} key="list-vertical-like">{item.likes}</span>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default ListComponent;